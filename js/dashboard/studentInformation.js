import { doc, db, updateDoc, onSnapshot, setDoc } from "../index.js";
// get id student
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;

// fetching a single document (& realtime)
const docRef = doc(db, "students", id);

// realtime collection data
let student;
let form = document.forms[0];
const pillsPersonalInfo = document.getElementById("pills-personal-info");
const commonInformationDocuments = document.getElementById(
  "pills-common-information-documents"
);
const pillsEuInformationDocuments = document.getElementById(
  "pills-Eu-information-documents"
);
const nonEuInformationDocuments = document.getElementById(
  "pills-non-Eu-information-documents"
);

onSnapshot(docRef, (doc) => {
  student = doc.data();
  fillData();
});
//events
form.addEventListener("submit", onRejectSubmit);
document.querySelector(".arrow-back").addEventListener("click", () => {
  history.back();
});
document.querySelector(".accept-request").addEventListener("click", () => {
  updateDoc(docRef, {
    isAccepted: true,
    isWaiting: false,
  }).then(() => {
    window.location.href = "./requests.html";
  });
});

// functions
function fillData() {
  document.querySelector(".loading-data").classList.add("d-none");
  if (!student.isWaiting) {
    document.querySelector(".request-buttons").classList.add("d-none");
  }
  document.querySelector(".data").classList.remove("d-none");
  document.querySelector(".student-name").innerHTML = student.name;
  pillsPersonalInfo.innerHTML = `<div class="row">
                                    <div class="col-sm-6">
                                      <p>
                                        <span class="fw-semibold">academic Year : </span> ${
                                          student.academeYear
                                        }
                                      </p>
                                    </div>
                                    <div class="col-sm-6"> 
                                      <p>
                                        <span class="fw-semibold">University : </span> ${
                                          student.University
                                        }
                                      </p>
                                    </div>
                                    <div class="col-sm-6">
                                      <p>
                                        <span class="fw-semibold">specialist : </span> ${
                                          student.specialist
                                        }
                                      </p>
                                    </div>
                                    <div class="col-sm-6"> 
                                      <p>
                                        <span class="fw-semibold">transition Duration : </span> ${
                                          student.transitionDuration
                                        }
                                      </p>
                                    </div>
                                    <div class="col-sm-6">
                                      <p>
                                        <span class="fw-semibold">EUStudent : </span> ${
                                          student.EUStudent ? "yes" : "no"
                                        }
                                      </p>
                                    </div>
                                  </div>`;
  commonInformationDocuments.innerHTML = `<div class="row gy-4">
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Application Form : </span>
                                        <a href=${student.ApplicationForm} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Accommodation : </span>
                                        <a href=${student.Accommodation} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Europass CV : </span>
                                        <a href=${student.EuropassCV} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Proof of English : </span>
                                        <a href=${student.ProofofEnglish} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                   <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Copy of the Passport : </span>
                                        <a href=${student.CopyofthePassport} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                  </div>`;
  if (student.EUStudent) {
    document
      .getElementById("pills-non-Eu-information-documents-tab")
      .classList.add("d-none");
    pillsEuInformationDocuments.innerHTML = `<div class="row gy-4">
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">EuropeanHealth : </span>
                                        <a href=${student.EuropeanHealth} class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                  </div>`;
  } else {
    document
      .getElementById("pills-Eu-information-documents-tab")
      .classList.add("d-none");
    nonEuInformationDocuments.innerHTML = `<div class="row gy-4">
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Copy Of The Travel Documents : </span>
                                        <a href=${
                                          student.CopyOfTheTravelDocuments
                                        } class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Letter Of Confirmation : </span>
                                        <a href=${
                                          student.LetterOfConfirmation
                                        } class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Valid Health : </span>
                                        <a href=${
                                          student.ValidHealth
                                        } class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Medical Certificate : </span>
                                        <a href=${
                                          student.MedicalCertificate
                                        } class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                   <div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Authorized Translation : </span>
                                        <a href=${
                                          student.AuthorizedTranslation
                                        } class="btn btn-primary btn-sm">show file</a> 
                                    </div>
                                    ${
                                      student.OptionalRequirementsDocument
                                        ? `div class="col-sm-6 col-md-4">
                                        <span class="fw-semibold">Optional Requirements Document : </span>
                                        <a href=${student.OptionalRequirementsDocument} class="btn btn-primary btn-sm">show file</a> 
                                    </div>`
                                        : ``
                                    }
                                  </div>`;
  }
}
function onRejectSubmit(event) {
  event.preventDefault();
  const rejectedMessage = document.getElementById("messageReject");
  updateDoc(docRef, {
    isAccepted: false,
    isWaiting: false,
    rejectedMessage: rejectedMessage.value,
  }).then(() => {
    window.location.href = "./requests.html";
  });
}
