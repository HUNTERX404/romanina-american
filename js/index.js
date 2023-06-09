import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-YvrMUkAiFVngWqGK4FsbH5V8BR3WkUQ",
  authDomain: "test-96772.firebaseapp.com",
  projectId: "test-96772",
  storageBucket: "test-96772.appspot.com",
  messagingSenderId: "1035837406206",
  appId: "1:1035837406206:web:aa0420e328261adfc31eaf",
  measurementId: "G-6PV2WPJPPX",
};
initializeApp(firebaseConfig);
const data = getFirestore();
const colRef = collection(data, "books");
getDocs(colRef).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    let books = [];
    books.push({ ...doc.data(), id: doc.id });
    console.log(books)
  });
});
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
