import { useState } from "react";

export default function AdminSignup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:5000/api/admin/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ email: "", password: "" });
      } else {
        setStatus(data.message || "error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-white/10 p-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Admin Email"
            className="w-full px-4 py-2 rounded bg-black/40 border border-gray-500 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-black/40 border border-gray-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md font-semibold"
          >
            {status === "loading" ? "Creating..." : "Create Admin"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 text-center mt-3">
            ✅ Admin created successfully!
          </p>
        )}
        {status && status !== "success" && status !== "loading" && (
          <p className="text-red-400 text-center mt-3">❌ {status}</p>
        )}
      </div>
    </div>
  );
}
