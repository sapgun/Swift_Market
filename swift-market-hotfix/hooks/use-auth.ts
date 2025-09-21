"use client"

import { usePrivy } from "@privy-io/react-auth"

export function useAuth() {
  const { ready, authenticated, login, logout, user } = usePrivy()

  return {
    ready,
    authenticated,
    login,
    logout,
    user,
    isLoading: !ready,
  }
}
