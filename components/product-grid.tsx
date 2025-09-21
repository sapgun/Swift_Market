import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

// Mock product data
const products = [
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
  },
]

export function ProductGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products from verified sellers around the world. All transactions protected by XRPL escrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
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
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
