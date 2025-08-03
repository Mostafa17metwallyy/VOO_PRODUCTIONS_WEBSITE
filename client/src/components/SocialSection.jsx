import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaYoutube,
  FaFacebookF,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialSection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const socialLinks = [
    { icon: <FaYoutube />, url: "https://youtube.com" },
    { icon: <FaFacebookF />, url: "https://facebook.com" },
    { icon: <FaTiktok />, url: "https://tiktok.com" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaXTwitter />, url: "https://twitter.com" },
  ];

  return (
    <section className="relative bg-black text-white py-16">
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

      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          FOLLOW OUR JOURNEY
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-xl mx-auto mb-10"
        >
          Stay updated with our latest projects and behind-the-scenes content
          across all our social media platforms
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-6"
        >
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xl transition"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave for smooth transition */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#000000"
          d="M0,64L48,58.7C96,53,192,43,288,37.3C384,32,480,32,576,42.7C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
      </svg>
    </section>
  );
}
