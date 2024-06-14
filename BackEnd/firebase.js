// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4D1UQ1B3a95uvV_vszIHfIs1bCdQvHRI",
  authDomain: "techychats.firebaseapp.com",
  projectId: "techychats",
  storageBucket: "techychats.appspot.com",
  messagingSenderId: "59271826044",
  appId: "1:59271826044:web:91f72f379ba7c47cf217f9",
  measurementId: "G-WRPWT0M673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);