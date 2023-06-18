import {
  doc,
  db,
  updateDoc,
  getDocs,
  colRef,
  onSnapshot,
  query,
  where,
} from "../index.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;
// fetching a single document (& realtime)
const docRef = doc(db, "students", id);
// realtime collection data
onSnapshot(docRef, (doc) => {
  fillData(doc.data());
});
document.querySelector(".arrow-back").addEventListener("click", () => {
  history.back();
});
const pillsPersonalInfo = document.getElementById("pills-personal-info");
function fillData(student) {
  console.log(student);
  document.querySelector(".loading-data").classList.add("d-none");
  if (!student.isWaiting) {
    document.querySelector(".request-buttons").classList.add("d-none");
  }
  document.querySelector(".data").classList.remove("d-none");
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
document.querySelector(".accept-request").addEventListener("click", () => {
  updateDoc(docRef, {
    isAccepted: true,
    isWaiting: false,
  }).then(() => {
    window.location.href = "requests.html";
  });
});
