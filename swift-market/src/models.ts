
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  status: 'available' | 'sold';
  verifiedSeller?: boolean;
}

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  createdAt: any; // Firestore timestamp
}
