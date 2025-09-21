"use client"

import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import type { Order } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function useRealtimeOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const ordersQuery = query(collection(db, "orders"), where("buyerId", "==", userId), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const updatedOrders: Order[] = []

      snapshot.docChanges().forEach((change) => {
        const orderData = { id: change.doc.id, ...change.doc.data() } as Order

        if (change.type === "added") {
          updatedOrders.push(orderData)
        } else if (change.type === "modified") {
          toast({
            title: "Order Updated",
            description: `Order #${orderData.id.slice(-6)} status changed to ${orderData.status}`,
          })
        }
      })

      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Order))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId, toast])

  return { orders, loading }
}
