import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZpDpmDofO2EQKvqga0J5qC0N9ZIrORK4",
  authDomain: "chat-app-js-dev-hindi.firebaseapp.com",
  projectId: "chat-app-js-dev-hindi",
  storageBucket: "chat-app-js-dev-hindi.appspot.com",
  messagingSenderId: "42500319361",
  appId: "1:42500319361:web:8b7d8fc48dfc135f038580",
  measurementId: "G-HH90PLW6Q7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)