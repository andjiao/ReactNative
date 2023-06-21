// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
// this setsup the authentification
import {getAuth} from "firebase/auth"

import { getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDNSHyj19ZHelCj2GMQ-tegdYmC-dsmZNs",
  authDomain: "review-d3c0b.firebaseapp.com",
  projectId: "review-d3c0b",
  storageBucket: "review-d3c0b.appspot.com",
  messagingSenderId: "415088930331",
  appId: "1:415088930331:web:53cd2490fbc6dda65492be",
  measurementId: "G-FQDJES0FEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const atuh = getAuth(app) 

export const db = getFirestore(app);

export const storage = getStorage(app);
