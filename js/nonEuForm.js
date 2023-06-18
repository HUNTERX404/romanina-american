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
let AuthorizedTranslation = "";
let MedicalCertificate = "";
let ValidHealth = "";
let LetterOfConfirmation = "";
let CopyOfTheTravelDocuments = "";
let OptionalRequirementsDocument = "";
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
const OptionalRequirementsDocumentInput = document.getElementById(
  "OptionalRequirementsDocument"
);
document.querySelector(".button-submit").disabled = true;
document.querySelector(".back-icon").addEventListener("click", () => {
  history.back();
});
CopyOfTheTravelDocumentsInput.addEventListener("change", changedFileData);
ValidHealthInput.addEventListener("change", changedFileData);
MedicalCertificateInput.addEventListener("change", changedFileData);
AuthorizedTranslationInput.addEventListener("change", changedFileData);
LetterOfConfirmationInput.addEventListener("change", changedFileData);
OptionalRequirementsDocumentInput.addEventListener("change", changedFileData);
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  UploadFile(CopyOfTheTravelDocuments, "CopyOfTheTravelDocuments");
  UploadFile(LetterOfConfirmation, "LetterOfConfirmation");
  UploadFile(ValidHealth, "ValidHealth");
  UploadFile(MedicalCertificate, "MedicalCertificate");
  UploadFile(AuthorizedTranslation, "AuthorizedTranslation");
  if (OptionalRequirementsDocument) {
    UploadFile(OptionalRequirementsDocument, "OptionalRequirementsDocument");
  }
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
    case "OptionalRequirementsDocument":
      OptionalRequirementsDocument = event.target.files[0];
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
  let storageRef = firebase
    .storage()
    .ref(`folders/${localStorage.getItem("token")}/` + fileName);
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
            OptionalRequirementsDocument: OptionalRequirementsDocument
              ? urlsFiles["OptionalRequirementsDocument"]
              : "",
            EUStudent: false,
            isWaiting: true,
          }).then(() => {
            document.querySelector(".button-submit").disabled = false;
            window.location.href = "/result-request.html";
          });
        }
      });
    }
  );
}
