// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0PYhAKM7OXaECpQeNKFW6tqPIG7hL6kY",
  authDomain: "skillscope-70bd9.firebaseapp.com",
  projectId: "skillscope-70bd9",
  storageBucket: "skillscope-70bd9.appspot.com",
  messagingSenderId: "427267857498",
  appId: "1:427267857498:web:a7b03d0475bc3eaf7f0c63",
  measurementId: "G-ZQTFVFEC56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);