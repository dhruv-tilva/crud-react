
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { Database } from "firebase/database";
import { ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBRkTcnL4E07FCRtVRFpqmZ_RoGl0Kr8XM",
    authDomain: "wrud-react.firebaseapp.com",
    projectId: "wrud-react",
    storageBucket: "wrud-react.appspot.com",
    messagingSenderId: "1050494381388",
    appId: "1:1050494381388:web:d772a6d9784f95a1ccb3e9"
};

// init firebase
initializeApp(firebaseConfig)
// init & export firestore service
export const db = getFirestore()
// generate & export auth object
export const auth = getAuth()