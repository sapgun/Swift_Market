"use client"

import { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Shield, Truck } from "lucide-react"
import type { Product, Seller } from "@/lib/types"
import { CredentialBadge } from "@/components/xrpl/credential-badge"
import { ChatWidget } from "@/components/realtime/chat-widget"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailContentProps {
  productId: string
}

export function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [seller, setSeller] = useState<Seller | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const productDoc = doc(db, "products", productId)

    const unsubscribe = onSnapshot(productDoc, (doc) => {
      if (doc.exists()) {
        const productData = { id: doc.id, ...doc.data() } as Product
        setProduct(productData)

        if (productData.sellerId) {
          const sellerDoc = doc(db, "sellers", productData.sellerId)
          onSnapshot(sellerDoc, (sellerSnapshot) => {
            if (sellerSnapshot.exists()) {
              setSeller({ id: sellerSnapshot.id, ...sellerSnapshot.data() } as Seller)
            }
          })
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [productId])

  const handlePurchase = async () => {
    if (!user || !product) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to make a purchase.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase Initiated",
      description: "Creating XRPL escrow transaction...",
    })

    // Mock purchase flow - in production, this would create actual escrow
    setTimeout(() => {
      toast({
        title: "Purchase Successful",
        description: "Your order has been placed and funds are in escrow.",
      })
    }, 2000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse h-64 bg-gray-200 rounded-lg" />
        ))}
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Product Images and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating}) • {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
            <Badge variant={product.condition === "new" ? "default" : "secondary"}>{product.condition}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.quantity > 0 ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm">{product.quantity > 0 ? `${product.quantity} available` : "Out of stock"}</span>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Purchase Button */}
          <Button onClick={handlePurchase} disabled={product.quantity === 0} className="w-full" size="lg">
            {product.quantity > 0 ? "Buy Now with XRPL Escrow" : "Out of Stock"}
          </Button>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4" />
                <span className="font-medium">Shipping</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ships from {product.location} • Estimated delivery: {product.shippingTime}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seller Information */}
      {seller && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seller Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <img src={seller.avatar || "/placeholder.svg"} alt={seller.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{seller.name}</h3>
                  <CredentialBadge address={seller.walletAddress} />
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{seller.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{seller.location}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{seller.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {seller && user && <ChatWidget receiverId={seller.id} receiverName={seller.name} />}
    </div>
  )
}
