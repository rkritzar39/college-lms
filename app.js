const KEY = "college-lms-db";

const seed = {
  courses: [
    { id: "cyber", name: "Cybersecurity 101" },
    { id: "net", name: "Networking Basics" }
  ],
  assignments: [
    { id: "a1", courseId: "cyber", title: "Threat Models", grade: 90 },
    { id: "a2", courseId: "cyber", title: "Quiz", grade: null }
  ]
};

function load(){
  const d = localStorage.getItem(KEY);
  if(!d){
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(d);
}

function save(db){
  localStorage.setItem(KEY, JSON.stringify(db));
}

let db = load();

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
