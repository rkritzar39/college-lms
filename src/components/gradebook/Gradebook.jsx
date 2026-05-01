import assignments from "../../data/assignments.json";
import courses from "../../data/courses.json";

export default function GradebookPage() {
  return (
    <div>
      <h1>Gradebook</h1>

      {assignments.map((a, i) => {
        const course = courses.find((c) => c.id === a.courseId);

        return (
          <div key={i}>
            <strong>{course?.name}</strong> | {a.title} | {a.status} | {a.grade ?? "-"}
          </div>
        );
      })}
    </div>
  );
}
