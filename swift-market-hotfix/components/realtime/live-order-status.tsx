"use client"

import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import type { Order } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, CheckCircle, Clock } from "lucide-react"

interface LiveOrderStatusProps {
  orderId: string
}

export function LiveOrderStatus({ orderId }: LiveOrderStatusProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderDoc = doc(db, "orders", orderId)

    const unsubscribe = onSnapshot(orderDoc, (doc) => {
      if (doc.exists()) {
        setOrder({ id: doc.id, ...doc.data() } as Order)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [orderId])

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-200 rounded-lg" />
  }

  if (!order) {
    return <div>Order not found</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "escrowed":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "escrowed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live Order Status
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Order #{order.id.slice(-6)}</span>
            <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-2">
            {["pending", "escrowed", "shipped", "delivered", "completed"].map((status, index) => {
              const isActive = order.status === status
              const isCompleted =
                ["pending", "escrowed", "shipped", "delivered", "completed"].indexOf(order.status) > index

              return (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isActive ? "bg-blue-500 animate-pulse" : isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isActive ? "font-medium text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              )
            })}
          </div>

          {order.escrowAddress && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm font-medium text-emerald-800">XRPL Escrow Active</p>
              <p className="text-xs text-emerald-600 mt-1">
                Address: {order.escrowAddress.slice(0, 8)}...{order.escrowAddress.slice(-6)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
