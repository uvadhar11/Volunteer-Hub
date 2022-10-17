import React from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxxj17SlXivIeQczKJrDspmtjy0ZP_49k",
  authDomain: "volunteer-1856e.firebaseapp.com",
  projectId: "volunteer-1856e",
  storageBucket: "volunteer-1856e.appspot.com",
  messagingSenderId: "949286570426",
  appId: "1:949286570426:web:a05b0208f9ab36b7d33583",
  measurementId: "G-N346BNHXPS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
