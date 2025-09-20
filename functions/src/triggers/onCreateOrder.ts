import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { logger } from 'firebase-functions/v2';
import { XRPLService, XRPLConfig } from '../core/xrpl';
import { MarketplaceService, Order } from '../core/marketplace';

// XRPL Configuration - this would typically come from environment variables
const xrplConfig: XRPLConfig = {
  server: 'wss://s.altnet.rippletest.net:51233', // Testnet
  network: 'testnet',
};

/**
 * Cloud Function triggered when a new order is created in Firestore
 * This function handles the XRPL payment process for marketplace orders
 */
export const onCreateOrder = onDocumentCreated(
  'orders/{orderId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error('No data associated with the event');
      return;
    }

    const order = snapshot.data() as Order;
    const orderId = snapshot.id;

    logger.info(`Processing new order: ${orderId}`, { order });

    try {
      // Initialize XRPL service
      const xrplService = new XRPLService(xrplConfig);
      await xrplService.connect();

      // Validate buyer and seller addresses
      const isBuyerValid = await xrplService.validateAddress(order.buyerAddress);
      const isSellerValid = await xrplService.validateAddress(
        order.sellerAddress
      );

      if (!isBuyerValid) {
        logger.error(`Invalid buyer address: ${order.buyerAddress}`);
        await MarketplaceService.updateOrderStatus(orderId, 'cancelled');
        return;
      }

      if (!isSellerValid) {
        logger.error(`Invalid seller address: ${order.sellerAddress}`);
        await MarketplaceService.updateOrderStatus(orderId, 'cancelled');
        return;
      }

      // Get account info for both parties
      const buyerInfo = await xrplService.getAccountInfo(order.buyerAddress);
      const sellerInfo = await xrplService.getAccountInfo(order.sellerAddress);

      logger.info('Account validation successful', {
        buyerBalance: buyerInfo.account_data.Balance,
        sellerAddress: order.sellerAddress,
      });

      // Update order status to indicate it's ready for payment
      await MarketplaceService.updateOrderStatus(orderId, 'pending');

      // Create transaction record
      await MarketplaceService.createTransaction({
        orderId,
        fromAddress: order.buyerAddress,
        toAddress: order.sellerAddress,
        amount: order.amount,
        txHash: '', // Will be updated when actual payment is made
      });

      logger.info(`Order ${orderId} processed successfully`);

      await xrplService.disconnect();
    } catch (error) {
      logger.error(`Error processing order ${orderId}:`, error);

      // Update order status to cancelled on error
      await MarketplaceService.updateOrderStatus(orderId, 'cancelled');

      throw error;
    }
  }
);

/**
 * Helper function to process XRPL payment
 * This would typically be called by the frontend after the order is created
 */
export const processPayment = async (
  orderId: string,
  buyerWalletSeed: string
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    const order = await MarketplaceService.getOrder(orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    if (order.status !== 'pending') {
      return { success: false, error: 'Order is not in pending status' };
    }

    const xrplService = new XRPLService(xrplConfig);
    await xrplService.connect();

    // Note: In production, the wallet seed should never be passed to the backend
    // This is just for demonstration purposes
    // const buyerWallet = Wallet.fromSeed(buyerWalletSeed);

    // For now, we'll just simulate the payment
    const mockTxHash = `mock_tx_${Date.now()}`;

    // Update order and transaction records
    await MarketplaceService.updateOrderStatus(orderId, 'paid', mockTxHash);

    logger.info(`Payment processed for order ${orderId}`, { txHash: mockTxHash });

    await xrplService.disconnect();

    return { success: true, txHash: mockTxHash };
  } catch (error) {
    logger.error(`Error processing payment for order ${orderId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};