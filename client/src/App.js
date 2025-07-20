import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WhoWeArePage from "./pages/WhoWeArePage";
import GetInTouchPage from "./pages/GetInTouchPage";
import FilmPage from "./pages/FilmPage";
import EpisodicPage from "./pages/EpisodicPage";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./components/admin/AdminDashboard";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken"); // ✅ Check if admin logged in
  return token ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/contact" element={<GetInTouchPage />} />
        <Route path="/films" element={<FilmPage />} />
        <Route path="/episodic" element={<EpisodicPage />} />

        {/* Admin Auth Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* ✅ Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
