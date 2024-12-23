import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAw9jiJibCqglJIDVUskn6K3P-653tsl1A",
  authDomain: "ai-notion-3dd7f.firebaseapp.com",
  projectId: "ai-notion-3dd7f",
  storageBucket: "ai-notion-3dd7f.firebasestorage.app",
  messagingSenderId: "820363905165",
  appId: "1:820363905165:web:7b6820f8743acdb89d7ac4",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
