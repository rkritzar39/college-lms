import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import CoursePage from "../components/course/CoursePage";
import GradebookPage from "../components/gradebook/GradebookPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/grades" element={<GradebookPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
