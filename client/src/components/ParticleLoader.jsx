import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 80; // 🔥 Increased particles for a richer effect

export default function ParticleLoader({ onFinish }) {
  const [particles, setParticles] = useState([]);
  const [stage, setStage] = useState("gather"); // gather → burst → done

  useEffect(() => {
    // ✅ Create random particles with varied sizes and spread
    const temp = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      size: Math.random() * 6 + 3, // smaller range for smoother look
    }));
    setParticles(temp);

    // ✅ Timeline:
    // 2s gather → 1.5s burst → done
    const gatherTimer = setTimeout(() => setStage("burst"), 2000);
    const doneTimer = setTimeout(() => {
      setStage("done");
      if (onFinish) onFinish();
    }, 3500);

    return () => {
      clearTimeout(gatherTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  if (stage === "done") return null; // ✅ hide loader after animation

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
      style={{ overflow: "hidden" }}
    >
      {/* ✅ Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{
            x: p.x,
            y: p.y,
            opacity: 0.3,
            scale: 0.6,
          }}
          animate={
            stage === "gather"
              ? {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: Math.random() * 0.3, // ✅ slight delay per particle
                  },
                }
              : {
                  x: p.x * 2.5,
                  y: p.y * 2.5,
                  opacity: 0,
                  scale: 0.3,
                  transition: {
                    duration: 1,
                    ease: "easeOut",
                  },
                }
          }
          className="absolute rounded-full shadow-lg"
          style={{
            width: p.size,
            height: p.size,
            background:
              i % 2 === 0
                ? "rgba(0,255,150,0.8)" // ✅ alternating colors for depth
                : "rgba(0,200,255,0.8)",
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* ✅ Center logo or text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: stage === "gather" ? 1 : 0,
          scale: stage === "burst" ? 1.2 : 1,
        }}
        transition={{ duration: 1 }}
        className="text-white text-3xl md:text-5xl font-extrabold absolute"
      >
        {/* Replace with your logo or SVG */}
        <span className="text-green-400">VOO</span> LOADING...
      </motion.div>
    </div>
  );
}
