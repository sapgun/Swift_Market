'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">My Purchases</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p>Your purchase history will appear here.</p>
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
