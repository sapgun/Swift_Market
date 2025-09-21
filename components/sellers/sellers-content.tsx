"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Search, Package, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock seller data
const sellers = [
  {
    id: "seller1",
    name: "TechStore Pro",
    avatar: "/placeholder.svg",
    rating: 4.8,
    totalReviews: 1247,
    verified: true,
    joinedDate: "2022-03-15",
    location: "Seoul, KR",
    totalProducts: 156,
    totalSales: 2340,
    responseTime: "< 1 hour",
    categories: ["Electronics", "Gadgets"],
    description: "Premium electronics and gadgets from trusted brands. Fast shipping worldwide.",
  },
  {
    id: "seller2",
    name: "Fashion Hub",
    avatar: "/placeholder.svg",
    rating: 4.9,
    totalReviews: 892,
    verified: true,
    joinedDate: "2021-08-20",
    location: "Tokyo, JP",
    totalProducts: 234,
    totalSales: 1890,
    responseTime: "< 2 hours",
    categories: ["Fashion", "Accessories"],
    description: "Curated fashion items and accessories from Japan. Authentic vintage and modern pieces.",
  },
  {
    id: "seller3",
    name: "Gadget World",
    avatar: "/placeholder.svg",
    rating: 4.7,
    totalReviews: 1456,
    verified: true,
    joinedDate: "2020-12-10",
    location: "New York, US",
    totalProducts: 89,
    totalSales: 3200,
    responseTime: "< 30 minutes",
    categories: ["Electronics", "Smart Devices"],
    description: "Latest smart devices and innovative gadgets. Authorized dealer with warranty support.",
  },
  {
    id: "seller4",
    name: "Bean Masters",
    avatar: "/placeholder.svg",
    rating: 4.9,
    totalReviews: 567,
    verified: true,
    joinedDate: "2023-01-05",
    location: "São Paulo, BR",
    totalProducts: 45,
    totalSales: 890,
    responseTime: "< 4 hours",
    categories: ["Food & Beverage", "Coffee"],
    description: "Artisan coffee beans sourced directly from Brazilian farms. Fresh roasted to order.",
  },
  {
    id: "seller5",
    name: "KeyCraft",
    avatar: "/placeholder.svg",
    rating: 4.6,
    totalReviews: 234,
    verified: true,
    joinedDate: "2022-11-18",
    location: "Berlin, DE",
    totalProducts: 67,
    totalSales: 456,
    responseTime: "< 6 hours",
    categories: ["Electronics", "Gaming"],
    description: "Custom mechanical keyboards and gaming accessories. Handcrafted with premium materials.",
  },
  {
    id: "seller6",
    name: "Artisan Crafts",
    avatar: "/placeholder.svg",
    rating: 4.8,
    totalReviews: 123,
    verified: true,
    joinedDate: "2023-06-12",
    location: "Florence, IT",
    totalProducts: 78,
    totalSales: 234,
    responseTime: "< 12 hours",
    categories: ["Home & Garden", "Handmade"],
    description: "Handmade ceramics and home decor items. Each piece is unique and crafted with care.",
  },
]

export function SellersContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      seller.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verified Sellers</h1>
          <p className="text-muted-foreground">Discover trusted sellers from around the world</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sellers, categories, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <Card key={seller.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{seller.name}</CardTitle>
                      {seller.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{seller.rating}</span>
                      <span>({seller.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{seller.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{seller.description}</p>

                <div className="flex flex-wrap gap-1">
                  {seller.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{seller.totalProducts} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{seller.totalSales} sales</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span>Response time: {seller.responseTime}</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/sellers/${seller.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No sellers found</p>
              <p>Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
