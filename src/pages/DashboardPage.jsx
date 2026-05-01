import courses from "../data/courses.json";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid">
        {courses?.map((course) => (
          <Link
            to={`/course/${course.id}`}
            key={course.id}
            className="course-card"
          >
            <div className="course-header">
              <h3>{course.name}</h3>
              <span className="term">{course.term}</span>
            </div>

            <div className="progress-wrap">
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <small>{course.progress}% complete</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
