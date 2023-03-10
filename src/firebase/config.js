import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyD2-B--Fp3zFrBbXVV3MDTGQAF3dKunot8",
  authDomain: "eshop-59f99.firebaseapp.com",
  projectId: "eshop-59f99",
  storageBucket: "eshop-59f99.appspot.com",
  messagingSenderId: "420451969815",
  appId: "1:420451969815:web:fb290720fab52175cd2552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;