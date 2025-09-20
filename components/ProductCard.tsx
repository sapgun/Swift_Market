'use client';

import { Product } from '@/hooks/useProducts';
import Image from 'next/image';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { authenticated } = usePrivy();

  const handlePurchase = async () => {
    if (!authenticated) {
      setFeedback('Please log in to purchase an item.');
      return;
    }
    setIsLoading(true);
    setFeedback('Processing your order...');
    try {
      const functions = getFunctions();
      const createOrder = httpsCallable(functions, 'createOrder');
      const result = await createOrder({ productId: product.id });
      console.log('Order created successfully:', result.data);
      setFeedback(`Success! Order ID: ${(result.data as any).orderId}. You can view it in your dashboard.`);
    } catch (error: any) {
      console.error('Error creating order:', error);
      setFeedback(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-gray-600 mt-1 text-sm h-10 overflow-hidden">{product.description}</p>
        </div>
      </Link>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{product.price} XRP</span>
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
        {feedback && <p className="text-sm mt-2 text-center">{feedback}</p>}
      </div>
    </div>
  );
}
