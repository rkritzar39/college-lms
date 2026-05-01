const STORAGE_KEY = "lms-db";

/* ---------- DEFAULT DATA ---------- */
const defaultData = {
  courses: [
    { id: "cybersecurity", name: "Intro to Cybersecurity", term: "Fall 2026", progress: 40 },
    { id: "networking", name: "Networking Basics", term: "Fall 2026", progress: 25 }
  ]
};

/* ---------- LOAD ---------- */
function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
}

/* ---------- SAVE ---------- */
function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const db = load();

/* ================= PUBLIC DASHBOARD ================= */

if (document.getElementById("courseList")) {
  const container = document.getElementById("courseList");

  db.courses.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>${c.term}</p>

      <div class="bar">
        <div style="width:${c.progress}%"></div>
      </div>

      <p>${c.progress}% complete</p>
    `;

    container.appendChild(div);
  });
}

/* ================= INSTRUCTOR PANEL ================= */

function renderAdmin() {
  const container = document.getElementById("adminList");
  if (!container) return;

  container.innerHTML = "";

  db.courses.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${c.name}</strong>
      <p>${c.term}</p>

      <button onclick="deleteCourse('${c.id}')">
        Remove
      </button>
    `;

    container.appendChild(div);
  });
}

function addCourse() {
  const name = document.getElementById("name").value;
  const term = document.getElementById("term").value;

  const id = name.toLowerCase().replace(/\s/g, "-");

  db.courses.push({
    id,
    name,
    term,
    progress: 0
  });

  save(db);
  renderAdmin();
}

function deleteCourse(id) {
  db.courses = db.courses.filter(c => c.id !== id);
  save(db);
  renderAdmin();
}

renderAdmin();
