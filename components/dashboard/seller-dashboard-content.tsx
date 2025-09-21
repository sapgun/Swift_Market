"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { useXRPL } from "@/hooks/use-xrpl"
import {
  Package,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Calendar,
  Star,
  MessageSquare,
} from "lucide-react"
import { toast } from "sonner"

// Mock seller data
const mockSellerStats = {
  totalProducts: 12,
  totalSales: 156,
  totalRevenue: 4250,
  averageRating: 4.8,
  totalReviews: 89,
  responseRate: 98,
  monthlyGrowth: 15.2,
}

const mockProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299,
    status: "active",
    views: 1247,
    sales: 23,
    rating: 4.8,
    reviews: 45,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199,
    status: "active",
    views: 892,
    sales: 18,
    rating: 4.6,
    reviews: 32,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    price: 129,
    status: "draft",
    views: 0,
    sales: 0,
    rating: 0,
    reviews: 0,
    createdAt: "2024-01-20",
  },
]

const mockOrders = [
  {
    id: "order_001",
    product: "Premium Wireless Headphones",
    buyer: "john.doe@example.com",
    amount: 299,
    status: "completed",
    date: "2024-01-18",
    escrowTx: "tx_hash_123",
  },
  {
    id: "order_002",
    product: "Smart Fitness Watch",
    buyer: "sarah.m@example.com",
    amount: 199,
    status: "shipped",
    date: "2024-01-17",
    escrowTx: "tx_hash_456",
  },
  {
    id: "order_003",
    product: "Premium Wireless Headphones",
    buyer: "mike.wilson@example.com",
    amount: 299,
    status: "escrowed",
    date: "2024-01-16",
    escrowTx: "tx_hash_789",
  },
]

export function SellerDashboardContent() {
  const { displayName } = useAuth()
  const { balance } = useXRPL()
  const [activeTab, setActiveTab] = useState("overview")

  const handleCreateProduct = () => {
    toast.success("Redirecting to product creation...")
    // In real app, navigate to product creation form
  }

  const handleEditProduct = (productId: number) => {
    toast.success(`Editing product ${productId}...`)
    // In real app, navigate to product edit form
  }

  const handleViewProduct = (productId: number) => {
    window.open(`/products/${productId}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, orders, and seller performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSellerStats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSellerStats.totalSales}</div>
                  <p className="text-xs text-muted-foreground">+{mockSellerStats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockSellerStats.totalRevenue}</div>
                  <p className="text-xs text-muted-foreground">XRPL Balance: {balance.toFixed(2)} XRP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSellerStats.averageRating}</div>
                  <p className="text-xs text-muted-foreground">{mockSellerStats.totalReviews} reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.buyer}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">${order.amount}</p>
                        <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Products</h2>
              <Button onClick={handleCreateProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{product.title}</h3>
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-primary">${product.price}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{product.views} views</span>
                          <span>{product.sales} sales</span>
                          {product.rating > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {product.rating} ({product.reviews})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewProduct(product.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Order Management</h2>

            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">#{order.id}</p>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : order.status === "escrowed"
                                    ? "outline"
                                    : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.buyer}</p>
                        <p className="text-xs text-muted-foreground">
                          XRPL TX: {order.escrowTx.slice(0, 8)}...{order.escrowTx.slice(-8)}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-xl font-bold">${order.amount}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="font-bold">$1,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <span className="font-bold">$1,087</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">Growth</span>
                      <span className="font-bold text-green-600">+15.0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Customers</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Repeat Customers</span>
                      <span className="font-bold">23 (26%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Order Value</span>
                      <span className="font-bold">$187</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Order #order_001 completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">New review received (5 stars)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Product view milestone: 1000 views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockProducts
                      .filter((p) => p.sales > 0)
                      .map((product) => (
                        <div key={product.id} className="flex justify-between items-center">
                          <span className="text-sm">{product.title}</span>
                          <span className="font-medium">{product.sales} sales</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Seller Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Store Name</label>
                    <Input defaultValue={displayName} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Store Description</label>
                    <Textarea
                      placeholder="Tell customers about your store..."
                      defaultValue="Premium electronics and gadgets from trusted brands. Fast shipping worldwide."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input defaultValue="Seoul, KR" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Shipping Cost</label>
                    <Input type="number" defaultValue="15" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Processing Time</label>
                    <Select defaultValue="1-2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 business days</SelectItem>
                        <SelectItem value="3-5">3-5 business days</SelectItem>
                        <SelectItem value="5-7">5-7 business days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">International Shipping</label>
                    <Select defaultValue="yes">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Available</SelectItem>
                        <SelectItem value="no">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
