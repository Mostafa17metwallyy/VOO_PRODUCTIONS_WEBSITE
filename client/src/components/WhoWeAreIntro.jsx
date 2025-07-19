import { motion } from "framer-motion";

export default function WhoWeAreIntro() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Who We Are"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-4"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          OUR MISSION:{" "}
          <span className="text-blue-400">TO BE RELENTLESSLY</span> <br /> CUSTOMER-OBSESSED
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md shadow-md font-semibold transition"
          >
            Start Your Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-md font-semibold transition"
          >
            Get In Touch
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
