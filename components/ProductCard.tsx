
import React from 'react';
import Link from 'next/link';
import { Product } from '../models';
import VerifiedBadge from './VerifiedBadge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isVerified = Boolean(product.sellerVerified);

  const formattedPrice = Number(product.price ?? 0).toLocaleString();

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {isVerified && (
          <div className="absolute left-3 top-3">
            <VerifiedBadge />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500 [display:-webkit-box] [overflow:hidden] [text-overflow:ellipsis] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-slate-900">
              {product.currency ?? 'USD'} {formattedPrice}
            </p>
            <p className="text-xs text-slate-500">
              Seller: {product.sellerName || 'Swift Market Vendor'}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {product.status === 'sold' ? 'Sold' : 'Available'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
