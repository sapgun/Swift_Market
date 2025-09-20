
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Product as ProductModel } from '../models';
import { functions } from '../lib/firebase'; // Assuming you will export functions from firebase.ts
import { httpsCallable } from 'firebase/functions';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
        if (id) {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() } as ProductModel);
            }
        }
    };

    fetchProduct();
  }, [id]);

  const handleBuy = async () => {
    if (product && currentUser) {
        const createOrder = httpsCallable(functions, 'createOrder');
        try {
            await createOrder({ productId: product.id });
            // Optionally, update the product status locally or refetch
            setProduct({ ...product, status: 'sold' });
        } catch (error) {
            console.error("Error creating order: ", error);
        }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl">${product.price}</p>
      <p>{product.description}</p>
      {currentUser && product.status === 'available' && product.sellerId !== currentUser.uid && (
        <button onClick={handleBuy} className="bg-blue-500 text-white p-2 rounded">Buy</button>
      )}
       {product.status === 'sold' && <p className='text-red-500'>This product is sold</p>}
    </div>
  );
};

export default Product;
