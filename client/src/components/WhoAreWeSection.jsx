import { motion } from "framer-motion";

export default function WhoAreWeSection() {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
            WHO ARE WE
          </h2>
          <p className="text-gray-300 leading-relaxed">
            “WHERE IMAGINATION MEETS FORM” is the essence of Prime Focus
            Technologies (PFT), a company that combines creativity and
            technology to provide innovative solutions for the media and
            entertainment industry. PFT’s flagship technology products, CLEAR®
            and CLEAR® AI, are examples of this convergence, as they leverage
            the power of the cloud and innovative AI technology to help you
            manage content with greater ease and efficiency.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="/about-bg.png"
            alt="Film production"
            className="rounded-md shadow-lg"
          />

          {/* Decorative accent line */}
          <div className="absolute -top-6 -left-6 w-20 h-1 bg-blue-400"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-1 bg-blue-400"></div>
        </motion.div>
      </div>

      {/* OPTIONAL subtle divider */}
      <svg
        className="absolute bottom-0 left-0 w-full text-black"
        viewBox="0 0 1440 50"
        fill="currentColor"
      >
        <path d="M0,32L1440,0L1440,50L0,50Z"></path>
      </svg>
    </section>
  );
}
