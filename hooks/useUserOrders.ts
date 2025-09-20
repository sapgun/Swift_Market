import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Order {
  id: string;
  buyerUid: string;
  productId: string;
  amount: number;
  status: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export function useUserOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'orders'), where('buyerUid', '==', userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData: Order[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data(),
          } as Order)
        );
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching user orders: ", err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [userId]);

  return { orders, loading, error };
}
