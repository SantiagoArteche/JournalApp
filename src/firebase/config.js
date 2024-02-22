// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3AvceB7UN1DZyW4G6i6v5DnFhj55-Aqc",
  authDomain: "journalapp-8a0ae.firebaseapp.com",
  projectId: "journalapp-8a0ae",
  storageBucket: "journalapp-8a0ae.appspot.com",
  messagingSenderId: "713992091310",
  appId: "1:713992091310:web:06fba1afeab491faf41f3f",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
