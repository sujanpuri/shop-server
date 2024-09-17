// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgwN_pDf5V-PrqPKNmi4wrOucvtu6cDAA",
    authDomain: "tshoping-5ee67.firebaseapp.com",
    projectId: "tshoping-5ee67",
    storageBucket: "tshoping-5ee67.appspot.com",
    messagingSenderId: "459454796337",
    appId: "1:459454796337:web:07c37ef4879e5069247b10",
    measurementId: "G-8CRJJ7QZQW"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);




export { db };
