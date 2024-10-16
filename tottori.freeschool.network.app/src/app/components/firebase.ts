'use client';

// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFGtvvazd7r-9uH6Dj7PbZLhboRDtvsgA",
    authDomain: "tottori-freeschool-network-app.firebaseapp.com",
    projectId: "tottori-freeschool-network-app",
    storageBucket: "tottori-freeschool-network-app.appspot.com",
    messagingSenderId: "1075701762804",
    appId: "1:1075701762804:web:83679303637c62c4e66ca1",
    measurementId: "G-9PLQ31B1Z9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db , auth};