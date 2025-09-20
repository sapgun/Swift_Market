# Swift Market
Swift Market: An XRPL-based Global P2P Marketplace. Revolutionizing cross-border e-commerce with near-zero fees and instant settlement.

## 🚀 Overview

Swift Market is a decentralized peer-to-peer marketplace built on the XRP Ledger (XRPL) that enables global commerce with instant settlement and minimal transaction fees. The platform connects buyers and sellers worldwide, facilitating secure transactions through XRPL's native payment capabilities.

## 🏗️ Architecture

This monorepo contains two main components:

### Frontend (`/frontend`)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Privy for wallet connection
- **Database**: Firebase integration
- **Features**:
  - Product listing and browsing (/)
  - Seller dashboard (/dashboard)
  - XRPL wallet integration
  - Real-time order tracking

### Functions (`/functions`)
- **Runtime**: Firebase Functions with TypeScript
- **Core Logic**: XRPL transaction handling
- **Structure**:
  - `/src/core/xrpl.ts` - XRPL service and utilities
  - `/src/core/marketplace.ts` - Marketplace business logic
  - `/src/triggers/onCreateOrder.ts` - Order processing triggers

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase CLI (for functions deployment)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd swift-market
```

2. Install dependencies for all packages
```bash
npm run install:all
```

### Development

Start both frontend and functions in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
# Frontend only
npm run dev:frontend

# Functions only
npm run dev:functions
```

### Building

Build all packages:
```bash
npm run build
```

### Linting

Lint all packages:
```bash
npm run lint
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in the frontend directory with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

### XRPL Configuration

The functions are currently configured to use XRPL Testnet. Update the configuration in `/functions/src/triggers/onCreateOrder.ts` for production use.

## 📱 Features

- **Product Marketplace**: Browse and list products with XRPL pricing
- **Wallet Integration**: Connect XRPL wallets for seamless transactions
- **Order Management**: Real-time order tracking and status updates
- **Seller Dashboard**: Comprehensive seller tools and analytics
- **Instant Settlement**: Leverage XRPL's fast transaction processing

## 🔐 Security

- All XRPL transactions are handled securely through the XRPL network
- Private keys never leave the user's device
- Firebase security rules protect user data
- TypeScript provides compile-time type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🌐 XRPL Integration

Swift Market leverages the XRP Ledger for:
- Fast transaction settlement (3-5 seconds)
- Low transaction fees (~$0.0002 per transaction)
- Global accessibility without traditional banking
- Built-in escrow and multi-signature capabilities
- Environmental sustainability through consensus mechanism
