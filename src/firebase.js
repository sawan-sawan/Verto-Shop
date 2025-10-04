// firebase.js

// Firebase se zaroori functions import karein
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication ke liye yeh zaroori hai
import { getFirestore } from "firebase/firestore";
// Aapka Firebase configuration object jo aapne copy kiya tha
const firebaseConfig = {
  apiKey: "AIzaSyDgdhbri4T7zJNS2GhNzISzmRv86jGUsjc",
  authDomain: "vertoshop-d2416.firebaseapp.com",
  projectId: "vertoshop-d2416",
  storageBucket: "vertoshop-d2416.appspot.com", // Aapke config mein .firebasestorage.app hai, woh bhi aal jayega
  messagingSenderId: "62822078575",
  appId: "1:62822078575:web:19da94f2e70a7d46e2959a",
  measurementId: "G-JMNZ7ESXHR"
};

// Firebase ko initialize (shuru) karein
const app = initializeApp(firebaseConfig);

// Authentication service ko initialize karein aur use export karein taaki hum ise doosri files mein use kar sakein
export const auth = getAuth(app);
export const db = getFirestore(app);