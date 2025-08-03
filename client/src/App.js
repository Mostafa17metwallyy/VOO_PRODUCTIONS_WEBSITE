import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";

// ✅ Loader (cinematic count-up loader)
import CountLoader from "./components/CountLoader";

// ✅ Scroll to Top on route change
import ScrollToTop from "./components/ScrollToTop"; // 👈 ADD THIS

// ✅ Public Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WhoWeArePage from "./pages/WhoWeArePage";
import GetInTouchPage from "./pages/GetInTouchPage";
import FilmPage from "./pages/FilmPage";
import EpisodicPage from "./pages/EpisodicPage";

// ✅ Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./components/admin/AdminDashboard";

// ✅ Protected Route for Admin
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
}

// ✅ LayoutWrapper to hide Navbar & Footer on admin routes
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleFinish = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <CountLoader onFinish={handleFinish} />}

      {loaded && (
        <Router>
          <ScrollToTop /> {/* 👈 ADD THIS INSIDE Router */}
          <LayoutWrapper>
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

              {/* Protected Admin Dashboard */}
              <Route
                path="/admin/dashboard/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </LayoutWrapper>
        </Router>
      )}
    </>
  );
}
