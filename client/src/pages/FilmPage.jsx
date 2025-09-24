import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FilmPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/films");
        const data = await res.json();
        if (data.success) {
          setFilms(data.data);
        }
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading films...</p>;
  }

  return (
    <section className="bg-black text-white py-16 pt-28 md:pt-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-blue-400 mb-8 text-center"
        >
          Adventures
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {films.map((film, idx) => (
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
                  src={film.posterUrl}
                  alt={film.title}
                  className="w-full h-full object-cover rounded-md transition duration-500 group-hover:opacity-0"
                />
                {/* Trailer (hover) */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 rounded-md"
                  src={`${film.trailerUrl}?autoplay=1&mute=1`}
                  title={`${film.title} Trailer`}
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>

              {/* ✅ Film Info */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-yellow-400">{film.title}</h2>
                <p className="text-gray-300 text-sm mt-1">{film.description}</p>
                <p className="text-blue-400 font-semibold mt-2">⭐ {film.rating}/10</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
