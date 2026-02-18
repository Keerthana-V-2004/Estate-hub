// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estatehub-4cf08.firebaseapp.com",
  projectId: "estatehub-4cf08",
  storageBucket: "estatehub-4cf08.firebasestorage.app",
  messagingSenderId: "1092854551349",
  appId: "1:1092854551349:web:4d7cea74282b8386cff27c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);