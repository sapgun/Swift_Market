
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../models';
import { sampleProducts } from '../data/sampleProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));

        if (productsData.length) {
          setProducts(productsData);
        } else {
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error('Failed to load products from Firestore. Falling back to sample data.', error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
