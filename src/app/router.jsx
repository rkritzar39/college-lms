import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import DashboardPage from "../pages/DashboardPage";
import CoursePage from "../pages/CoursePage";
import GradebookPage from "../pages/GradebookPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/grades" element={<GradebookPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
