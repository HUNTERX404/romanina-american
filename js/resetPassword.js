import { auth, sendPasswordResetEmail } from "./index.js";

let form = document.forms[0];
form.addEventListener("submit", onSubmit);
document.querySelector(".back-icon").addEventListener("click", () => {
  window.location.href = "/";
});
const signupForm = document.querySelector(".auth");

function onSubmit(event) {
  event.preventDefault();
  const email = signupForm.email.value;
  sendPasswordResetEmail(auth,email)
    .then(() => {})
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
