import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [animateText, setAnimateText] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation


  useEffect(() => {
    const timer = setTimeout(() => setAnimateText(true), 300);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
      {/* 🔹 Background Video/Image */}
      {/* 🔹 Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Cinematic background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔹 Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: animateText ? 1 : 0, y: animateText ? 0 : 40 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-4"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          BRINGING STORIES TO LIFE <br /> THROUGH{" "}
          <span className="text-blue-400">CINEMATIC EXCELLENCE</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          VOO Productions creates compelling films and episodic content that
          captivate audiences worldwide. From concept to screen, we deliver
          premium storytelling that resonates.
        </p>
        {/* 🔹 Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* ✅ View Our Work → redirects to /films */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md shadow-md font-semibold transition"
            onClick={() => navigate("/films")}
          >
            View Our Work
          </motion.button>

          {/* ✅ Get In Touch → redirects to /contact */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-md font-semibold transition"
            onClick={() => navigate("/contact")}
          >
            Get In Touch
          </motion.button>
        </div>{" "}
      </motion.div>

      {/* 🔹 Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ opacity: 0, y: Math.random() * window.innerHeight }}
            animate={{
              opacity: [0.3, 0.8, 0],
              y: [Math.random() * window.innerHeight, -50],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
