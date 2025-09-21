"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock } from "lucide-react"
import { useXRPL } from "@/hooks/use-xrpl"

export function EscrowStatus() {
  const [escrows, setEscrows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { client, isConnected } = useXRPL()

  useEffect(() => {
    const fetchEscrows = async () => {
      if (!client || !isConnected) return

      try {
        // Mock escrow data - in production, query actual XRPL escrows
        const mockEscrows = [
          {
            id: "ESC001",
            amount: "100",
            destination: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
            condition: "active",
            finishAfter: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        ]
        setEscrows(mockEscrows)
      } catch (error) {
        console.error("Failed to fetch escrows:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEscrows()
  }, [client, isConnected])

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-200 rounded-lg" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          XRPL Escrow Status
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {escrows.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No active escrows</p>
        ) : (
          <div className="space-y-4">
            {escrows.map((escrow) => (
              <div key={escrow.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Escrow #{escrow.id}</p>
                  <p className="text-sm text-muted-foreground">Amount: {escrow.amount} XRP</p>
                  <p className="text-xs text-muted-foreground">Finish After: {escrow.finishAfter.toLocaleString()}</p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Active
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
