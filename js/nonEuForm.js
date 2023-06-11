import { doc, db, updateDoc } from "./index.js";
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
let urlsFiles = {};
let CopyOfTheTravelDocuments = "";
let LetterOfConfirmation = "";
let ValidHealth = "";
let MedicalCertificate = "";
let AuthorizedTranslation = "";
const CopyOfTheTravelDocumentsInput = document.getElementById(
  "CopyOfTheTravelDocuments"
);
const LetterOfConfirmationInput = document.getElementById(
  "LetterOfConfirmation"
);
const ValidHealthInput = document.getElementById("ValidHealth");
const MedicalCertificateInput = document.getElementById("MedicalCertificate");
const AuthorizedTranslationInput = document.getElementById(
  "AuthorizedTranslation"
);
document.querySelector(".button-submit").disabled = true;

CopyOfTheTravelDocumentsInput.addEventListener("change", changedFileData);
ValidHealthInput.addEventListener("change", changedFileData);
MedicalCertificateInput.addEventListener("change", changedFileData);
AuthorizedTranslationInput.addEventListener("change", changedFileData);
LetterOfConfirmationInput.addEventListener("change", changedFileData);
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  UploadFile(CopyOfTheTravelDocuments, "CopyOfTheTravelDocuments");
  UploadFile(LetterOfConfirmation, "LetterOfConfirmation");
  UploadFile(ValidHealth, "ValidHealth");
  UploadFile(MedicalCertificate, "MedicalCertificate");
  UploadFile(AuthorizedTranslation, "AuthorizedTranslation");
}

function changedFileData(event) {
  const name = event.target.name;
  switch (name) {
    case "AuthorizedTranslation":
      AuthorizedTranslation = event.target.files[0];
      break;
    case "CopyOfTheTravelDocuments":
      CopyOfTheTravelDocuments = event.target.files[0];
      break;
    case "LetterOfConfirmation":
      LetterOfConfirmation = event.target.files[0];
      break;
    case "ValidHealth":
      ValidHealth = event.target.files[0];
      break;
    case "MedicalCertificate":
      MedicalCertificate = event.target.files[0];
      break;
  }
  checkData();
}

function checkData() {
  if (
    CopyOfTheTravelDocuments &&
    LetterOfConfirmation &&
    ValidHealth &&
    MedicalCertificate &&
    AuthorizedTranslation
  ) {
    document.querySelector(".button-submit").disabled = false;
  } else {
    document.querySelector(".button-submit").disabled = true;
  }
}

function UploadFile(fileItem, fileName) {
  let storageRef = firebase.storage().ref("folders/" + fileName);
  let uploadTask = storageRef.put(fileItem);
  document.querySelector(".button-submit").disabled = true;

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        urlsFiles[fileName] = url;
        if (Object.keys(urlsFiles).length === 5) {
          const userId = localStorage.getItem("token");
          let docRef = doc(db, "students", userId);
          updateDoc(docRef, {
            CopyOfTheTravelDocuments: urlsFiles["CopyOfTheTravelDocuments"],
            LetterOfConfirmation: urlsFiles["LetterOfConfirmation"],
            ValidHealth: urlsFiles["ValidHealth"],
            MedicalCertificate: urlsFiles["MedicalCertificate"],
            AuthorizedTranslation: urlsFiles["AuthorizedTranslation"],
            EUStudent: false,
          }).then(() => {
            document.querySelector(".button-submit").disabled = false;
            window.location.href = "./result-request.html";
          });
        }
      });
    }
  );
}
