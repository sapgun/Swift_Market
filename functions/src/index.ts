import * as admin from "firebase-admin";
import {https, logger} from "firebase-functions";
import {Client, Wallet, xrpToDrops} from "xrpl";
import * as crypto from "crypto";

admin.initializeApp();
const db = admin.firestore();

// --- IMPORTANT ---
// In a production environment, use Firebase's Secret Manager to store secrets
// like wallet seeds.
// For this PoC, we are using a placeholder.
// DO NOT commit real wallet seeds to your repository.
const MARKET_WALLET_SEED = "sEdTj6MnQjTEFp5uzVn3a43sR5dCjXf"; // A testnet wallet seed

/**
 * Creates an order and sets up an on-chain escrow.
 *
 * @param data - The data passed to the function.
 * @param data.productId - The ID of the product to purchase.
 * @param context - The authentication context of the user calling the function.
 * @returns The newly created order's ID.
 */
export const createOrder = https.onCall(async (data, context) => {
  logger.info("createOrder called with data:", data);

  // 1. Authentication and Validation
  if (!context.auth) {
    throw new https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }
  const {productId} = data;
  if (!productId) {
    throw new https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'productId'.",
    );
  }

  const buyerUid = context.auth.uid;

  try {
    // 2. Fetch Product and Seller Data
    const productRef = db.collection("products").doc(productId);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      throw new https.HttpsError("not-found", "Product not found.");
    }
    const product = productDoc.data();
    if (!product || !product.price || !product.sellerWalletAddress) {
      throw new https.HttpsError("invalid-argument", "Invalid product data.");
    }

    // 3. Create Order Document in Firestore
    const orderRef = db.collection("orders").doc();
    const orderData = {
      buyerUid: buyerUid,
      productId: productId,
      sellerWalletAddress: product.sellerWalletAddress,
      amount: product.price,
      status: "processing",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await orderRef.set(orderData);
    logger.info(`Order ${orderRef.id} created.`);

    // 4. Generate Crypto Condition for Escrow
    const preimage = crypto.randomBytes(32);
    const hash = crypto.createHash("sha256").update(preimage).digest();
    const condition = hash.toString("hex").toUpperCase();

    // Store the preimage in the order document (needed for completion)
    await orderRef.update({
      escrowCondition: condition,
      escrowPreimage: preimage.toString("hex"),
    });
    logger.info(`Generated escrow condition for order ${orderRef.id}`);

    // 5. Setup XRPL Client and Wallet
    const client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    const marketWallet = Wallet.fromSeed(MARKET_WALLET_SEED);

    // 6. Prepare and Submit EscrowCreate Transaction
    const escrowTx = {
      TransactionType: "EscrowCreate",
      Account: marketWallet.address,
      Amount: xrpToDrops(product.price),
      Destination: product.sellerWalletAddress,
      Condition: condition,
      FinishAfter: new Date(new Date().getTime() / 1000 + 3600 * 24 * 7), // 7 days from now
    };

    const preparedTx = await client.autofill(escrowTx);
    const signedTx = marketWallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);

    logger.info("EscrowCreate transaction result:", result);

    if (result.result.meta?.TransactionResult !== "tesSUCCESS") {
      throw new Error(
        `Escrow creation failed: ${result.result.meta?.TransactionResult}`,
      );
    }

    // 7. Update Order with Escrow Details
    await orderRef.update({
      status: "escrowed",
      escrowTxHash: signedTx.hash,
    });

    await client.disconnect();
    logger.info(`Order ${orderRef.id} is now escrowed.`);

    return {orderId: orderRef.id};
  } catch (error) {
    logger.error("Error creating order:", error);
    if (error instanceof https.HttpsError) {
      throw error;
    }
    throw new https.HttpsError("internal", "Could not create order.", error);
  }
});

/**
 * Completes an order by finishing the on-chain escrow.
 * This should be called by the buyer once they have received the product.
 *
 * @param data - The data passed to the function.
 * @param data.orderId - The ID of the order to complete.
 * @param context - The authentication context of the user calling the function.
 * @returns An object with a success message.
 */
export const completeOrder = https.onCall(async (data, context) => {
  logger.info("completeOrder called with data:", data);

  // 1. Authentication and Validation
  if (!context.auth) {
    throw new https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }
  const {orderId} = data;
  if (!orderId) {
    throw new https.HttpsError(
      "invalid-argument",
      "The function must be called with an 'orderId'.",
    );
  }

  const buyerUid = context.auth.uid;

  try {
    // 2. Fetch Order and Validate
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) {
      throw new https.HttpsError("not-found", "Order not found.");
    }
    const order = orderDoc.data();
    if (!order) {
      throw new https.HttpsError("internal", "Invalid order data.");
    }
    if (order.buyerUid !== buyerUid) {
      throw new https.HttpsError(
        "permission-denied",
        "You are not authorized to complete this order.",
      );
    }
    if (order.status !== "escrowed") {
      throw new https.HttpsError(
        "failed-precondition",
        `Order cannot be completed in its current state: ${order.status}`,
      );
    }
    if (!order.escrowCondition || !order.escrowPreimage) {
      throw new https.HttpsError(
        "internal",
        "Escrow details are missing from the order.",
      );
    }

    // 3. Setup XRPL Client and Wallet
    const client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    const marketWallet = Wallet.fromSeed(MARKET_WALLET_SEED);

    // 4. Fetch the EscrowCreate transaction to get the OfferSequence
    const escrowTxData = await client.request({
      command: "tx",
      transaction: order.escrowTxHash,
    });
    const offerSequence = escrowTxData.result.Sequence;
    if (offerSequence === undefined) {
      throw new Error("Could not find OfferSequence from EscrowCreate tx.");
    }

    // 5. Prepare and Submit EscrowFinish Transaction
    const escrowFinishTx = {
      TransactionType: "EscrowFinish",
      Account: marketWallet.address,
      Owner: marketWallet.address,
      OfferSequence: offerSequence,
      Condition: order.escrowCondition,
      Fulfillment: order.escrowPreimage,
    };

    const preparedTx = await client.autofill(escrowFinishTx);
    const signedTx = marketWallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);

    logger.info("EscrowFinish transaction result:", result);

    // 수정 후 (타입을 미리 명시, 추출해서 사용)
    // const txResult = result.result.meta as TransactionMetadata;
    if (txResult.TransactionResult !== "tesSUCCESS") {
      throw new Error(
        `Escrow finish failed: ${result.result.meta?.TransactionResult}`,
      );
    }

    // 수정 전
    if (result.result.meta?.TransactionResult !== "tesSUCCESS") {
      throw new Error(
        `Escrow finish failed: ${result.result.meta?.TransactionResult}`,
      );
    }

    // 6. Update Order Status
    await orderRef.update({
      status: "completed",
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await client.disconnect();
    logger.info(`Order ${orderRef.id} has been completed.`);

    return {success: true, message: "Order completed successfully."};
  } catch (error) {
    logger.error("Error completing order:", error);
    if (error instanceof https.HttpsError) {
      throw error;
    }
    throw new https.HttpsError("internal", "Could not complete order.", error);
  }
});
