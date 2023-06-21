import { doc, db, onSnapshot } from "./index.js";

const id = localStorage.getItem("token");
let student;
// fetching a single document (& realtime)
const docRef = doc(db, "students", id); // queries
// realtime collection data
onSnapshot(docRef, (doc) => {
  student = doc.data();
  fillData();
});
document.querySelector(".back-icon").addEventListener("click", () => {
  if (student.EUStudent) {
    window.location.href = "./euFrom.html";
  } else {
    window.location.href = "./non-euFrom.html";
  }
});
function fillData() {
  if (student.isWaiting) {
    document.querySelector(".box-request .waiting").classList.remove("d-none");
    document.querySelector(".box-request .reject").classList.add("d-none");
    document.querySelector(".box-request .success").classList.add("d-none");
  } else {
    if (student.isAccepted) {
      document
        .querySelector(".box-request .success")
        .classList.remove("d-none");
      document.querySelector(".box-request .waiting").classList.add("d-none");
      document.querySelector(".box-request .reject").classList.add("d-none");
    } else {
      document.querySelector(".box-request .reject").classList.remove("d-none");
      document.querySelector(".box-request .waiting").classList.add("d-none");
      document.querySelector(".box-request .success").classList.add("d-none");
      document.querySelector(
        ".reject-message"
      ).innerHTML = `The reason <br> ${student.rejectedMessage}`;
    }
  }
  document.querySelector(".loading").classList.add("d-none");
}
