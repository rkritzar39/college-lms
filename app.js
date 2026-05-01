const KEY = "college-lms-db";

/* ================= DATA ================= */

const seed = {
  courses: [
    { id: "cyber", name: "Cybersecurity 101", semester: "fall", progress: 40 },
    { id: "net", name: "Networking Basics", semester: "fall", progress: 25 }
  ],

  assignments: [
    { id: "a1", courseId: "cyber", title: "Threat Models", grade: 90 },
    { id: "a2", courseId: "cyber", title: "Risk Quiz", grade: null },
    { id: "a3", courseId: "net", title: "IP Lab", grade: 85 }
  ]
};

/* ================= STORAGE ================= */

function load(){
  const data = localStorage.getItem(KEY);
  if(!data){
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(data);
}

function save(db){
  localStorage.setItem(KEY, JSON.stringify(db));
}

let db = load();

/* ================= GPA ================= */

function gpa(){
  let total=0,count=0;

  db.assignments.forEach(a=>{
    if(a.grade!=null){
      total+=a.grade;
      count++;
    }
  });

  const avg=total/(count||1);

  if(avg>=90) return 4.0;
  if(avg>=80) return 3.0;
  if(avg>=70) return 2.0;
  if(avg>=60) return 1.0;
  return 0;
}
