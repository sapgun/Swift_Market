
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName?: string;
  sellerPhotoURL?: string | null;
  sellerVerified?: boolean;
  currency?: string;
  status: 'available' | 'sold';
  verifiedSeller?: boolean;
}

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  createdAt: any; // Firestore timestamp
  status?: 'in-escrow' | 'shipped' | 'completed' | 'cancelled';
  amount?: number;
  currency?: string;
}
