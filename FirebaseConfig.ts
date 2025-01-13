// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIfDGNXJDUBmkP9T9nyCnGg5hXJ3TLHxI",
  authDomain: "waiter-app-7c4e3.firebaseapp.com",
  projectId: "waiter-app-7c4e3",
  storageBucket: "waiter-app-7c4e3.firebasestorage.app",
  messagingSenderId: "790814303926",
  appId: "1:790814303926:web:ed243f4e2dbdf5b459a817"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);