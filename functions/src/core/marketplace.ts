export interface Order {
  id: string;
  productId: string;
  buyerAddress: string;
  sellerAddress: string;
  amount: string;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  txHash?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  sellerAddress: string;
  imageUrl?: string;
  category: string;
  status: 'active' | 'sold' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  address: string;
  displayName?: string;
  email?: string;
  rating: number;
  totalTransactions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  orderId: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockHeight?: number;
  createdAt: Date;
  confirmedAt?: Date;
}

export class MarketplaceService {
  static async createOrder(orderData: Partial<Order>): Promise<Order> {
    // This would typically interact with Firestore
    const order: Order = {
      id: `order_${Date.now()}`,
      productId: orderData.productId!,
      buyerAddress: orderData.buyerAddress!,
      sellerAddress: orderData.sellerAddress!,
      amount: orderData.amount!,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Created order:', order);
    return order;
  }

  static async updateOrderStatus(
    orderId: string,
    status: Order['status'],
    txHash?: string
  ): Promise<void> {
    console.log(`Updating order ${orderId} status to ${status}`, { txHash });
    // This would typically update the order in Firestore
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    console.log(`Fetching order ${orderId}`);
    // This would typically fetch from Firestore
    return null;
  }

  static async createTransaction(
    transactionData: Partial<Transaction>
  ): Promise<Transaction> {
    const transaction: Transaction = {
      id: `tx_${Date.now()}`,
      orderId: transactionData.orderId!,
      txHash: transactionData.txHash!,
      fromAddress: transactionData.fromAddress!,
      toAddress: transactionData.toAddress!,
      amount: transactionData.amount!,
      status: 'pending',
      createdAt: new Date(),
    };

    console.log('Created transaction record:', transaction);
    return transaction;
  }
}