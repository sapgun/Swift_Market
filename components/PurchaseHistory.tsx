'use client';

import { useUserOrders, Order } from '@/hooks/useUserOrders';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';

interface PurchaseHistoryProps {
  userId: string;
}

export default function PurchaseHistory({ userId }: PurchaseHistoryProps) {
  const { orders, loading, error } = useUserOrders(userId);
  const [feedback, setFeedback] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});

  const handleCompleteOrder = async (orderId: string) => {
    setIsLoading(prev => ({ ...prev, [orderId]: true }));
    setFeedback(prev => ({ ...prev, [orderId]: 'Finalizing order...' }));
    try {
      const functions = getFunctions();
      const completeOrder = httpsCallable(functions, 'completeOrder');
      await completeOrder({ orderId });
      setFeedback(prev => ({ ...prev, [orderId]: 'Order completed successfully!' }));
    } catch (error: any) {
      console.error('Error completing order:', error);
      setFeedback(prev => ({ ...prev, [orderId]: `Error: ${error.message}` }));
    } finally {
      setIsLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };

  if (loading) {
    return <p>Loading purchase history...</p>;
  }

  if (error) {
    return <p>Could not load purchase history.</p>;
  }

  if (orders.length === 0) {
    return <p>You have not made any purchases yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="p-4 border rounded-md shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">Order ID: <span className="font-normal font-mono text-sm">{order.id}</span></p>
              <p className="font-semibold">Product ID: <span className="font-normal font-mono text-sm">{order.productId}</span></p>
              <p className="font-semibold">Amount: <span className="font-normal">{order.amount} XRP</span></p>
              <p className="font-semibold">Status: <span className="font-normal capitalize">{order.status}</span></p>
              <p className="font-semibold">Date: <span className="font-normal text-sm">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</span></p>
            </div>
            {order.status === 'escrowed' && (
              <button
                onClick={() => handleCompleteOrder(order.id)}
                disabled={isLoading[order.id]}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {isLoading[order.id] ? 'Processing...' : 'Complete Purchase'}
              </button>
            )}
          </div>
          {feedback[order.id] && <p className="text-sm mt-2 text-center">{feedback[order.id]}</p>}
        </li>
      ))}
    </ul>
  );
}
