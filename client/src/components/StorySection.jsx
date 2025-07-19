import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function StorySection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const timeline = [
    {
      year: "2015",
      title: "COMPANY FOUNDED",
      desc: "Started with our first independent film project",
    },
    {
      year: "2018",
      title: "FIRST MAJOR AWARD",
      desc: "Received breakthrough recognition at Sundance",
    },
    {
      year: "2021",
      title: "STUDIO EXPANSION",
      desc: "Opened new production facilities",
    },
    {
      year: "2023",
      title: "INTERNATIONAL SUCCESS",
      desc: "Films distributed in over 50 countries",
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
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR STORY</h2>
          <p className="text-gray-300 mb-4">
            Founded with a vision to transform storytelling through innovative
            filmmaking, VOO Productions has grown from a small creative
            collective to an award-winning production company. Our journey
            began with a simple belief: every story deserves to be told with
            passion, precision, and purpose.
          </p>
          <p className="text-gray-300 mb-6">
            Over the years, we've built lasting partnerships with talented
            directors, writers, and actors who share our commitment to
            excellence. From intimate character studies to epic blockbusters,
            we approach each project with the same dedication to craft and
            creativity.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold"
          >
            More About Us
          </motion.button>
        </motion.div>

        {/* Right Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {timeline.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-400 mt-1"></div>
              <div>
                <h3 className="font-bold text-lg">
                  {item.year} - {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
