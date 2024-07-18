// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWXE2seYecAy-YZ8GmqpC8pNsDOYnaJ0o",
  authDomain: "techychats-d657b.firebaseapp.com",
  projectId: "techychats-d657b",
  storageBucket: "techychats-d657b.appspot.com",
  messagingSenderId: "89274911207",
  appId: "1:89274911207:web:99b2b4c2787fe9d77f1542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB, txtDB};