import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Product as ProductModel } from '../models';
import VerifiedBadge from '../components/VerifiedBadge';
import TrustBadge from '../components/TrustBadge';
import { useToast } from '../context/ToastContext';
import { sampleProducts } from '../data/sampleProducts';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        return;
      }

      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as ProductModel;
          setProduct(data);
          setSelectedImage(data.imageUrl);
          return;
        }
      } catch (error) {
        console.error('Failed to load product from Firestore. Falling back to sample catalogue.', error);
      }

      const fallbackProduct = sampleProducts.find((item) => item.id === id) ?? null;
      if (fallbackProduct) {
        setProduct(fallbackProduct);
        setSelectedImage(fallbackProduct.imageUrl);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuy = async () => {
    if (!product || !currentUser) {
      return;
    }

    const createOrder = httpsCallable(functions, 'createOrder');

    try {
      setIsPurchasing(true);
      await createOrder({ productId: product.id });
      setProduct({ ...product, status: 'sold' });
      showToast({
        title: 'Escrow initiated',
        description: 'Your XRPL escrow has been created. Expect settlement in ~5 seconds.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error creating order: ', error);
      showToast({
        title: 'Unable to create order',
        description: 'Please try again or contact support if the issue persists.',
        variant: 'error',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const unique = new Set<string>();
    unique.add(product.imageUrl);
    return Array.from(unique);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="aspect-square animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-9 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {galleryImages.length > 1 && (
            <div className="flex gap-4">
              {galleryImages.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`h-20 w-20 overflow-hidden rounded-2xl border transition ${
                    image === selectedImage ? 'border-swift-blue ring-2 ring-swift-blue/40' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="Product thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
              XRPL Marketplace
              <span className="inline-flex h-1 w-1 rounded-full bg-swift-blue" />
              {product.status === 'available' ? 'Available now' : 'In escrow'}
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{product.name}</h1>
            <p className="text-lg leading-relaxed text-slate-600">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-inner">
            <div>
              <p className="text-sm text-slate-500">Asking price</p>
              <p className="text-3xl font-semibold text-slate-900">
                {product.currency ?? 'USD'} {Number(product.price ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-px bg-slate-200" aria-hidden />
            <div className="flex items-center gap-3">
              {product.sellerPhotoURL ? (
                <img
                  src={product.sellerPhotoURL}
                  alt={product.sellerName ?? 'Seller'}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-swift-blue/10 text-base font-semibold text-swift-blue">
                  {product.sellerName?.[0]?.toUpperCase() ?? 'S'}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">{product.sellerName ?? 'Verified XRPL Seller'}</p>
                <p className="text-xs text-slate-500">
                  {product.sellerVerified ? <VerifiedBadge /> : 'Trusted via escrow'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {currentUser && product.status === 'available' && product.sellerId !== currentUser.uid ? (
              <button
                onClick={handleBuy}
                disabled={isPurchasing}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-swift-blue px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                <span>Buy now with XRPL escrow</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                {isPurchasing && <span className="ml-2 text-sm font-medium text-white/80">Processing…</span>}
              </button>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                {product.status === 'sold'
                  ? 'This asset has been sold. Explore related listings or connect with the seller for future drops.'
                  : 'Sign in to initiate an XRPL escrow or follow this seller for new listings.'}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <TrustBadge
                title="XRPL Escrow Protection"
                description="Funds are released only after both parties confirm delivery."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M10 0a1 1 0 0 1 .555.168l7 4.667A1 1 0 0 1 18 5.667V10c0 5.255-3.82 9.86-8.889 10.835a1 1 0 0 1-.222 0C3.82 19.86 0 15.255 0 10V5.667a1 1 0 0 1 .445-.832l7-4.667A1 1 0 0 1 10 0Z" />
                    <path
                      fill="white"
                      d="M14.78 7.22a.75.75 0 0 0-1.06-1.06L9 10.879 6.78 8.659a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.25-5.25Z"
                    />
                  </svg>
                }
              />
              <TrustBadge
                title="5-second settlement"
                description="XRPL finality ensures your transaction clears in seconds."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M10 18.75a8.75 8.75 0 1 0 0-17.5 8.75 8.75 0 0 0 0 17.5Z" />
                    <path fill="white" d="M9.375 5a.625.625 0 0 1 1.25 0v4.082l3.286 1.754a.625.625 0 1 1-.572 1.116l-3.536-1.888A.625.625 0 0 1 9.375 9.5V5Z" />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-inner">
            <h2 className="text-lg font-semibold text-slate-900">Trade transparency</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Escrow reference</span>
                <span className="font-medium text-slate-900">#{product.id.slice(0, 6).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Settlement speed</span>
                <span className="font-medium text-slate-900">≈ 5 seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Seller rating</span>
                <span className="font-medium text-slate-900">4.9 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
