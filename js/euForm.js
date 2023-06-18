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
// init services
let form = document.forms[0];
let urlsFiles = {};
let EuropeanHealth = "";

const EuropeanHealthInput = document.getElementById("EuropeanHealth");

document.querySelector(".button-submit").disabled = true;
document.querySelector(".back-icon").addEventListener("click", () => {
  history.back();
});
document.querySelector(".back-icon").addEventListener("click", () => {
  history.back();
});
EuropeanHealthInput.addEventListener("change", changedFileData);

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  UploadFile(EuropeanHealth, "EuropeanHealth");
}

function changedFileData(event) {
  const name = event.target.name;
  switch (name) {
    case "EuropeanHealth":
      EuropeanHealth = event.target.files[0];
      break;
  }
  checkData();
}

function checkData() {
  if (EuropeanHealth) {
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
        const userId = localStorage.getItem("token");
        let docRef = doc(db, "students", userId);
        updateDoc(docRef, {
          EuropeanHealth: urlsFiles["EuropeanHealth"],
          EUStudent: true,
          isWaiting: true,
        }).then(() => {
          document.querySelector(".button-submit").disabled = false;
                      window.location.href = "/result-request.html";

        });
      });
    }
  );
}
