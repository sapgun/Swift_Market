
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHGnqF5vW0J4wb7ackje7K5k1j8fDkZDo",
  authDomain: "swift-market-2363d.firebaseapp.com",
  projectId: "swift-market-2363d",
  storageBucket: "swift-market-2363d.firebasestorage.app",
  messagingSenderId: "245691126281",
  appId: "1:245691126281:web:2e6288b1089fc3d09c1ed8",
  measurementId: "G-R9EBCNL69N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
