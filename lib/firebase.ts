import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, db, functions };
