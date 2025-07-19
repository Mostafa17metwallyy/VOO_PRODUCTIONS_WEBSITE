import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // ✅ This will call backend API (we'll build it later)
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", projectType: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server error. Please try later.");
    }
  };

  return (
    <section className="relative bg-black text-white py-20">
      {/* Wave Divider */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#000000"
          d="M0,64L48,58.7C96,53,192,43,288,37.3C384,32,480,32,576,42.7C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Left: Form */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            LET'S CREATE TOGETHER
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Project Type</label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold"
            >
              Send Message
            </motion.button>
          </form>

          {/* Status Message */}
          {status && <p className="mt-4 text-sm">{status}</p>}
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2">GET IN TOUCH</h3>
            <p className="flex items-center space-x-2">
              📞 <span>+1 (555) 123-4567</span>
            </p>
            <p className="flex items-center space-x-2">
              ✉️ <span>info@vooproductions.com</span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">OUR LOCATIONS</h3>
            <p>
              <span className="font-semibold">Los Angeles Studio</span>
              <br />
              1234 Hollywood Blvd, Los Angeles, CA 90028
            </p>
            <br />
            <p>
              <span className="font-semibold">New York Office</span>
              <br />
              567 Broadway, New York, NY 10012
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
