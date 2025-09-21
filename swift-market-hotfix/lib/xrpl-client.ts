import { Client, Wallet } from "xrpl"
import { config } from "./config/environment"

// XRPL Client singleton
let client: Client | null = null

export async function getXRPLClient(): Promise<Client> {
  if (!client) {
    client = new Client(config.xrpl.network)
    await client.connect()
  }
  return client
}

// Escrow wallet for handling transactions
export function getEscrowWallet(): Wallet {
  return Wallet.fromSeed(config.xrpl.escrowWalletSeed)
}

// Helper to check if using testnet
export function isTestnet(): boolean {
  return config.xrpl.network.includes("altnet") || config.xrpl.network.includes("testnet")
}

// Cleanup function
export async function disconnectXRPL(): Promise<void> {
  if (client && client.isConnected()) {
    await client.disconnect()
    client = null
  }
}
