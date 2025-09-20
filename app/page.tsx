import ProductList from "@/components/ProductList";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Products</h1>
      <ProductList />
    </div>
  );
}
