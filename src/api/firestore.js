import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHpXeyfCGqHyuqz8LlkHUPYAvl2DZZ5q4",
  authDomain: "english-91f46.firebaseapp.com",
  projectId: "english-91f46",
  storageBucket: "english-91f46.appspot.com",
  messagingSenderId: "654894440582",
  appId: "1:654894440582:web:170a77d6b589abe5c63107",
  measurementId: "G-Z1GH05HT8P"
};

initializeApp(firebaseConfig);
export const firestore = getFirestore();
