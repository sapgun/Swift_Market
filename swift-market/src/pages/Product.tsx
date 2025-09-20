
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, functions } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Product as ProductModel, User } from '../models';
import { httpsCallable } from 'firebase/functions';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDocRef = doc(db, 'products', id);
        const productDocSnap = await getDoc(productDocRef);

        if (productDocSnap.exists()) {
          const productData = { id: productDocSnap.id, ...productDocSnap.data() } as ProductModel;
          setProduct(productData);

          const sellerDocRef = doc(db, 'users', productData.sellerId);
          const sellerDocSnap = await getDoc(sellerDocRef);
          if (sellerDocSnap.exists()) {
            setSeller(sellerDocSnap.data() as User);
          }
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
        if(product){
            setProduct({ ...product, status: 'sold' });
        }
      } catch (error) {
        console.error('Error creating order: ', error);
      }
    }
  };

  if (!product) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover" />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">How Escrow Works</h3>
                <p className="text-text-secondary">When you buy an item, your XRP is held securely in an on-ledger escrow account. The funds are automatically released to the seller only after you confirm you have received the item. This protects both buyer and seller. <a href="#" className="text-primary hover:underline">Learn more</a></p>
            </div>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Marketplace / Collectibles</p>
            <h1 className="text-4xl font-bold text-text-primary mt-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mt-4">{product.price} XRP</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text-primary">Description</h3>
              <p className="text-text-secondary mt-2">{product.description}</p>
            </div>

            {seller && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text-primary">Seller</h3>
                <div className="flex items-center mt-4">
                  <img src={seller.photoURL || 'https://via.placeholder.com/50'} alt={seller.displayName || 'Seller'} className="h-12 w-12 rounded-full" />
                  <div className="ml-4">
                    <p className="font-semibold text-text-primary">{seller.displayName || 'Anonymous'}</p>
                    {product.verifiedSeller && (
                        <div className="flex items-center text-sm text-accent mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Seller
                        </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex space-x-4">
              {currentUser && product.status === 'available' && product.sellerId !== currentUser.uid && (
                <>
                    <button onClick={handleBuy} className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors duration-300">
                        Buy Now
                    </button>
                    <button className="flex-1 bg-secondary text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                        Add to Cart
                    </button>
                </>
              )}
            </div>
            {product.status === 'sold' && <p className='text-red-500 mt-4'>This product is sold</p>}

            <div className="mt-8 space-y-4">
                <div className="flex items-center text-sm text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0018 0 12.02 12.02 0 00-2.382-8.984z" />
                    </svg>
                    XRPL Escrow Protected
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Instant Settlement
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
