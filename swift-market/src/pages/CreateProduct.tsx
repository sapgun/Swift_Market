
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage, db } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateProduct: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !image) return;

    setUploading(true);
    const storageRef = ref(storage, `products/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Progress function
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, 'products'), {
            name,
            description,
            price: Number(price),
            imageUrl: downloadURL,
            sellerId: currentUser.uid,
            status: 'available'
          });
          setUploading(false);
          navigate('/');
        });
      }
    );
  };

  if (!currentUser) {
    return <div>Please log in to create a product.</div>;
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required className="w-full p-2 border" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="w-full p-2 border" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="w-full p-2 border" />
        <input type="file" onChange={handleImageChange} required />
        <button type="submit" disabled={uploading} className="bg-blue-500 text-white p-2 rounded">
          {uploading ? 'Uploading...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
