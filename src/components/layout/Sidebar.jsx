import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">LMS</div>

      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/grades">Grades</Link>
      </nav>

      <div className="nav-secondary">
        <p>Courses</p>
        <Link to="/course/cybersecurity">Cybersecurity</Link>
        <Link to="/course/networking">Networking</Link>
      </div>
    </aside>
  );
}
