import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { config } from "./config/environment"

// Initialize Firebase with configuration
const firebaseApp = initializeApp(config.firebase)

// Initialize Firebase services
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

export default firebaseApp
