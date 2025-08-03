import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo & Tagline */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">VOO Productions</h2>
          <p className="text-sm">Bringing stories to life through cinematic excellence</p>
        </div>

        {/* Column 2 - Quick Links (Same as Navbar) */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/films" className="hover:text-white">Film</Link></li>
            <li><Link to="/episodic" className="hover:text-white">Episodic</Link></li>
            <li><Link to="/who-we-are" className="hover:text-white">Who Are We?</Link></li>
            <li><Link to="/contact" className="hover:text-white">Get In Touch</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">+1 (555) 123-4567</p>
          <p className="text-sm">info@vooproductions.com</p>
          <p className="text-sm">Los Angeles, CA</p>
          <p className="text-sm">New York, NY</p>
        </div>

        {/* Column 4 - Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 text-white text-xl">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 space-y-2">
        <p>© {new Date().getFullYear()} VOO Productions. All rights reserved.</p>
        <p>
          Powered by{" "}
          <a
            href="https://thesydev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Sydev
          </a>
        </p>
      </div>
    </footer>
  );
}
