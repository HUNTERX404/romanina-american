import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyAWsIo9YIU5KqpYXBNyLGqojOibTZLWfJA",
  authDomain: "erasmusrau-dc187.firebaseapp.com",
  projectId: "erasmusrau-dc187",
  storageBucket: "erasmusrau-dc187.appspot.com",
  messagingSenderId: "673166647723",
  appId: "1:673166647723:web:2fc81c389920a006feb2ee",
  measurementId: "G-42FR18LVX0",
};
initializeApp(firebaseConfig);
// init services
const db = getFirestore();
const auth = getAuth();
// collection ref
const colRef = collection(db, "students");
export {
  db,
  doc,
  updateDoc,
  addDoc,
  collection,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDocs,
  colRef,
  onSnapshot,
  query,
  where,
  getFirestore,
  getDownloadURL,
  signOut,
  sendPasswordResetEmail,
};
