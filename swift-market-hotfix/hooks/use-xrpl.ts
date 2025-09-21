"use client"

import { useState, useEffect } from "react"
import { Client } from "xrpl"

export function useXRPL() {
  const [client, setClient] = useState<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [balance, setBalance] = useState<string>("0")

  useEffect(() => {
    const initXRPL = async () => {
      try {
        const xrplClient = new Client(process.env.NEXT_PUBLIC_XRPL_NETWORK || "wss://s.altnet.rippletest.net:51233")
        await xrplClient.connect()
        setClient(xrplClient)
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to connect to XRPL:", error)
      }
    }

    initXRPL()

    return () => {
      if (client) {
        client.disconnect()
      }
    }
  }, [])

  const getBalance = async (address: string) => {
    if (!client || !isConnected) return "0"

    try {
      const response = await client.request({
        command: "account_info",
        account: address,
      })
      const balanceDrops = response.result.account_data.Balance
      return (Number.parseInt(balanceDrops) / 1000000).toString() // Convert drops to XRP
    } catch (error) {
      console.error("Failed to get balance:", error)
      return "0"
    }
  }

  return {
    client,
    isConnected,
    balance,
    getBalance,
  }
}
