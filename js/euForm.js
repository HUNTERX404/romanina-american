import { doc, db, updateDoc } from "./index.js";

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
let EuropeanHealth = "";

const EuropeanHealthInput = document.getElementById("EuropeanHealth");

document.querySelector(".button-submit").disabled = true;
document.querySelector(".back-icon").addEventListener("click", () => {
  window.location.href = "./signup.html";
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
      if (EuropeanHealthInput.value) {
        document
          .querySelector("[for=EuropeanHealth]")
          .classList.replace("invalid", "valid");
      } else {
        document
          .querySelector("[for=EuropeanHealth]")
          .classList.replace("valid", "invalid");
      }
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
          window.location.href = "./result-request.html";
        });
      });
    }
  );
}
