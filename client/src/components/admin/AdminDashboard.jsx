import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminFilms from "./AdminFilms";
import AdminEpisodic from "./AdminEpisodic";
import AdminResponses from "./AdminResponses";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="films" />} />
        <Route path="films" element={<AdminFilms />} />
        <Route path="episodic" element={<AdminEpisodic />} />
        <Route path="responses" element={<AdminResponses />} />
      </Routes>
    </AdminLayout>
  );
}
