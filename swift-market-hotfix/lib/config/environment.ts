export interface EnvironmentConfig {
  firebase: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  privy: {
    appId: string
  }
  xrpl: {
    network: string
    escrowWalletSeed: string
  }
  app: {
    baseUrl: string
    environment: "development" | "production" | "test"
  }
}

// Dummy values for development - REPLACE WITH REAL VALUES IN PRODUCTION
const DUMMY_VALUES = {
  firebase: {
    apiKey: "AIzaSyDummyFirebaseApiKey123456789",
    authDomain: "swift-market-dummy.firebaseapp.com",
    projectId: "swift-market-dummy",
    storageBucket: "swift-market-dummy.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789",
  },
  privy: {
    appId: "clp7dummy1234567890abcdef",
  },
  xrpl: {
    network: "wss://s.altnet.rippletest.net:51233",
    escrowWalletSeed: "sEdVDummySeed123456789ABCDEFGHIJK",
  },
}

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback
  if (!value) {
    console.warn(`⚠️  Environment variable ${key} is not set. Using dummy value for development.`)
  }
  return value || ""
}

export const config: EnvironmentConfig = {
  firebase: {
    apiKey: getEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY", DUMMY_VALUES.firebase.apiKey),
    authDomain: getEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", DUMMY_VALUES.firebase.authDomain),
    projectId: getEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID", DUMMY_VALUES.firebase.projectId),
    storageBucket: getEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", DUMMY_VALUES.firebase.storageBucket),
    messagingSenderId: getEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", DUMMY_VALUES.firebase.messagingSenderId),
    appId: getEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID", DUMMY_VALUES.firebase.appId),
  },
  privy: {
    appId: getEnvVar("NEXT_PUBLIC_PRIVY_APP_ID", DUMMY_VALUES.privy.appId),
  },
  xrpl: {
    network: getEnvVar("NEXT_PUBLIC_XRPL_NETWORK", DUMMY_VALUES.xrpl.network),
    escrowWalletSeed: getEnvVar("ESCROW_WALLET_SEED", DUMMY_VALUES.xrpl.escrowWalletSeed),
  },
  app: {
    baseUrl: getEnvVar("NEXT_PUBLIC_BASE_URL", "http://localhost:3000"),
    environment: getEnvVar("NODE_ENV", "development") as "development" | "production" | "test",
  },
}

// Validation function to check if using dummy values
export function validateConfiguration(): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = []

  if (config.firebase.apiKey === DUMMY_VALUES.firebase.apiKey) {
    warnings.push("🔥 Using dummy Firebase configuration. Replace with real Firebase project settings.")
  }

  if (config.privy.appId === DUMMY_VALUES.privy.appId) {
    warnings.push("🔐 Using dummy Privy App ID. Replace with real Privy application ID.")
  }

  if (config.xrpl.escrowWalletSeed === DUMMY_VALUES.xrpl.escrowWalletSeed) {
    warnings.push("💰 Using dummy XRPL wallet seed. Replace with real wallet seed for production.")
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  }
}

// Development helper to show configuration status
if (typeof window !== "undefined" && config.app.environment === "development") {
  const { warnings } = validateConfiguration()
  if (warnings.length > 0) {
    console.group("🚧 Swift Market Configuration Warnings")
    warnings.forEach((warning) => console.warn(warning))
    console.groupEnd()
  }
}
