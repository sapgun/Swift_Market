'use client';

import { useAuth } from '@/context/AuthContext';
import { Product } from '@/models';
import { useRouter } from 'next/navigation';

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleBuy = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Call your purchase function here
    alert(`You have purchased ${product.name}!`);
  };

  return (
    <button
      onClick={handleBuy}
      className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Buy Now
    </button>
  );
}
