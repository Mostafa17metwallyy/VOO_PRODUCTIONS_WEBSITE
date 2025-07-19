import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import WhoWeArePage from "./pages/WhoWeArePage";
import GetInTouchPage from "./pages/GetInTouchPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/contact" element={<GetInTouchPage />} />
        {/* Add more pages here later */}
      </Routes>
      <Footer />
    </Router>
  );
}
