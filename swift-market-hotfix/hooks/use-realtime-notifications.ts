"use client"

import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  userId: string
  type: "order_update" | "message" | "payment" | "escrow"
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export function useRealtimeNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    if (!userId) return

    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(50),
    )

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const updatedNotifications: Notification[] = []
      const newUnreadCount = 0

      snapshot.docChanges().forEach((change) => {
        const notificationData = {
          id: change.doc.id,
          ...change.doc.data(),
          createdAt: change.doc.data().createdAt?.toDate() || new Date(),
        } as Notification

        if (change.type === "added" && !notificationData.read) {
          toast({
            title: notificationData.title,
            description: notificationData.message,
          })
        }
      })

      const allNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          }) as Notification,
      )

      setNotifications(allNotifications)
      setUnreadCount(allNotifications.filter((n) => !n.read).length)
    })

    return () => unsubscribe()
  }, [userId, toast])

  return { notifications, unreadCount }
}
