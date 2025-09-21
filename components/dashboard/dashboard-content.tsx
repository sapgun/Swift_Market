"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, ShoppingBag, TrendingUp, Clock, Package, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useXRPL } from "@/hooks/use-xrpl"
import { EscrowStatus } from "@/components/xrpl/escrow-status"
import { CredentialBadge } from "@/components/xrpl/credential-badge"
import { useRealtimeOrders } from "@/hooks/use-realtime-orders"
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications"

export function DashboardContent() {
  const { user } = useAuth()
  const { balance, isConnected } = useXRPL()
  const { orders, loading: ordersLoading } = useRealtimeOrders(user?.id)
  const { notifications, unreadCount } = useRealtimeNotifications(user?.id)

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please connect your wallet to view your dashboard.</p>
      </div>
    )
  }

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter((order) => ["pending", "escrowed", "shipped"].includes(order.status)).length,
    completedOrders: orders.filter((order) => order.status === "completed").length,
    totalSpent: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
  }

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-muted-foreground">{user.google?.name || user.email?.address || "Anonymous User"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-muted-foreground">{user.email?.address || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm">XRPL Wallet: {isConnected ? "Connected" : "Disconnected"}</span>
          </div>

          {isConnected && (
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm font-medium text-emerald-800">XRP Balance</p>
              <p className="text-lg font-bold text-emerald-900">{balance} XRP</p>
            </div>
          )}

          <CredentialBadge address={user.wallet?.address} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold">{stats.activeOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completedOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Recent Orders
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.productName} • ${order.totalAmount}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "completed" ? "default" : order.status === "shipped" ? "secondary" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EscrowStatus />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recent Activity
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-blue-500" : "bg-gray-300"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.createdAt.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
