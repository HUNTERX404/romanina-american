import { doc, db, updateDoc } from "./index.js";
// import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAWsIo9YIU5KqpYXBNyLGqojOibTZLWfJA",
  authDomain: "erasmusrau-dc187.firebaseapp.com",
  projectId: "erasmusrau-dc187",
  storageBucket: "erasmusrau-dc187.appspot.com",
  messagingSenderId: "673166647723",
  appId: "1:673166647723:web:2fc81c389920a006feb2ee",
  measurementId: "G-42FR18LVX0",
};
firebase.initializeApp(firebaseConfig);
// init services
let form = document.forms[0];
let urlsFiles = {};
let ApplicationForm = "";
let EuropassCV = "";
let LearningAgreement = "";
let CopyofthePassport = "";
let Accommodation = "";
let ProofofEnglish = "";
const ApplicationFormInput = document.getElementById("ApplicationForm");
const ProofofEnglishInput = document.getElementById("ProofofEnglish");
const EuropassCVInput = document.getElementById("EuropassCV");
const LearningAgreementInput = document.getElementById("LearningAgreement");
const CopyofthePassportInput = document.getElementById("CopyofthePassport");
const AccommodationInput = document.getElementById("Accommodation");
document.querySelector(".button-submit").disabled = true;
document.querySelector(".back-icon").addEventListener("click", () => {
  history.back();
});

ProofofEnglishInput.addEventListener("change", changedFileData);
AccommodationInput.addEventListener("change", changedFileData);
ApplicationFormInput.addEventListener("change", changedFileData);
EuropassCVInput.addEventListener("change", changedFileData);
LearningAgreementInput.addEventListener("change", changedFileData);
CopyofthePassportInput.addEventListener("change", changedFileData);
form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  UploadFile(ApplicationForm, "ApplicationForm");
  UploadFile(EuropassCV, "EuropassCV");
  UploadFile(LearningAgreement, "LearningAgreement");
  UploadFile(CopyofthePassport, "CopyofthePassport");
  UploadFile(Accommodation, "Accommodation");
  UploadFile(ProofofEnglish, "ProofofEnglish");
}

function changedFileData(event) {
  const name = event.target.name;
  switch (name) {
    case "ApplicationForm":
      ApplicationForm = event.target.files[0];
      if (ApplicationFormInput.value) {
        document
          .querySelector("[for=ApplicationForm]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=ApplicationForm]")
          .classList.replace("valid", "invalid");
      }
      break;
    case "EuropassCV":
      EuropassCV = event.target.files[0];
      if (EuropassCVInput.value) {
        document
          .querySelector("[for=EuropassCV]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=EuropassCV]")
          .classList.replace("valid", "invalid");
      }
      break;
    case "LearningAgreement":
      LearningAgreement = event.target.files[0];
      if (LearningAgreementInput.value) {
        document
          .querySelector("[for=LearningAgreement]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=LearningAgreement]")
          .classList.replace("valid", "invalid");
      }
      break;
    case "CopyofthePassport":
      CopyofthePassport = event.target.files[0];
      if (CopyofthePassportInput.value) {
        document
          .querySelector("[for=CopyofthePassport]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=CopyofthePassport]")
          .classList.replace("valid", "invalid");
      }
      break;
    case "Accommodation":
      Accommodation = event.target.files[0];
      if (AccommodationInput.value) {
        document
          .querySelector("[for=Accommodation]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=Accommodation]")
          .classList.replace("valid", "invalid");
      }
      break;
    case "ProofofEnglish":
      ProofofEnglish = event.target.files[0];
      if (ProofofEnglishInput.value) {
        document
          .querySelector("[for=ProofofEnglish]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=ProofofEnglish]")
          .classList.replace("valid", "invalid");
      }
      break;
  }
  checkData();
}

function checkData() {
  if (
    Accommodation &&
    ApplicationForm &&
    EuropassCV &&
    CopyofthePassport &&
    LearningAgreement &&
    ProofofEnglish
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
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        urlsFiles[fileName] = url;
        if (Object.keys(urlsFiles).length === 6) {
          const userId = localStorage.getItem("token");
          let docRef = doc(db, "students", userId);
          updateDoc(docRef, {
            Accommodation: urlsFiles["Accommodation"],
            ApplicationForm: urlsFiles["ApplicationForm"],
            EuropassCV: urlsFiles["EuropassCV"],
            ProofofEnglish: urlsFiles["ProofofEnglish"],
            CopyofthePassport: urlsFiles["CopyofthePassport"],
            LearningAgreement: urlsFiles["LearningAgreement"],
          }).then(() => {
            document.querySelector(".loading").classList.add("d-none");
            document.querySelector(".modal-link").classList.remove("d-none");
            document.querySelector(".button-submit").disabled = false;
          });
        }
      });
    }
  );
}
