# Swift Market Configuration Setup

## 🚧 Current Status: Using Dummy Values

This project is currently configured with dummy values for development. Follow the steps below to replace them with real production values.

## Required Configurations

### 1. Firebase Setup
Replace the dummy Firebase values in `.env.local`:

\`\`\`env
# Get these from Firebase Console > Project Settings > General
NEXT_PUBLIC_FIREBASE_API_KEY=your_real_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 2. Privy Authentication
Replace the dummy Privy App ID:

\`\`\`env
# Get this from Privy Dashboard > Apps
NEXT_PUBLIC_PRIVY_APP_ID=your_real_privy_app_id
\`\`\`

### 3. XRPL Configuration
Replace the dummy XRPL settings:

\`\`\`env
# For production, use mainnet: wss://xrplcluster.com
NEXT_PUBLIC_XRPL_NETWORK=wss://s.altnet.rippletest.net:51233
# Generate a secure wallet seed for escrow operations
ESCROW_WALLET_SEED=your_secure_wallet_seed
\`\`\`

## Setup Instructions

1. **Firebase Project**:
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication and Firestore
   - Copy configuration values to `.env.local`

2. **Privy Account**:
   - Sign up at https://privy.io
   - Create a new app
   - Copy the App ID to `.env.local`

3. **XRPL Wallet**:
   - Generate a secure wallet seed for escrow operations
   - For testnet: Use the current dummy network
   - For mainnet: Change to `wss://xrplcluster.com`

## Development Mode

The app will show configuration warnings in development mode. These warnings will disappear once you replace the dummy values with real ones.

## Security Notes

- Never commit real API keys to version control
- Use different configurations for development/staging/production
- Keep the escrow wallet seed extremely secure
- Regularly rotate API keys and secrets
