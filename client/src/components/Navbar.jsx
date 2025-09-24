import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
// 👇 import your logo (adjust path/filename as needed)
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FILM", path: "/films" },
    { name: "EPISODIC", path: "/episodic" },
    { name: "ADVERTISING", path: "/advertising" },
    { name: "WHO ARE WE?", path: "/who-we-are" },
    { name: "GET IN TOUCH", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo (linked to Home) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0"
        >
          <Link to="/">
            <img
              src={logo}
              alt="VOO Productions Logo"
              className="h-20 md:h-24 w-auto -my-3 block" // adjust size as you like
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <Link
                  to={link.path}
                  className={`transition ${
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-white hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}

          {/* Start Your Project Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/contact"
              className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/80 backdrop-blur-md px-6 py-4 space-y-4"
        >
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={i}
                to={link.path}
                className={`block transition ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-white hover:text-blue-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            to="/contact"
            className="block mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
            onClick={() => setIsOpen(false)}
          >
            Start Your Project
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
