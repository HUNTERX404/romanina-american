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
function fillData(student) {
  console.log(student);
  document.querySelector(".loading-data").classList.add("d-none");
  if (!student.isWaiting) {
    document.querySelector(".request-buttons").classList.add("d-none");
  }
  document.querySelector(".data").classList.remove("d-none");
}
document.querySelector(".accept-request").addEventListener("click", () => {
  updateDoc(docRef, {
    isAccepted: true,
    isWaiting: false,
  }).then(() => {
    window.location.href = "requests.html";
  });
});
