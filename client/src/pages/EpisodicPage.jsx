import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EpisodicPage() {
  const [episodics, setEpisodics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/episodics");
        const data = await res.json();
        if (data.success) {
          setEpisodics(data.data);
        }
      } catch (error) {
        console.error("Error fetching episodics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodics();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading episodics...</p>;
  }

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-blue-400 mb-8 text-center"
        >
          🎬 Episodic Stories
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {episodics.map((show, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="bg-white/5 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-white/10"
            >
              {/* ✅ Poster with hover trailer */}
              <div className="relative w-full h-[350px] overflow-hidden rounded-md group">
                {/* Poster */}
                <img
                  src={show.posterUrl}
                  alt={show.title}
                  className="w-full h-full object-cover rounded-md transition duration-500 group-hover:opacity-0"
                />
                {/* Trailer (hover) */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 rounded-md"
                  src={`${show.trailerUrl}?autoplay=1&mute=1`}
                  title={`${show.title} Trailer`}
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>

              {/* ✅ Show Info */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-yellow-400">{show.title}</h2>
                <p className="text-gray-300 text-sm mt-1">{show.description}</p>
                <p className="text-blue-400 font-semibold mt-2">⭐ {show.rating}/10</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
