import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimelineSection() {
  // Generate full range of years
  const allYears = Array.from({ length: 16 }, (_, i) => 2010 + i);

  // Timeline content (to be fetched later)
  const timelineContent = {
    2010: {
      title: "Our Journey Begins",
      description:
        "We started as a small creative collective focused on independent filmmaking.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    },
    2011: {
      title: "Growing the Team",
      description: "Expanded with more creative minds and innovative ideas.",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    },
    2012: {
      title: "First Studio Opened",
      description:
        "Established our first studio in Los Angeles and expanded our creative team.",
      image:
        "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80",
    },
    2013: {
      title: "Early Recognition",
      description:
        "Our first independent short films won recognition at local festivals.",
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    },
    2014: {
      title: "Bigger Productions",
      description:
        "Moved into larger production sets with advanced cinematography tools.",
      image:
        "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?auto=format&fit=crop&w=1200&q=80",
    },
    2015: {
      title: "First Major Award",
      description:
        "Received our first major award for excellence in post-production.",
      image:
        "https://images.unsplash.com/photo-1536697246787-1f7ae568c95a?auto=format&fit=crop&w=1200&q=80",
    },
    2016: {
      title: "International Collaboration",
      description:
        "Collaborated with international directors and expanded our portfolio.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    },
    2017: {
      title: "Breaking Boundaries",
      description:
        "We adopted cutting-edge technology and created immersive experiences.",
      image:
        "https://images.unsplash.com/photo-1513569771920-d59f82f1f8f8?auto=format&fit=crop&w=1200&q=80",
    },
    2018: {
      title: "Breakthrough Year",
      description:
        "Achieved recognition with award-winning productions and cutting-edge technology.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    2019: {
      title: "Technology Upgrades",
      description:
        "Invested in AI-powered editing and automated workflows for efficiency.",
      image:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80",
    },
    2020: {
      title: "Remote Production Era",
      description:
        "Adapted to remote production and cloud-based collaboration tools.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    2021: {
      title: "Virtual Production",
      description:
        "Introduced virtual sets and real-time rendering for productions.",
      image:
        "https://images.unsplash.com/photo-1607703703673-4a02b381c5d3?auto=format&fit=crop&w=1200&q=80",
    },
    2022: {
      title: "Streaming Boom",
      description:
        "Partnered with major streaming platforms for exclusive content.",
      image:
        "https://images.unsplash.com/photo-1545670723-196ed0954984?auto=format&fit=crop&w=1200&q=80",
    },
    2023: {
      title: "Global Expansion",
      description:
        "Opened new offices worldwide and partnered with major studios.",
      image:
        "https://images.unsplash.com/photo-1549921296-3a871e20f66d?auto=format&fit=crop&w=1200&q=80",
    },
    2024: {
      title: "Next-Level Storytelling",
      description:
        "Pioneered interactive storytelling formats and hybrid media projects.",
      image:
        "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80",
    },
    2025: {
      title: "Innovating the Future",
      description:
        "Leading the way in AI-driven post-production and cinematic excellence.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    },
  };

  const [activeYear, setActiveYear] = useState(2012);

  const activeContent = timelineContent[activeYear] || {
    title: "Coming Soon",
    description: "Exciting milestones will be added for this year!",
    image: "https://via.placeholder.com/500x300?text=Coming+Soon",
  };

  return (
    <section className="bg-black text-white py-20 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT: Scrollable Years */}
        <div
          className="
            md:col-span-1 
            h-96 
            overflow-y-scroll 
            pr-4 
            border-r border-gray-800 
            scroll-smooth 
            snap-y snap-mandatory 
            hide-scrollbar
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {allYears.map((year) => {
            const isActive = activeYear === year;
            return (
              <motion.div
                key={year}
                onClick={() => setActiveYear(year)}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "left center" }} // ✅ prevents cutting the '2'
                className={`cursor-pointer py-3 snap-start transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 font-extrabold text-2xl"
                    : "text-gray-400 text-lg hover:text-white"
                }`}
              >
                {year}
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: Dynamic Year Content */}
        <div className="md:col-span-2 pl-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${
                activeYear % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* TEXT */}
              <div>
                <h3 className="text-blue-400 text-2xl mb-3">
                  {activeContent.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {activeContent.description}
                </p>
              </div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <img
                  src={activeContent.image}
                  alt={activeContent.title}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ CSS for hiding scrollbar */}
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
