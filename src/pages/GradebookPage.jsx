import assignments from "../data/assignments.json";
import courses from "../data/courses.json";

export default function GradebookPage() {
  return (
    <div className="gradebook-page">
      <h1>Gradebook</h1>

      <div className="gradebook-table">

        {/* HEADER */}
        <div className="gradebook-row header">
          <span>Course</span>
          <span>Assignment</span>
          <span>Status</span>
          <span>Grade</span>
        </div>

        {/* ROWS */}
        {assignments.map((a, i) => {
          const course = courses.find(c => c.id === a.courseId);

          return (
            <div key={i} className={`gradebook-row ${a.status}`}>
              <span>{course?.name || a.courseId}</span>
              <span>{a.title}</span>
              <span>{a.status}</span>
              <span>{a.grade ?? "-"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
