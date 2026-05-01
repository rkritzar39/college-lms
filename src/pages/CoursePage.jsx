import { useParams } from "react-router-dom";
import courses from "../data/courses.json";
import assignments from "../data/assignments.json";
import modules from "../data/modules.json";

export default function CoursePage() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === id);

  const courseAssignments = assignments.filter(
    (a) => a.courseId === id
  );

  const courseModules = modules.filter((m) => m.courseId === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-page">

      {/* HEADER */}
      <div className="course-header">
        <h1>{course.name}</h1>
        <p>{course.term}</p>

        <div className="progress-bar">
          <div style={{ width: course.progress + "%" }} />
        </div>

        <small>{course.progress}% complete</small>
      </div>

      {/* MODULES */}
      <section className="section">
        <h2>Modules</h2>

        <div className="module-list">
          {courseModules.map((m, i) => (
            <div key={i} className="module-card">
              <h3>{m.title}</h3>
              <p>{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ASSIGNMENTS */}
      <section className="section">
        <h2>Assignments</h2>

        <div className="assignment-list">
          {courseAssignments.map((a, i) => (
            <div key={i} className={`assignment ${a.status}`}>
              <span>{a.title}</span>
              <span>{a.status}</span>
              <span>{a.grade ?? "-"}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
