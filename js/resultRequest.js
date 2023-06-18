import { doc, db, onSnapshot } from "./index.js";

const id = localStorage.getItem("token");
// fetching a single document (& realtime)
const docRef = doc(db, "students", id); // queries
// realtime collection data
onSnapshot(docRef, (doc) => {
  fillData(doc.data());
});
document.querySelector(".back-icon").addEventListener("click", () => {
  history.back();
});
function fillData(student) {
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
