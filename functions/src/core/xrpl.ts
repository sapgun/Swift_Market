import { Client, Wallet, xrpToDrops } from 'xrpl';

export interface XRPLConfig {
  server: string;
  network: 'mainnet' | 'testnet' | 'devnet';
}

export class XRPLService {
  private client: Client;
  private config: XRPLConfig;

  constructor(config: XRPLConfig) {
    this.config = config;
    this.client = new Client(config.server);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  }

  async getAccountInfo(address: string) {
    try {
      const response = await this.client.request({
        command: 'account_info',
        account: address,
      });
      return response.result;
    } catch (error) {
      console.error('Error getting account info:', error);
      throw error;
    }
  }

  async submitTransaction(wallet: Wallet, transaction: any) {
    try {
      const prepared = await this.client.autofill(transaction);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);
      return result;
    } catch (error) {
      console.error('Error submitting transaction:', error);
      throw error;
    }
  }

  async createPayment(
    fromWallet: Wallet,
    toAddress: string,
    amount: string,
    memo?: string
  ) {
    const payment = {
      TransactionType: 'Payment',
      Account: fromWallet.address,
      Amount: xrpToDrops(amount),
      Destination: toAddress,
      ...(memo && {
        Memos: [
          {
            Memo: {
              MemoData: Buffer.from(memo, 'utf8').toString('hex'),
            },
          },
        ],
      }),
    };

    return this.submitTransaction(fromWallet, payment);
  }

  async validateAddress(address: string): Promise<boolean> {
    try {
      await this.getAccountInfo(address);
      return true;
    } catch {
      return false;
    }
  }
}