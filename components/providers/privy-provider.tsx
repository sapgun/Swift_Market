"use client"

import type React from "react"

import { PrivyProvider as BasePrivyProvider } from "@privy-io/react-auth"
import { WagmiConfig } from "@privy-io/wagmi-connector"

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <BasePrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["google", "twitter", "email"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <WagmiConfig>{children}</WagmiConfig>
    </BasePrivyProvider>
  )
}
