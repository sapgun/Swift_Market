import { ProductDetailContent } from "@/components/products/product-detail-content"
import { Header } from "@/components/header"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ProductDetailContent productId={params.id} />
        </div>
      </main>
    </div>
  )
}
