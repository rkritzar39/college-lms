const KEY = "lms-db";

/* ================= INITIAL DATA ================= */

const seed = {
  semesters: [
    { id: "fall-2026", name: "Fall 2026" }
  ],

  courses: [
    {
      id: "cybersecurity",
      name: "Intro to Cybersecurity",
      semester: "fall-2026",
      progress: 40
    },
    {
      id: "networking",
      name: "Networking Basics",
      semester: "fall-2026",
      progress: 25
    }
  ],

  assignments: [
    {
      id: "a1",
      courseId: "cybersecurity",
      title: "Threat Models Lab",
      grade: 95,
      status: "completed"
    },
    {
      id: "a2",
      courseId: "cybersecurity",
      title: "Risk Quiz",
      grade: null,
      status: "in progress"
    }
  ]
};

/* ================= DB ================= */

function load() {
  const data = localStorage.getItem(KEY);
  if (!data) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(data);
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

let db = load();

/* ================= DASHBOARD ================= */

function renderDashboard() {
  const el = document.getElementById("dashboard");
  if (!el) return;

  el.innerHTML = "";

  db.semesters.forEach(sem => {

    const block = document.createElement("div");
    block.className = "card";

    block.innerHTML = `<h2>${sem.name}</h2>`;

    db.courses
      .filter(c => c.semester === sem.id)
      .forEach(course => {

        const assignments = db.assignments.filter(a => a.courseId === course.id);
        const graded = assignments.filter(a => a.grade !== null);

        const avg =
          graded.reduce((s, a) => s + a.grade, 0) / (graded.length || 1);

        course.progress = Math.round(avg || 0);

        block.innerHTML += `
          <div class="card">
            <h3>${course.name}</h3>

            <div class="bar">
              <div style="width:${course.progress}%"></div>
            </div>

            <p>${course.progress}% complete</p>
          </div>
        `;
      });

    el.appendChild(block);
  });

  save(db);
}

/* ================= INSTRUCTOR ================= */

function renderAdmin() {
  const el = document.getElementById("adminCourses");
  const select = document.getElementById("semesterSelect");

  if (!el) return;

  el.innerHTML = "";
  select.innerHTML = "";

  db.semesters.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });

  db.courses.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${c.name}</strong>
      <p>${c.semester}</p>

      <button onclick="deleteCourse('${c.id}')">Delete</button>
    `;

    el.appendChild(div);
  });
}

/* ================= COURSE ACTIONS ================= */

function addCourse() {
  const name = document.getElementById("courseName").value;
  const sem = document.getElementById("semesterSelect").value;

  db.courses.push({
    id: name.toLowerCase().replace(/\s/g, "-"),
    name,
    semester: sem,
    progress: 0
  });

  save(db);
  renderAdmin();
  renderDashboard();
}

function deleteCourse(id) {
  db.courses = db.courses.filter(c => c.id !== id);
  db.assignments = db.assignments.filter(a => a.courseId !== id);

  save(db);
  renderAdmin();
  renderDashboard();
}

/* ================= INIT ================= */

renderDashboard();
renderAdmin();
