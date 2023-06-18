import {
  signInWithEmailAndPassword,
  auth,
  db,
  onSnapshot, doc
} from "./index.js";

let form = document.forms[0];
form.addEventListener("submit", onSubmit);
const signupForm = document.querySelector(".auth");

function onSubmit(event) {
  event.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      localStorage.setItem("token", cred.user.uid);
      if (cred.user.uid === "sC68VdPqpzbRSf5NFQIbAXB7GuQ2") {
        window.location.href = "dashboard/index.html";
      }
      checkFiles(cred.user.uid);
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
function checkFiles(id) {
  const docRef = doc(db, "students", id);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    if (
      !data.ApplicationForm ||
      !data.Accommodation ||
      !data.EuropassCV ||
      !data.ProofofEnglish ||
      !data.CopyofthePassport ||
      !data.LearningAgreement
    ) {
      window.location.href = "signup.html";
    } else if (data.EUStudent && !data.EuropeanHealth) {
      window.location.href = "euForm.html";
    } else if (
      !data.EUStudent &&
      (!data.CopyOfTheTravelDocuments ||
        !data.LetterOfConfirmation ||
        !data.ValidHealth ||
        !data.MedicalCertificate ||
        !data.AuthorizedTranslation)
    ) {
      window.location.href = "non-euForm.html";
    } else {
      window.location.href = "result-request.html";
    }
  });
}
