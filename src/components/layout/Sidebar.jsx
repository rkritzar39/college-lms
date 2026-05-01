import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>LMS</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/grades">Gradebook</Link>
      </nav>

      <div className="courses">
        <p>Courses</p>
        <Link to="/course/cybersecurity">Cybersecurity</Link>
        <Link to="/course/networking">Networking</Link>
      </div>
    </aside>
  );
}
