import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export default function AchievementsSection() {
  const achievements = [
    { id: "01", title: "NAB SHOW", subtitle: "Product of the Year", year: "2025" },
    { id: "02", title: "Emmy Awards", subtitle: "Best Post Production Team", year: "2024" },
    { id: "03", title: "Sundance", subtitle: "Audience Choice Award", year: "2023" },
    { id: "04", title: "Cannes", subtitle: "Best Cinematography", year: "2022" },
    { id: "05", title: "AI Film Fest", subtitle: "Innovation in Editing", year: "2021" },
    { id: "06", title: "Directors Guild", subtitle: "Studio of the Year", year: "2020" },
  ];

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Cinematic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-blue-400 text-4xl font-bold text-center mb-16 tracking-wide relative z-10"
      >
        OUR ACHIEVEMENTS SHINE BRIGHT
      </motion.h2>

      {/* Achievements Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative z-10">
        {achievements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="relative rounded-xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(0,115,255,0.3)] transition-all duration-500"
          >
            {/* Ghost Number in Background */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.05 }}
              transition={{ delay: 0.3 }}
              className="absolute text-[110px] font-extrabold text-white/10 top-4 left-6 select-none"
            >
              {item.id}
            </motion.span>

            {/* Floating Trophy Icon */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-center mb-4"
            >
              <FaTrophy className="text-yellow-400 text-4xl drop-shadow-md" />
            </motion.div>

            {/* Award Content */}
            <div className="text-center relative z-10">
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.subtitle}</p>
              <p className="text-blue-400 text-xs mt-2">{item.year}</p>
            </div>

            {/* Hover Animated Border Gradient */}
            <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10 blur-md" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
