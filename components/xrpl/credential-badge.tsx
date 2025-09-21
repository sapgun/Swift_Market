"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, ShieldCheck } from "lucide-react"
import { useXRPL } from "@/hooks/use-xrpl"

interface CredentialBadgeProps {
  address?: string
}

export function CredentialBadge({ address }: CredentialBadgeProps) {
  const [hasCredential, setHasCredential] = useState(false)
  const [loading, setLoading] = useState(true)
  const { client, isConnected } = useXRPL()

  useEffect(() => {
    const checkCredentials = async () => {
      if (!address || !client || !isConnected) {
        setLoading(false)
        return
      }

      try {
        // Mock credential check - in production, query actual XRPL credentials
        // This would check for specific NFTs or account objects that represent credentials
        const mockHasCredential = Math.random() > 0.5 // 50% chance for demo
        setHasCredential(mockHasCredential)
      } catch (error) {
        console.error("Failed to check credentials:", error)
      } finally {
        setLoading(false)
      }
    }

    checkCredentials()
  }, [address, client, isConnected])

  if (loading) {
    return <div className="animate-pulse h-6 w-20 bg-gray-200 rounded" />
  }

  if (!address) {
    return null
  }

  return (
    <Badge variant={hasCredential ? "default" : "secondary"} className="flex items-center gap-1">
      {hasCredential ? (
        <>
          <ShieldCheck className="h-3 w-3" />
          Verified
        </>
      ) : (
        <>
          <Shield className="h-3 w-3" />
          Unverified
        </>
      )}
    </Badge>
  )
}
