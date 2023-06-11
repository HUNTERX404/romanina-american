import {
  doc,
  db,
  updateDoc,
  addDoc,
  collection,
  signInWithEmailAndPassword,
  auth,
} from "./index.js";
const firebaseConfig = {
  apiKey: "AIzaSyB3L0B3SuCrKWcNhTHzlLkkV08MCf0hUDA",
  authDomain: "romanian-american.firebaseapp.com",
  projectId: "romanian-american",
  storageBucket: "romanian-american.appspot.com",
  messagingSenderId: "26442140157",
  appId: "1:26442140157:web:e5252e4968ecd748157194",
  measurementId: "G-FTTL8TF09G",
};
firebase.initializeApp(firebaseConfig);
let form = document.forms[0];
form.addEventListener("submit", onSubmit);
const signupForm = document.querySelector(".auth");
function onSubmit(event) {
  event.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred);
      localStorage.setItem("token", cred.user.uid);
      // window.location.href = "./signup.html";
    })
    .catch((err) => {
      toastr["error"](err.message, "error title");
      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
    });
}
