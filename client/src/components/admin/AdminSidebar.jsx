import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInbox, FaFilm, FaTv, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove saved JWT
    navigate("/admin/login"); // redirect back to login
  };

  const links = [
    { name: "Responses", icon: <FaInbox />, path: "/admin/dashboard/responses" },
    { name: "Films", icon: <FaFilm />, path: "/admin/dashboard/films" },
    { name: "Episodic", icon: <FaTv />, path: "/admin/dashboard/episodic" },
  ];

  return (
    <aside className="flex flex-col justify-between w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white min-h-screen p-4">
      {/* ✅ Top Section */}
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">VOO Admin</h1>

        <nav className="space-y-2">
          {links.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={idx}
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                  isActive ? "bg-blue-900 shadow-md" : "hover:bg-blue-600"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-md bg-red-600 hover:bg-red-700 transition mt-6"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}
