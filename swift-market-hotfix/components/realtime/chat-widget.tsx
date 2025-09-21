"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { collection, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Message {
  id: string
  senderId: string
  receiverId: string
  message: string
  timestamp: Date
  orderId?: string
}

interface ChatWidgetProps {
  receiverId: string
  receiverName: string
  orderId?: string
}

export function ChatWidget({ receiverId, receiverName, orderId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!isOpen || !user) return

    const messagesQuery = query(
      collection(db, "messages"),
      where("participants", "array-contains", user.id),
      orderBy("timestamp", "asc"),
    )

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const chatMessages = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate() || new Date(),
            }) as Message,
        )
        .filter(
          (msg) =>
            (msg.senderId === user.id && msg.receiverId === receiverId) ||
            (msg.senderId === receiverId && msg.receiverId === user.id),
        )

      setMessages(chatMessages)
      scrollToBottom()
    })

    return () => unsubscribe()
  }, [isOpen, user, receiverId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || loading) return

    setLoading(true)
    try {
      await addDoc(collection(db, "messages"), {
        senderId: user.id,
        receiverId,
        message: newMessage.trim(),
        timestamp: new Date(),
        participants: [user.id, receiverId],
        orderId: orderId || null,
      })

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-12 h-12 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Chat with {receiverName}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col h-80">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.senderId === user?.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={loading}
              />
              <Button onClick={sendMessage} disabled={loading || !newMessage.trim()} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
