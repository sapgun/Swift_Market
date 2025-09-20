import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { storage, db } from '../lib/firebase';
import { useToast } from '../context/ToastContext';

const CURRENCIES = ['USD', 'EUR', 'JPY', 'XRP'];

const CreateProduct: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentUser || !image) {
      showToast({
        title: 'Complete all fields',
        description: 'Please sign in and include a product image before listing.',
        variant: 'info',
      });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.error(error);
        setUploading(false);
        showToast({
          title: 'Upload failed',
          description: 'We could not process your image. Please try again.',
          variant: 'error',
        });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'products'), {
          name,
          description,
          price: Number(price),
          currency,
          imageUrl: downloadURL,
          sellerId: currentUser.uid,
          sellerName: currentUser.displayName ?? currentUser.email ?? 'Swift Market Seller',
          sellerPhotoURL: currentUser.photoURL ?? null,
          sellerVerified: true,
          status: 'available',
        });

        setUploading(false);
        showToast({
          title: 'Listing published',
          description: 'Your asset is live with XRPL escrow protection.',
          variant: 'success',
        });
        navigate('/');
      }
    );
  };

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Sign in to list an asset</h1>
          <p className="mt-4 text-sm text-slate-500">
            Swift Market listings are protected by XRPL escrow. Sign in to connect your trading account and publish items securely.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">List a new asset</h1>
          <p className="text-sm text-slate-500">
            Provide clear details so buyers can review provenance before initiating escrow. All listings undergo automated trust checks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-inner">
          <div className="grid gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Product name
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="XRPL Asset Title"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Share provenance, terms, and settlement preferences"
                rows={5}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
              <div>
                <label htmlFor="price" className="text-sm font-medium text-slate-700">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0.00"
                  min={0}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
                />
              </div>
              <div>
                <label htmlFor="currency" className="text-sm font-medium text-slate-700">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
                >
                  {CURRENCIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Product imagery</label>
              <div className="mt-2 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
                <p className="text-sm text-slate-500">Upload a square cover image. High-resolution visuals build buyer trust.</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="text-sm"
                />
                {image && <p className="text-xs text-slate-400">{image.name}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {uploading ? (
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-swift-blue/30 bg-swift-blue/5 px-4 py-3 text-sm text-swift-blue">
                <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-swift-blue" aria-hidden />
                Uploading {uploadProgress}%
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Listings go live instantly with XRPL escrow enabled. You can edit details from your dashboard.
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center justify-center rounded-full bg-swift-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {uploading ? 'Publishing…' : 'Publish listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
