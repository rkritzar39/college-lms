import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-shell">
        <Topbar />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}
