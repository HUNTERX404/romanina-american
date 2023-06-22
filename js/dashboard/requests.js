import { colRef, onSnapshot, query, where } from "../index.js";

let students = [];
// queries
const q = query(colRef, where("isWaiting", "==", true));
// realtime collection data
onSnapshot(q, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    students.push({ ...doc.data(), id: doc.id });
  });
  fillData();
});
document.querySelector(".close-button").addEventListener("click", () => {
  document.querySelector(".nav").classList.remove("active");
});
document.querySelector(".menu-icon").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("active");
});
function fillData() {
  document.querySelector(".loading-data").classList.add("d-none");
  document.querySelector(".data").classList.remove("d-none");
  const container = document.querySelector(".requests");
  const containerNoData = document.querySelector(".requests-no-data");
  console.log(students.length);
  if (students.length > 0) {
    document.querySelector(".data").classList.remove("d-none");
    container.classList.remove("d-none");
    containerNoData.classList.add("d-none");

    students.forEach((student) => {
      const studentRequest = `<div class="col">
                <div class="card h-100">
                  <div class="card-body d-flex flex-column justify-content-between gap-4">
                    <div>
                      <h5 class="card-title fw-bolder">${student.name}</h5>
                      <div class="card-text">
                        <p class="mb-1"><span class="fw-semibold">university :</span> ${student.University}</p>
                        <p class="mb-1"><span class="fw-semibold">academic year :</span> ${student.academeYear}</p>
                        <p class="mb-1"><span class="fw-semibold">specialist :</span> ${student.specialist}</p>
                      </div>
                    </div>
                    <div>
                      <a href="student-info.html?id=${student.id}" class="btn btn-primary">show details</a>
                    </div>
                  </div>
                </div>
              </div>`;
      container.innerHTML += studentRequest;
    });
  } else {
    console.log("test");
    document.querySelector(".data").classList.add("d-none");
    container.classList.add("d-none");
    containerNoData.classList.remove("d-none");
  }
}
