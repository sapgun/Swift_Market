'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products. Please try again later.</p>;
  }

  if (products.length === 0) {
    return <p>No products available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
