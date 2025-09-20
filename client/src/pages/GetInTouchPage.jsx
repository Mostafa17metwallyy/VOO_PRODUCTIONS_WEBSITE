import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";

export default function GetInTouchPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Film",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [particlesInitDone, setParticlesInitDone] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadBasic(engine);
    }).then(() => setParticlesInitDone(true));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "get-in-touch" }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", projectType: "Film", message: "" });
      } else setStatus("error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const particlesOptions = {
    background: { color: "transparent" },
    particles: {
      number: { value: 40 },
      size: { value: 2 },
      move: { enable: true, speed: 0.5 },
      opacity: { value: 0.4 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // ---- Office location (Riyadh) ----
  const ADDRESS = "Uthman Ibn Affan Rd, Riyadh 13328, Saudi Arabia";
  const mapsQuery = encodeURIComponent(ADDRESS);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const embedSrc = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;

  // ---- Clickable contact items ----
  const contacts = [
    {
      icon: <FaEnvelope className="text-blue-400 text-3xl" />,
      title: "Email",
      value: "info@vooproductions.com",
      href: "mailto:info@vooproductions.com",
    },
    {
      icon: <FaPhoneAlt className="text-blue-400 text-3xl" />,
      title: "Phone",
      value: "+966 56 985 6418",
      href: "tel:+966 56 985 6418",
    },
    {
      icon: <FaInstagram className="text-blue-400 text-3xl" />,
      title: "Instagram",
      value: "@vowstudios.sa",
      href: "https://www.instagram.com/vowstudios.sa?igsh=czZkNTc1amM0N3Jp&utm_source=qr",
      external: true,
    },
    {
      icon: <FaLinkedin className="text-blue-400 text-3xl" />,
      title: "LinkedIn",
      value: "VOO Productions",
      href: "https://www.linkedin.com/company/voo-productions",
      external: true,
    },
  ];

  return (
    <section className="bg-black text-white overflow-hidden relative">
      {particlesInitDone && (
        <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
      )}

      {/* HERO INTRO */}
      <motion.div
        className="relative z-10 h-[50vh] flex flex-col justify-center items-center text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h1 className="text-4xl md:text-5xl font-bold">LET’S CREATE TOGETHER</motion.h1>
        <motion.p className="text-gray-300 mt-4 max-w-2xl text-center px-4" variants={fadeInUp}>
          Reach out and let’s bring your next big production to life. Whether it’s film, episodic, or
          post-production magic – we’re here.
        </motion.p>
      </motion.div>

      {/* GLASS CONTACT FORM */}
      <motion.div
        className="relative z-10 py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400">Your Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full mt-1 px-4 py-3 rounded-md bg-black/40 border border-gray-700 focus:border-blue-400 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Your Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full mt-1 px-4 py-3 rounded-md bg-black/40 border border-gray-700 focus:border-blue-400 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 rounded-md bg-black/40 border border-gray-700 focus:border-blue-400 focus:outline-none"
                >
                  <option>Film</option>
                  <option>Episodic</option>
                  <option>Post Production</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-3 rounded-md bg-black/40 border border-gray-700 focus:border-blue-400 focus:outline-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <div className="md:col-span-2 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </motion.button>
                {status === "success" && <p className="text-green-400 mt-2">✅ Message sent successfully</p>}
                {status === "error" && <p className="text-red-400 mt-2">❌ Something went wrong</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* QUICK CONTACT CARDS (clickable) */}
      <motion.div
        className="relative z-10 py-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {contacts.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-label={`${item.title}: ${item.value}`}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="block text-center bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              <div className="mb-3 flex justify-center">{item.icon}</div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-300 text-sm mt-1 underline decoration-transparent hover:decoration-blue-400">
                {item.value}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* OUR OFFICE (Single location, clickable map) */}
      <motion.div
        className="relative z-10 py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
            OUR OFFICE
          </motion.h2>

          <div className="mx-auto max-w-2xl">
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-md border border-white/10">
              <FaMapMarkerAlt className="text-blue-400 text-3xl mb-2 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Riyadh</h3>
              <p className="text-gray-300 text-sm">{ADDRESS}</p>
            </div>
          </div>

          {/* Map: open Google Maps on click */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 rounded-lg overflow-hidden border border-white/10 relative"
          >
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Google Maps"
              className="absolute inset-0 z-10"
            />
            <iframe
              title="Office Location - Riyadh"
              src={embedSrc}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
