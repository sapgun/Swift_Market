import * as admin from "firebase-admin";
import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {
  Client,
  Wallet,
  xrpToDrops,
  EscrowCreate,
  EscrowFinish,
  TxResponse,
} from "xrpl";
import * as crypto from "crypto";

admin.initializeApp();
const db = admin.firestore();

const MARKET_WALLET_SEED = "sEdTj6MnQjTEFp5uzVn3a43sR5dCjXf";

// Interfaces for callable function data
interface CreateOrderData {
  productId: string;
}

interface CompleteOrderData {
  orderId: string;
}

export const createOrder = onCall(
  async (request: CallableRequest<CreateOrderData>) => {
    logger.info("createOrder called with data:", request.data);

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "The function must be called while authenticated.",
      );
    }
    const {productId} = request.data;
    if (!productId) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with a 'productId'.",
      );
    }

    const buyerUid = request.auth.uid;

    try {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await productRef.get();
      if (!productDoc.exists) {
        throw new HttpsError("not-found", "Product not found.");
      }
      const product = productDoc.data();
      if (!product || !product.price || !product.sellerWalletAddress) {
        throw new HttpsError("invalid-argument", "Invalid product data.");
      }

      const orderRef = db.collection("orders").doc();
      await orderRef.set({
        buyerUid,
        productId,
        sellerWalletAddress: product.sellerWalletAddress,
        amount: product.price,
        status: "processing",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      logger.info(`Order ${orderRef.id} created.`);

      const preimage = crypto.randomBytes(32);
      const hash = crypto.createHash("sha256").update(preimage).digest();
      const condition = hash.toString("hex").toUpperCase();

      await orderRef.update({
        escrowCondition: condition,
        escrowPreimage: preimage.toString("hex"),
      });
      logger.info(`Generated escrow condition for order ${orderRef.id}`);

      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
      const marketWallet = Wallet.fromSeed(MARKET_WALLET_SEED);

      const escrowTx: EscrowCreate = {
        TransactionType: "EscrowCreate",
        Account: marketWallet.address,
        Amount: xrpToDrops(product.price),
        Destination: product.sellerWalletAddress,
        Condition: condition,
        FinishAfter: Math.floor(Date.now() / 1000) + 3600 * 24 * 7, // 7 days
      };

      const preparedTx = await client.autofill(escrowTx);
      const signedTx = marketWallet.sign(preparedTx);
      const result = await client.submitAndWait<EscrowCreate>(signedTx.tx_blob);

      logger.info("EscrowCreate transaction result:", result);

      if (result.result.meta?.TransactionResult !== "tesSUCCESS") {
        throw new Error(
          `Escrow creation failed: ${result.result.meta?.TransactionResult}`,
        );
      }

      await orderRef.update({
        status: "escrowed",
        escrowTxHash: signedTx.hash,
      });

      await client.disconnect();
      logger.info(`Order ${orderRef.id} is now escrowed.`);

      return {orderId: orderRef.id};
    } catch (error) {
      logger.error("Error creating order:", error);
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", "Could not create order.", error);
    }
  },
);

export const completeOrder = onCall(
  async (request: CallableRequest<CompleteOrderData>) => {
    logger.info("completeOrder called with data:", request.data);

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "The function must be called while authenticated.",
      );
    }
    const {orderId} = request.data;
    if (!orderId) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with an 'orderId'.",
      );
    }

    const buyerUid = request.auth.uid;

    try {
      const orderRef = db.collection("orders").doc(orderId);
      const orderDoc = await orderRef.get();
      if (!orderDoc.exists) {
        throw new HttpsError("not-found", "Order not found.");
      }
      const order = orderDoc.data();
      if (!order) {
        throw new HttpsError("internal", "Invalid order data.");
      }
      if (order.buyerUid !== buyerUid) {
        throw new HttpsError(
          "permission-denied",
          "You are not authorized to complete this order.",
        );
      }
      if (order.status !== "escrowed") {
        throw new HttpsError(
          "failed-precondition",
          `Order cannot be completed in its current state: ${order.status}`,
        );
      }
      if (!order.escrowCondition || !order.escrowPreimage || !order.escrowTxHash) {
        throw new HttpsError(
          "internal",
          "Escrow details are missing from the order.",
        );
      }

      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
      const marketWallet = Wallet.fromSeed(MARKET_WALLET_SEED);

      const escrowTxData: TxResponse = await client.request({
        command: "tx",
        transaction: order.escrowTxHash,
      });

      const offerSequence = (escrowTxData.result as EscrowCreate).Sequence;
      if (offerSequence === undefined) {
        throw new Error("Could not find OfferSequence from EscrowCreate tx.");
      }

      const escrowFinishTx: EscrowFinish = {
        TransactionType: "EscrowFinish",
        Account: marketWallet.address,
        Owner: marketWallet.address,
        OfferSequence: offerSequence,
        Condition: order.escrowCondition,
        Fulfillment: order.escrowPreimage,
      };

      const preparedTx = await client.autofill(escrowFinishTx);
      const signedTx = marketWallet.sign(preparedTx);
      const result = await client.submitAndWait<EscrowFinish>(signedTx.tx_blob);

      logger.info("EscrowFinish transaction result:", result);

      if (result.result.meta?.TransactionResult !== "tesSUCCESS") {
        throw new Error(
          `Escrow finish failed: ${result.result.meta?.TransactionResult}`,
        );
      }

      await orderRef.update({
        status: "completed",
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await client.disconnect();
      logger.info(`Order ${orderRef.id} has been completed.`);

      return {success: true, message: "Order completed successfully."};
    } catch (error) {
      logger.error("Error completing order:", error);
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError("internal", "Could not complete order.", error);
    }
  },
);
