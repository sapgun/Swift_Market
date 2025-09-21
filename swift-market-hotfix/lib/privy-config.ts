import type { PrivyClientConfig } from "@privy-io/react-auth"
import { config } from "./config/environment"

export const privyConfig: PrivyClientConfig = {
  appId: config.privy.appId,
  config: {
    loginMethods: ["google", "email"],
    appearance: {
      theme: "light",
      accentColor: "#10b981",
      logo: "/logo.png",
    },
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
      requireUserPasswordOnCreate: false,
    },
    mfa: {
      noPromptOnMfaRequired: false,
    },
  },
}
