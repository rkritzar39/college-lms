import courses from "../../data/courses.json";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid">
        {courses.map((c) => (
          <Link key={c.id} to={`/course/${c.id}`} className="card">
            <h3>{c.name}</h3>
            <p>{c.term}</p>

            <div className="bar">
              <div style={{ width: `${c.progress}%` }} />
            </div>

            <small>{c.progress}% complete</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
