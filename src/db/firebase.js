import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyA0PYhAKM7OXaECpQeNKFW6tqPIG7hL6kY",
  authDomain: "skillscope-70bd9.firebaseapp.com",
  projectId: "skillscope-70bd9",
  storageBucket: "skillscope-70bd9.appspot.com",
  messagingSenderId: "427267857498",
  appId: "1:427267857498:web:a7b03d0475bc3eaf7f0c63",
  measurementId: "G-ZQTFVFEC56"
};

const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);