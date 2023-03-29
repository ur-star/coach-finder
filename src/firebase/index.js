// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth}  from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export{
    storage,
    auth,
    db,
}