import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdrasQEtjocXkNLZXBDjNnv8H_xmlFv3k",
  authDomain: "cybertrack-724cd.firebaseapp.com",
  projectId: "cybertrack-724cd",
  storageBucket: "cybertrack-724cd.firebasestorage.app",
  messagingSenderId: "535362198847",
  appId: "1:535362198847:web:206b7a11f37ec63a98c78a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);