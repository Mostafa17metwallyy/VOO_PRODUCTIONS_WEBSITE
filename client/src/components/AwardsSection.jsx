import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaAward, FaTrophy, FaStar, FaRegSmile } from "react-icons/fa";

export default function AwardsSection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const awards = [
    {
      icon: <FaAward className="text-yellow-400 text-4xl" />,
      title: "CANNES FILM FESTIVAL",
      desc: "Best Cinematography 2023",
    },
    {
      icon: <FaTrophy className="text-yellow-400 text-4xl" />,
      title: "ACADEMY AWARDS",
      desc: "Best Picture Nominee 2022",
    },
    {
      icon: <FaRegSmile className="text-yellow-400 text-4xl" />,
      title: "SUNDANCE FILM FESTIVAL",
      desc: "Audience Award 2021",
    },
    {
      icon: <FaStar className="text-yellow-400 text-4xl" />,
      title: "DIRECTORS GUILD",
      desc: "Outstanding Direction 2020",
    },
  ];

  return (
    <section className="relative bg-black text-white py-20">
      {/* Wave Divider */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#000000"
          d="M0,64L48,58.7C96,53,192,43,288,37.3C384,32,480,32,576,42.7C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          AWARD-WINNING EXCELLENCE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-xl mx-auto mb-12"
        >
          Recognized for our commitment to storytelling excellence
        </motion.p>

        {/* Awards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10"
        >
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center space-y-3"
            >
              {award.icon}
              <h3 className="font-bold text-lg">{award.title}</h3>
              <p className="text-gray-400 text-sm">{award.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold"
        >
          View All Awards
        </motion.button>
      </div>
    </section>
  );
}