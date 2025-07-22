import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NUM_SHAPES = 8; // foreground blobs
const NUM_SPARKLES = 12; // twinkling sparkles
const DURATION = 3500; // loader duration

export default function CountLoader({ onFinish }) {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = [
    "Crafting Your World…",
    "Preparing the Journey…",
    "Loading Experience…",
  ];

  useEffect(() => {
    // ✅ Smooth dynamic counter pacing (ease-in-out)
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      let progress = Math.min(elapsed / DURATION, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2; // slow-fast-slow
      setCount(Math.floor(eased * 100));
      if (progress === 1) clearInterval(interval);
    }, 20);

    // ✅ Cycle taglines every 1.2s
    const taglineTimer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 1200);

    // ✅ Fade out after loader finishes
    const timer = setTimeout(() => {
      setFinished(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 1000); // wait for fade animation
    }, DURATION);

    return () => {
      clearInterval(interval);
      clearInterval(taglineTimer);
      clearTimeout(timer);
    };
  }, [onFinish]);

  // ✅ Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15; // softer parallax
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapes = Array.from({ length: NUM_SHAPES }, () => ({
    size: Math.random() * 200 + 120,
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 90}%`,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 8, // slower floating
  }));

  const sparkles = Array.from({ length: NUM_SPARKLES }, () => ({
    size: Math.random() * 4 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3, // slower sparkle cycle
  }));

  const progressWidth = `${count}%`;

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: finished ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
          style={{
            background: "#000000",
            overflow: "hidden",
          }}
        >
          {/* ✅ Layer 1: Huge faint background blobs */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              animate={{
                scale: [1, 1.05, 1], // very subtle breathing
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                repeat: Infinity,
                duration: 12 + i * 3, // VERY slow
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: `${500 + i * 150}px`,
                height: `${500 + i * 150}px`,
                left: `${15 + i * 20}%`,
                top: `${20 + i * 15}%`,
                background: "rgba(61, 138, 255, 0.1)",
                borderRadius: "50%",
                filter: "blur(60px)",
              }}
            />
          ))}

          {/* ✅ Layer 2: Smaller floating blobs (more visible) */}
          {shapes.map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 0 }}
              animate={{
                y: [0, 20, -20, 0],
                rotate: [0, 8, -8, 0],
                opacity: [0.25, 0.4, 0.25], // more visible
                x: mousePos.x * 0.2,
                y: mousePos.y * 0.2,
              }}
              transition={{
                repeat: Infinity,
                duration: s.duration * 1.5, // slower
                delay: s.delay,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: s.size,
                height: s.size,
                left: s.left,
                top: s.top,
                background: "rgba(61, 138, 255, 0.25)", // brighter blue
                borderRadius: "50%",
                filter: "blur(20px)", // softer but visible
              }}
            />
          ))}

          {/* ✅ Sparkles (slower twinkle) */}
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: s.duration,
                delay: s.delay,
              }}
              style={{
                position: "absolute",
                width: s.size,
                height: s.size,
                left: s.left,
                top: s.top,
                background: "rgba(61,138,255,0.8)",
                borderRadius: "50%",
                filter: "blur(1.5px)",
              }}
            />
          ))}

          {/* ✅ Double Glow Pulse behind counter */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(61,138,255,0.25) 0%, transparent 80%)",
              filter: "blur(50px)",
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute w-[28rem] h-[28rem] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(61,138,255,0.1) 0%, transparent 80%)",
              filter: "blur(90px)",
            }}
          />

          {/* ✅ Center Counter */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-white font-extrabold text-6xl md:text-8xl"
            style={{
              textShadow: `0px 0px 20px rgba(61, 138, 255, 0.7)`,
            }}
          >
            {count}%
          </motion.div>

          {/* ✅ Progress Lines */}
          <div className="mt-6 w-[70%] max-w-[400px] space-y-2">
            {[1, 2, 3].map((line) => (
              <div
                key={line}
                className="w-full h-1 bg-gray-700/30 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #3D8AFF 0%, rgba(61,138,255,0.4) 100%)",
                    boxShadow: "0 0 15px rgba(61, 138, 255, 0.5)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ✅ Morphing Tagline Text */}
          <motion.p
            key={taglineIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-[#3D8AFF] text-lg tracking-widest relative z-10"
          >
            {taglines[taglineIndex]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
