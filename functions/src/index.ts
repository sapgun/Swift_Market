import { Client, Wallet, xrpToDrops, EscrowCreate, EscrowFinish, SubmitResponse, TxResponse } from "xrpl";

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

  if (createResult.result.meta?.TransactionResult !== "tesSUCCESS") {
    throw new Error(
      `EscrowCreate failed with result: ${createResult.result.meta?.TransactionResult ?? "unknown"}`
    );
  }

  const escrowSequence = createResult.result.Sequence ?? preparedTx.Sequence;

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

  if (finishResult.result.meta?.TransactionResult !== "tesSUCCESS") {
    throw new Error(
      `EscrowFinish failed with result: ${finishResult.result.meta?.TransactionResult ?? "unknown"}`
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
