
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const readEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: readEnv('REACT_APP_API_KEY'),
  authDomain: readEnv('REACT_APP_AUTH_DOMAIN'),
  projectId: readEnv('REACT_APP_PROJECT_ID'),
  storageBucket: readEnv('REACT_APP_STORAGE_BUCKET'),
  messagingSenderId: readEnv('REACT_APP_MESSAGING_SENDER_ID'),
  appId: readEnv('REACT_APP_APP_ID'),
  measurementId: process.env.REACT_APP_MEASUREMENT_ID ?? undefined
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
