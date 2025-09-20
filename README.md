This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Swift Market - Proof of Concept

Swift Market is a global P2P marketplace aiming to revolutionize cross-border e-commerce using the XRP Ledger. This proof-of-concept (PoC) demonstrates the core user flow of purchasing a product and having the payment secured in an on-chain escrow.

## Tech Stack

- **Frontend:** Next.js (React)
- **Styling:** Tailwind CSS
- **Backend:** Firebase Cloud Functions
- **Database:** Firebase Firestore (Real-time)
- **Authentication:** Privy (Social Login & Embedded Wallets)
- **Blockchain:** XRP Ledger (`xrpl.js`)

## Core Features

- **User Authentication:** Simple and secure login via social accounts powered by Privy.
- **Embedded Wallets:** Automatic creation of non-custodial wallets for users, enabling seamless interaction with the XRP Ledger.
- **Real-time Product Listings:** Products are fetched in real-time from Firestore.
- **On-Chain Escrow:** When a user buys a product, funds are automatically placed into a secure on-chain escrow on the XRPL Testnet.
- **User Dashboard:** A personal dashboard for users to view their wallet address and track their purchase history.
- **Decentralized Settlement:** Buyers can confirm receipt of their items, which triggers the automatic release of escrowed funds directly to the seller's wallet.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
