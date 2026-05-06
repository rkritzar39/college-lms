import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =========================
   FIREBASE CONFIG
   (REPLACE WITH YOURS)
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyBvfKTXRiYpRM_Rkytf8mKc2EZAsCrnfQI",
  authDomain: "lms-portfolio-1bfea.firebaseapp.com",
  projectId: "lms-portfolio-1bfea",
  storageBucket: "lms-portfolio-1bfea.firebasestorage.app",
  messagingSenderId: "21867175334",
  appId: "1:21867175334:web:934a8364629c22f9894367"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* =========================
   GLOBAL STATE
========================= */
let currentUser = null;
let userRole = "student"; // default fallback
let gradeScale = {};

/* =========================
   INIT AUTH
========================= */
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  currentUser = user;

  // Fetch role from Firestore
  const roleSnap = await getDoc(doc(db, "users", user.uid));
  if (roleSnap.exists()) {
    userRole = roleSnap.data().role;
  }

  await loadGradeScale();
  await routePageLogic();
});

/* =========================
   LOAD GRADE SCALE
========================= */
async function loadGradeScale() {
  const snap = await getDoc(doc(db, "settings", "gradeScale"));
  if (snap.exists()) {
    gradeScale = snap.data();
  }
}

/* =========================
   PAGE ROUTER
========================= */
async function routePageLogic() {
  const page = window.location.pathname;

  if (page.includes("dashboard")) loadDashboard();
  if (page.includes("courses")) loadCourses();
  if (page.includes("grades")) loadGrades();
  if (page.includes("assignments")) loadAssignments();
  if (page.includes("admin")) loadAdmin();
}

/* =========================
   DASHBOARD ENGINE
========================= */
async function loadDashboard() {
  const ref = doc(db, "students", currentUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  setText("gpaValue", data.gpa);
  setText("creditValue", data.credits);
  setText("courseCount", data.courses?.length || 0);

  renderList("courseList", data.courses);
  renderList("assignmentList", data.assignments);

  show("dashboardContent");
  hide("loading");
}

/* =========================
   COURSES ENGINE
========================= */
async function loadCourses() {
  const snap = await getDoc(doc(db, "students", currentUser.uid));
  const data = snap.data();

  const courses = data.courses || [];

  setText("totalCourses", courses.length);
  setText("totalCredits", sumCredits(courses));

  renderCourses("courseList", courses);

  show("coursesContent");
  hide("loading");
}

/* =========================
   GRADES ENGINE
========================= */
async function loadGrades() {
  const snap = await getDoc(doc(db, "students", currentUser.uid));
  const data = snap.data();

  setText("gpaValue", data.gpa);
  setText("creditValue", data.credits);

  const grades = data.grades || [];

  renderGrades("gradeList", grades);

  show("gradesContent");
  hide("loading");
}

/* =========================
   ASSIGNMENTS ENGINE
========================= */
async function loadAssignments() {
  const snap = await getDoc(doc(db, "students", currentUser.uid));
  const data = snap.data();

  const assignments = data.assignments || [];

  const total = assignments.length;
  const completed = assignments.filter(a => a.status === "Completed").length;
  const inProgress = assignments.filter(a => a.status === "In Progress").length;

  setText("totalAssignments", total);
  setText("completedAssignments", completed);
  setText("inProgressAssignments", inProgress);

  renderAssignments("assignmentList", assignments);

  show("assignmentsContent");
  hide("loading");
}

/* =========================
   ADMIN ENGINE
========================= */
async function loadAdmin() {
  if (userRole !== "admin") {
    document.body.innerHTML = "<h2>Access Denied</h2>";
    return;
  }

  const students = await getDocs(collection(db, "students"));
  const courses = await getDocs(collection(db, "courses"));
  const assignments = await getDocs(collection(db, "assignments"));

  setText("statStudents", students.size);
  setText("statCourses", courses.size);
  setText("statAssignments", assignments.size);

  hide("loading");
}

/* =========================
   GPA CALCULATOR
========================= */
function calculateGPA(grades) {
  if (!grades || grades.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach(g => {
    const points = gradeScale[g.grade] || 0;
    totalPoints += points * (g.credits || 1);
    totalCredits += g.credits || 1;
  });

  return (totalPoints / totalCredits).toFixed(2);
}

/* =========================
   HELPERS
========================= */
function renderList(id, items = []) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  items.forEach(i => {
    el.innerHTML += `
      <div class="card">
        <strong>${i.title || i.name}</strong>
        <p>${i.status || ""}</p>
      </div>
    `;
  });
}

function renderCourses(id, courses = []) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = courses.map(c => `
    <div class="card">
      <h3>${c.name}</h3>
      <p>Credits: ${c.credits}</p>
      <p>Instructor: ${c.instructor || "TBD"}</p>
    </div>
  `).join("");
}

function renderGrades(id, grades = []) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = grades.map(g => `
    <div class="card">
      <h3>${g.course}</h3>
      <p>Grade: ${g.grade}</p>
      <p>Credits: ${g.credits}</p>
    </div>
  `).join("");
}

function renderAssignments(id, items = []) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = items.map(a => `
    <div class="card">
      <h3>${a.title}</h3>
      <p>Course: ${a.course}</p>
      <p>Status: ${a.status}</p>
      <p>Due: ${a.dueDate}</p>
    </div>
  `).join("");
}

function sumCredits(courses) {
  return courses.reduce((sum, c) => sum + (c.credits || 0), 0);
}

/* =========================
   DOM HELPERS
========================= */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value ?? "--";
}

function show(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "block";
}

function hide(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}
