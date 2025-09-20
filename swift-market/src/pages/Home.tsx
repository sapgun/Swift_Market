
import React, { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../context/SearchContext';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const { query } = useSearch();
  const [visibleProducts, setVisibleProducts] = useState(8);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = `${product.name} ${product.description} ${product.sellerName ?? ''}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [products, query]);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 8);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6">
      <section className="grid gap-12 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary shadow-sm">
            Digital Trust · Powered by XRPL
          </span>
          <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
            Swift Market connects verified traders around the globe with lightning-fast XRPL settlement.
          </h1>
          <p className="text-lg text-text-secondary">
            Discover tokenized assets, rare collectibles, and cross-border listings in a marketplace that balances speed with uncompromising security.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#listings"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Explore listings
            </a>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <div className="flex -space-x-2 overflow-hidden">
                {[1, 2, 3].map((avatar) => (
                  <span
                    key={avatar}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gray-200 text-xs font-semibold text-text-secondary"
                  >
                    XR
                  </span>
                ))}
              </div>
              4,500+ secured peer settlements this month
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Escrow Volume</p>
                  <p className="mt-3 text-2xl font-semibold text-text-primary">$3.2M</p>
                  <p className="text-xs text-green-500">+12% vs last month</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Average Settlement</p>
                  <p className="mt-3 text-2xl font-semibold text-text-primary">5.1s</p>
                  <p className="text-xs text-text-secondary">XRPL-backed finality</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Verified Sellers</p>
                  <p className="mt-3 text-2xl font-semibold text-text-primary">1,284</p>
                  <p className="text-xs text-green-500">+86 this week</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Active Escrows</p>
                  <p className="mt-3 text-2xl font-semibold text-text-primary">312</p>
                  <p className="text-xs text-yellow-500">Monitored 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="listings" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Featured listings</h2>
            <p className="text-sm text-text-secondary">Hand-picked assets from trusted XRPL sellers.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
            Real-time escrow protection active
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-text-primary">No listings match your search</h3>
            <p className="mt-2 text-sm text-text-secondary">Try adjusting your filters or explore trending items curated by our team.</p>
          </div>
        )}

        {visibleProducts < filteredProducts.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
