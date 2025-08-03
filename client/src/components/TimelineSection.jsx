import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AwardsSection() {
  const awards = [
    {
      name: "Best Cinematography",
      title: "Best Cinematography – Cannes Film Festival",
      description: "Awarded for excellence in visual storytelling and camera work in our 2015 short film.",
      image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Outstanding Editing",
      title: "Outstanding Editing – Sundance",
      description: "Recognized for seamless post-production in a high-intensity drama.",
      image: "https://images.unsplash.com/photo-1536697246787-1f7ae568c95a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Best Short Film",
      title: "Best Short Film – Tribeca Festival",
      description: "Our short film captured hearts with emotional depth and crisp storytelling.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Innovation in VFX",
      title: "Innovation in Visual Effects – Digital Media Awards",
      description: "Awarded for groundbreaking VFX in a sci-fi concept trailer.",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Audience Choice",
      title: "Audience Choice Award – Raindance",
      description: "Voted by viewers as the most impactful narrative of the year.",
      image: "https://images.unsplash.com/photo-1549921296-3a871e20f66d?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeAward = awards[activeIndex];

  return (
    <section className="bg-black text-white py-20 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT: Award Tabs */}
        <div
          className="md:col-span-1 overflow-x-auto md:overflow-y-scroll pr-4 border-r border-gray-800 scroll-smooth snap-y snap-mandatory hide-scrollbar flex md:block gap-4 md:gap-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {awards.map((award, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`cursor-pointer py-3 px-4 snap-start transition-all duration-300 whitespace-nowrap md:whitespace-normal ${
                  isActive
                    ? "text-yellow-400 font-extrabold text-lg border-l-4 border-yellow-400 md:border-l-0 md:border-b-4"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {award.name}
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: Award Details */}
        <div className="md:col-span-2 pl-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAward.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
            >
              {/* TEXT */}
              <div>
                <h3 className="text-blue-400 text-2xl mb-3">{activeAward.title}</h3>
                <p className="text-gray-300 leading-relaxed">{activeAward.description}</p>
              </div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <img
                  src={activeAward.image}
                  alt={activeAward.title}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}
