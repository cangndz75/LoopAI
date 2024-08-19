// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-loop-722fa.firebaseapp.com",
  projectId: "ai-loop-722fa",
  storageBucket: "ai-loop-722fa.appspot.com",
  messagingSenderId: "224941656484",
  appId: "1:224941656484:web:ad368d78112d1e51701931",
  measurementId: "G-4DXKQQNR04"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);