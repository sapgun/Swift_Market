"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Search, Filter } from "lucide-react"
import Link from "next/link"

// Extended mock product data
const allProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: "$299",
    originalPrice: "$399",
    image: "/wireless-headphones.png",
    seller: "TechStore Pro",
    rating: 4.8,
    reviews: 124,
    location: "Seoul, KR",
    verified: true,
    category: "Electronics",
    condition: "new" as const,
  },
  {
    id: 2,
    title: "Vintage Leather Jacket",
    price: "$180",
    originalPrice: "$250",
    image: "/leather-jacket-vintage.jpg",
    seller: "Fashion Hub",
    rating: 4.9,
    reviews: 89,
    location: "Tokyo, JP",
    verified: true,
    category: "Fashion",
    condition: "used" as const,
  },
  {
    id: 3,
    title: "Smart Fitness Watch",
    price: "$199",
    originalPrice: "$299",
    image: "/fitness-smartwatch.png",
    seller: "Gadget World",
    rating: 4.7,
    reviews: 203,
    location: "New York, US",
    verified: true,
    category: "Electronics",
    condition: "new" as const,
  },
  {
    id: 4,
    title: "Artisan Coffee Beans",
    price: "$45",
    originalPrice: "$60",
    image: "/coffee-beans-artisan.jpg",
    seller: "Bean Masters",
    rating: 4.9,
    reviews: 156,
    location: "São Paulo, BR",
    verified: true,
    category: "Food & Beverage",
    condition: "new" as const,
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    price: "$129",
    originalPrice: "$179",
    image: "/mechanical-keyboard.png",
    seller: "KeyCraft",
    rating: 4.6,
    reviews: 78,
    location: "Berlin, DE",
    verified: true,
    category: "Electronics",
    condition: "new" as const,
  },
  {
    id: 6,
    title: "Handmade Ceramic Vase",
    price: "$85",
    originalPrice: "$120",
    image: "/ceramic-vase-handmade.jpg",
    seller: "Artisan Crafts",
    rating: 4.8,
    reviews: 45,
    location: "Florence, IT",
    verified: true,
    category: "Home & Garden",
    condition: "new" as const,
  },
  {
    id: 7,
    title: "Professional Camera Lens",
    price: "$450",
    originalPrice: "$599",
    image: "/camera-lens-professional.jpg",
    seller: "Photo Pro",
    rating: 4.9,
    reviews: 67,
    location: "Los Angeles, US",
    verified: true,
    category: "Electronics",
    condition: "used" as const,
  },
  {
    id: 8,
    title: "Organic Skincare Set",
    price: "$89",
    originalPrice: "$120",
    image: "/skincare-organic-set.jpg",
    seller: "Natural Beauty",
    rating: 4.7,
    reviews: 134,
    location: "Copenhagen, DK",
    verified: true,
    category: "Beauty & Health",
    condition: "new" as const,
  },
]

const categories = ["All", "Electronics", "Fashion", "Food & Beverage", "Home & Garden", "Beauty & Health"]
const conditions = ["All", "New", "Used", "Refurbished"]
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating", "Most Reviews"]

export function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")

  // Filter and sort products
  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesCondition = selectedCondition === "All" || product.condition === selectedCondition.toLowerCase()
      return matchesSearch && matchesCategory && matchesCondition
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return Number.parseFloat(a.price.slice(1)) - Number.parseFloat(b.price.slice(1))
        case "Price: High to Low":
          return Number.parseFloat(b.price.slice(1)) - Number.parseFloat(a.price.slice(1))
        case "Rating":
          return b.rating - a.rating
        case "Most Reviews":
          return b.reviews - a.reviews
        default:
          return b.id - a.id // Newest first
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Discover amazing products from verified sellers worldwide</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredProducts.length} products</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-background/90 text-foreground">
                        Save{" "}
                        {(
                          ((Number.parseFloat(product.originalPrice.slice(1)) -
                            Number.parseFloat(product.price.slice(1))) /
                            Number.parseFloat(product.originalPrice.slice(1))) *
                          100
                        ).toFixed(0)}
                        %
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {product.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm font-medium">{product.seller}</span>
                      {product.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No products found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
