import {
  doc,
  db, setDoc, createUserWithEmailAndPassword,
  auth
} from "./index.js";

let form = document.forms[0];
const signupForm = document.querySelector(".auth");
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const name = signupForm.name.value;
  const University = signupForm.university.value;
  const academeYear = signupForm.academeYear.value;
  const specialist = signupForm.specialist.value;
  const transitionDuration =
    document.getElementById("transitionDuration").value;
  document.querySelector(".button-submit").disabled = true;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const userId = cred.user.uid;
      localStorage.setItem("token", userId);
      const docRef = doc(db, "students", userId);
      setDoc(docRef, {
        name: name,
        University: University,
        academeYear: academeYear,
        specialist: specialist,
        transitionDuration: transitionDuration,
        isAccepted: false,
      }).then(() => {
        document.querySelector(".button-submit").disabled = false;
        window.location.href = "./signup.html";
      });
    })
    .catch((err) => {
      document.querySelector(".button-submit").disabled = false;
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
