export interface User {
  id: string
  email?: string
  name?: string
  walletAddress?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  condition: "new" | "used" | "refurbished"
  category: string
  images: string[]
  quantity: number
  location: string
  shippingTime: string
  rating: number
  reviewCount: number
  sellerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  buyerId: string
  sellerId: string
  productId: string
  productName: string
  quantity: number
  totalAmount: number
  status: "pending" | "escrowed" | "shipped" | "delivered" | "completed" | "cancelled"
  escrowAddress?: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Seller {
  id: string
  name: string
  bio: string
  avatar?: string
  location: string
  rating: number
  reviewCount: number
  walletAddress: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}
