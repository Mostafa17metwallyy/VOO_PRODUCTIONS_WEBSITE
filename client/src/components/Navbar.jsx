import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "FILM", href: "#film" },
    { name: "EPISODIC", href: "#episodic" },
    { name: "WHO ARE WE?", href: "#about" },
    { name: "GET IN TOUCH", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-bold text-lg tracking-wider"
        >
          VOO PRODUCTIONS
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className="text-white hover:text-blue-400 transition"
            >
              {link.name}
            </motion.a>
          ))}

          {/* Start Your Project Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#start"
            className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
          >
            Start Your Project
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
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
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="block text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#start"
            className="block mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
          >
            Start Your Project
          </a>
        </motion.div>
      )}
    </nav>
  );
}
