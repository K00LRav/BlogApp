// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//need function to connect to firestore
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbVM7QujdPO541tL-FKRBIu0TXzugDsfU",
  authDomain: "fir-blog-app-c25.firebaseapp.com",
  projectId: "fir-blog-app-c25",
  storageBucket: "fir-blog-app-c25.appspot.com",
  messagingSenderId: "1005736546896",
  appId: "1:1005736546896:web:66336e645d1a76aa76b755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up database and export it
export const db = getFirestore(app)