import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVLUUAr6Q5T2nNHJ8wuMax9eWlyUQSVsE",
  authDomain: "kpi-fin.firebaseapp.com",
  projectId: "kpi-fin",
  storageBucket: "kpi-fin.appspot.com",
  messagingSenderId: "1060980863",
  appId: "1:1060980863:web:68b4b4c26e68ad0b08d74a",
  measurementId: "G-FQ5TM9HM1K"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Initialize Firestore

export { firestore };
