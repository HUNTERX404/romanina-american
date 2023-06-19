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
  document.getElementById("")
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
}
function onRejectSubmit(event) {
  event.preventDefault();
  const rejectedMessage = document.getElementById("messageReject");
  setDoc(docRef, {
    name: student.name,
    academeYear: student.academeYear,
    University: student.University,
    specialist: student.specialist,
    transitionDuration: student.transitionDuration,
    isAccepted: false,
    isWaiting: false,
    rejectedMessage: rejectedMessage.value,
  }).then(() => {
    window.location.href = "./requests.html";
  });
}
