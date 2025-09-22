import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProductionsSection() {
  const [activeTab, setActiveTab] = useState("films");
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const films = [
    { title: "Epic Drama", desc: "Award-winning dramatic feature", img: "https://picsum.photos/400/300?random=1" },
    { title: "Action Thriller", desc: "High-octane adventure story", img: "https://picsum.photos/400/300?random=2" },
    { title: "Crime Series", desc: "8-episode mystery thriller", img: "https://picsum.photos/400/300?random=3" },
    { title: "Comedy Special", desc: "Stand-up comedy series", img: "https://picsum.photos/400/300?random=4" },
    { title: "Indie Romance", desc: "Heartfelt character study", img: "https://picsum.photos/400/300?random=5" },
    { title: "Documentary", desc: "Powerful true story", img: "https://picsum.photos/400/300?random=6" },
    { title: "Historical Drama", desc: "Period piece miniseries", img: "https://picsum.photos/400/300?random=7" },
    { title: "Web Series", desc: "Digital-first content", img: "https://picsum.photos/400/300?random=8" },
  ];

  const episodic = [
    { title: "Mystery Nights", desc: "10-part suspense series", img: "https://picsum.photos/400/300?random=9" },
    { title: "Laugh Lane", desc: "Comedy episodic", img: "https://picsum.photos/400/300?random=10" },
    { title: "Future Tides", desc: "Sci-fi miniseries", img: "https://picsum.photos/400/300?random=11" },
    { title: "Shadow Streets", desc: "Crime episodic thriller", img: "https://picsum.photos/400/300?random=12" },
    { title: "Romance Redux", desc: "Love stories rebooted", img: "https://picsum.photos/400/300?random=13" },
    { title: "Beyond Borders", desc: "Global storytelling series", img: "https://picsum.photos/400/300?random=14" },
    { title: "Urban Beats", desc: "Music & culture episodic", img: "https://picsum.photos/400/300?random=15" },
    { title: "Legends Retold", desc: "Modern retelling of classics", img: "https://picsum.photos/400/300?random=16" },
  ];

  // NEW: Advertising tab data (same card layout)
  const advertising = [
    { title: "Luxury Fragrance", desc: "Cinematic product film", img: "https://picsum.photos/400/300?random=21" },
    { title: "Sportswear Launch", desc: "Fast-cut hype spot", img: "https://picsum.photos/400/300?random=22" },
    { title: "Tech Gadget", desc: "CGI + live-action ad", img: "https://picsum.photos/400/300?random=23" },
    { title: "F&B Campaign", desc: "Macro food stylized ad", img: "https://picsum.photos/400/300?random=24" },
    { title: "Automotive Teaser", desc: "Moody metal & motion", img: "https://picsum.photos/400/300?random=25" },
    { title: "Beauty Brand", desc: "Soft light product reel", img: "https://picsum.photos/400/300?random=26" },
    { title: "Event Promo", desc: "High-energy social cut", img: "https://picsum.photos/400/300?random=27" },
    { title: "App Launch", desc: "Motion graphics explainer", img: "https://picsum.photos/400/300?random=28" },
  ];

  const tabs = [
    { key: "films", label: "Films" },
    { key: "episodic", label: "Episodic" },
    { key: "ads", label: "Advertising" }, // 👈 NEW
  ];

  const dataset = {
    films,
    episodic,
    ads: advertising,
  }[activeTab];

  return (
    <section
      ref={ref}
      className="relative py-20 text-white"
      style={{
        backgroundImage: `url('/production-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl md:text-4xl font-bold mb-10"
        >
          OUR LATEST PRODUCTIONS
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-10"
          role="tablist"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={activeTab === t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-2 text-lg font-semibold ${
                activeTab === t.key
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {dataset.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md"
            >
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
