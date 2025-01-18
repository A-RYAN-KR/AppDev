// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJczu6P0T33OeKRarsPXi-b0BdaHSrPNM",
  authDomain: "restapp-2f030.firebaseapp.com",
  projectId: "restapp-2f030",
  storageBucket: "restapp-2f030.firebasestorage.app",
  messagingSenderId: "322904990314",
  appId: "1:322904990314:android:5bedbbb14ddbddebe32013"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);