"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EscrowStatus } from "@/components/xrpl/escrow-status"
import { Search, Filter, Download } from "lucide-react"

const mockOrderHistory = [
  {
    id: "order_001",
    productTitle: "Premium Wireless Headphones",
    buyerEmail: "john.doe@example.com",
    amount: 299,
    currency: "XRP",
    status: "completed" as const,
    escrowTxHash: "tx_hash_123456789",
    createdAt: new Date("2024-01-18"),
    completedAt: new Date("2024-01-25"),
  },
  {
    id: "order_002",
    productTitle: "Smart Fitness Watch",
    buyerEmail: "sarah.m@example.com",
    amount: 199,
    currency: "XRP",
    status: "shipped" as const,
    escrowTxHash: "tx_hash_987654321",
    createdAt: new Date("2024-01-17"),
    estimatedCompletion: new Date("2024-01-24"),
  },
  {
    id: "order_003",
    productTitle: "Premium Wireless Headphones",
    buyerEmail: "mike.wilson@example.com",
    amount: 299,
    currency: "XRP",
    status: "escrowed" as const,
    escrowTxHash: "tx_hash_456789123",
    createdAt: new Date("2024-01-16"),
    estimatedCompletion: new Date("2024-01-23"),
  },
  {
    id: "order_004",
    productTitle: "Mechanical Keyboard",
    buyerEmail: "lisa.chen@example.com",
    amount: 129,
    currency: "XRP",
    status: "delivered" as const,
    escrowTxHash: "tx_hash_789123456",
    createdAt: new Date("2024-01-15"),
    estimatedCompletion: new Date("2024-01-22"),
  },
]

export function OrderTracking() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = mockOrderHistory.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleExportOrders = () => {
    // In real app, this would generate and download a CSV/Excel file
    console.log("[v0] Exporting orders...")
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Order Tracking & Management
            <Button variant="outline" onClick={handleExportOrders}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, products, or buyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="escrowed">Escrowed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <EscrowStatus
            key={order.id}
            orderId={order.id}
            status={order.status}
            amount={order.amount}
            currency={order.currency}
            escrowTxHash={order.escrowTxHash}
            createdAt={order.createdAt}
            estimatedCompletion={order.estimatedCompletion}
            onCompleteOrder={() => console.log(`[v0] Complete order ${order.id}`)}
            onDisputeOrder={() => console.log(`[v0] Dispute order ${order.id}`)}
            onCancelOrder={() => console.log(`[v0] Cancel order ${order.id}`)}
          />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No orders found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
