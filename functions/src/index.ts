import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
initializeApp();

// Export all cloud functions
export { onCreateOrder } from './triggers/onCreateOrder';

// Export core services for potential HTTP functions
export { XRPLService } from './core/xrpl';
export { MarketplaceService } from './core/marketplace';