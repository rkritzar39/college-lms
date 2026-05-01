import courses from "../data/courses.json";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid">
        {courses.map((course) => (
          <Link
            to={`/course/${course.id}`}
            key={course.id}
            className="card"
          >
            <h3>{course.name}</h3>
            <p>{course.term}</p>

            <div className="bar">
              <div style={{ width: course.progress + "%" }} />
            </div>

            <small>{course.progress}% complete</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
