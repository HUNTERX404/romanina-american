import { colRef, onSnapshot, query, where } from "../index.js";

let students = [];
// queries
const q = query(colRef, where("isAccepted", "==", true));
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
document.querySelector(".menu-icon").addEventListener("click",()=>{
  document.querySelector(".nav").classList.toggle("active");

});
function fillData() {
  document.querySelector(".loading-data").classList.add("d-none");
  document.querySelector(".data-table").classList.remove("d-none");
  const tableBody = document.querySelector(".table-body");
  students.forEach((student) => {
    const studentRow = `<tr>
                <td class="d-none">${student.id}</td>
                <td>${student.name}</td>
                <td>${student.University}</td>
                <td>${student.specialist}</td>
                <td>${student.transitionDuration}</td>
                <td class="w-auto">
                    <a href="student-info.html?id=${student.id}">
                        <span class="material-icons show-icon"> visibility </span>
                    </a>
                </td>
              </tr>`;
    tableBody.innerHTML += studentRow;
  });
  $(document).ready(function () {
    var dataTable = $("#myTable").dataTable({
      dom: "<f<t><'d-flex flex-column flex-md-row gap-4 justify-content-md-between align-items-start align-items-md-center'lp>>",
      ordering: false,
      aLengthMenu: [
        [5, 10, 15, 20, 50, 100, -1],
        [5, 10, 15, 20, 50, 100, "All"],
      ],
    });
    $("#searchbox").keyup(function () {
      dataTable.fnFilter(this.value);
    });
  });
}
