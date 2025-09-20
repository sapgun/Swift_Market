'use client';

import PurchaseHistory from '@/components/PurchaseHistory';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, user } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return <p>Loading...</p>;
  }

  const walletAddress = user?.wallet?.address;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">My Wallet</h2>
        {walletAddress ? (
          <p className="font-mono bg-gray-100 p-2 rounded break-all">{walletAddress}</p>
        ) : (
          <p>No wallet connected.</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">My Purchases</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {user?.id ? <PurchaseHistory userId={user.id} /> : <p>Could not load purchases.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">My Sales</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Sales history will be implemented here */}
            <p>Your sales history will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
