import { useParams } from "react-router-dom";
import courses from "../../data/courses.json";
import assignments from "../../data/assignments.json";
import modules from "../../data/modules.json";

export default function CoursePage() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === id);
  const courseAssignments = assignments.filter((a) => a.courseId === id);
  const courseModules = modules.filter((m) => m.courseId === id);

  if (!course) return <h2>Course not found</h2>;

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.term}</p>

      <h2>Modules</h2>
      {courseModules.map((m, i) => (
        <div key={i}>
          <h3>{m.title}</h3>
          <p>{m.description}</p>
        </div>
      ))}

      <h2>Assignments</h2>
      {courseAssignments.map((a, i) => (
        <div key={i}>
          <span>{a.title}</span> - <span>{a.status}</span> - <span>{a.grade ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}
