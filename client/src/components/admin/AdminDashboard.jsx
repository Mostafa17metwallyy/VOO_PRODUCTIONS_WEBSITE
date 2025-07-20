import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminFilms from "./AdminFilms";
import AdminEpisodic from "./AdminEpisodic";
import AdminResponses from "./AdminResponses";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        {/* Default redirect to films */}
        <Route path="/" element={<Navigate to="films" />} />

        {/* Manage Films */}
        <Route path="films" element={<AdminFilms />} />

        {/* Manage Episodic */}
        <Route path="episodic" element={<AdminEpisodic />} />

        {/* View Responses */}
        <Route path="responses" element={<AdminResponses />} />
      </Routes>
    </AdminLayout>
  );
}
