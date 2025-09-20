import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { createHash, randomBytes } from "crypto";
import { Client, Wallet, xrpToDrops, EscrowCreate, EscrowFinish, SubmitResponse, TxResponse } from "xrpl";

admin.initializeApp();

const db = admin.firestore();
const ORDERS_COLLECTION = "orders";

interface EscrowCondition {
  fulfillment: string;
  condition: string;
}

const generateEscrowCondition = (): EscrowCondition => {
  const fulfillmentBuffer = randomBytes(32);
  const fulfillment = fulfillmentBuffer.toString("hex").toUpperCase();
  const condition = createHash("sha256").update(fulfillmentBuffer).digest("hex").toUpperCase();

  return { fulfillment, condition };
};

const assertAuthenticated = (context: functions.https.CallableContext): void => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Authentication is required to call this function.");
  }
};

function assertString(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new functions.https.HttpsError("invalid-argument", `${name} must be a non-empty string.`);
  }
}

export const createOrder = functions.https.onCall(async (data, context) => {
  assertAuthenticated(context);

  const buyerAccount = data?.buyerAccount;
  const sellerAccount = data?.sellerAccount;
  const amountXrp = data?.amountXrp;
  const escrowWalletSeed = data?.escrowWalletSeed;

  assertString(buyerAccount, "buyerAccount");
  assertString(sellerAccount, "sellerAccount");
  assertString(amountXrp, "amountXrp");
  assertString(escrowWalletSeed, "escrowWalletSeed");

  const escrowWallet = Wallet.fromSeed(escrowWalletSeed);
  const { condition, fulfillment } = generateEscrowCondition();

  const orderRef = db.collection(ORDERS_COLLECTION).doc();
  const orderRecord = {
    buyerAccount,
    sellerAccount,
    amountXrp,
    escrowCondition: condition,
    escrowFulfillment: fulfillment,
    escrowWallet: escrowWallet.address,
    status: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdBy: context.auth.uid,
  };

  await orderRef.set(orderRecord);

  return {
    orderId: orderRef.id,
    escrowCondition: condition,
    escrowFulfillment: fulfillment,
    escrowWallet: escrowWallet.address,
  };
});

export const completeOrder = functions.https.onCall(async (data, context) => {
  assertAuthenticated(context);

  const orderId = data?.orderId;
  const escrowReleaseTxHash = data?.escrowReleaseTxHash;

  assertString(orderId, "orderId");
  assertString(escrowReleaseTxHash, "escrowReleaseTxHash");

  const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
  const orderSnap = await orderRef.get();

  if (!orderSnap.exists) {
    throw new functions.https.HttpsError("not-found", "Order not found.");
  }

  await orderRef.update({
    status: "completed",
    escrowReleaseTxHash,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { orderId, status: "completed", escrowReleaseTxHash };
});

export interface EscrowParams {
  client: Client;
  wallet: Wallet;
  destination: string;
  amountXrp: string;
  finishAfter: Date;
}

export interface EscrowResult {
  create: SubmitResponse<EscrowCreate>;
  finish: SubmitResponse<EscrowFinish>;
  lookup: TxResponse<EscrowCreate>;
}

export async function createAndFinishEscrow({
  client,
  wallet,
  destination,
  amountXrp,
  finishAfter,
}: EscrowParams): Promise<EscrowResult> {
  await client.connect();

  const escrowTx: EscrowCreate = {
    TransactionType: "EscrowCreate",
    Account: wallet.address,
    Destination: destination,
    Amount: xrpToDrops(amountXrp),
    FinishAfter: Math.floor(finishAfter.getTime() / 1000),
  };

  const preparedTx = await client.autofill<EscrowCreate>(escrowTx);
  const signedTx = wallet.sign(preparedTx);
  const createResult: SubmitResponse<EscrowCreate> = await client.submitAndWait(signedTx.tx_blob);

  if (createResult.result.tx_json.meta?.TransactionResult !== "tesSUCCESS") {
    throw new Error(
      `EscrowCreate failed with result: ${createResult.result.tx_json.meta?.TransactionResult ?? "unknown"}`
    );
  }

  const escrowSequence = createResult.result.tx_json.Sequence ?? preparedTx.Sequence;

  if (escrowSequence == null) {
    throw new Error("EscrowCreate response did not include a Sequence value");
  }

  const escrowFinishTx: EscrowFinish = {
    TransactionType: "EscrowFinish",
    Account: wallet.address,
    Owner: wallet.address,
    OfferSequence: escrowSequence,
  };

  const preparedFinishTx = await client.autofill<EscrowFinish>(escrowFinishTx);
  const signedFinishTx = wallet.sign(preparedFinishTx);
  const finishResult: SubmitResponse<EscrowFinish> = await client.submitAndWait(signedFinishTx.tx_blob);

  if (finishResult.result.tx_json.meta?.TransactionResult !== "tesSUCCESS") {
    throw new Error(
      `EscrowFinish failed with result: ${finishResult.result.tx_json.meta?.TransactionResult ?? "unknown"}`
    );
  }

  const escrowTxHash = createResult.result.tx_json?.hash ?? signedTx.hash;

  if (!escrowTxHash) {
    throw new Error("Unable to determine escrow transaction hash");
  }

  const escrowTxData: TxResponse<EscrowCreate> = await client.request({
    command: "tx",
    transaction: escrowTxHash,
  });

  return {
    create: createResult,
    finish: finishResult,
    lookup: escrowTxData,
  };
}
