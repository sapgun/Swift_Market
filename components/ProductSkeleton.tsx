
import React from 'react';

const ProductSkeleton: React.FC = () => (
  <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="aspect-square bg-slate-200" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-3/4 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-4 w-2/3 rounded bg-slate-200" />
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded bg-slate-200" />
        <div className="h-6 w-16 rounded-full bg-slate-200" />
      </div>
    </div>
  </div>
);

export default ProductSkeleton;
