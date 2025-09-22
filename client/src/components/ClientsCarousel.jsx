// ClientsCarousel.jsx
import { motion } from "framer-motion";
import ShahifLogo from "../assets/shahif_logo.png";
import SadafLogo from "../assets/Sadaf_logo.png";
import DNALogo from "../assets/DNA_logo.png";

export default function ClientsCarousel() {
  const base = [
    { src: ShahifLogo, alt: "Shahif" },
    { src: SadafLogo, alt: "Sadaf" },
    { src: DNALogo, alt: "DNA" },
  ];

  // Make a long track then duplicate it once for seamless wrap.
  const track = Array.from({ length: 6 }).flatMap(() => base); // widen coverage
  const looped = [...track, ...track]; // duplicate for infinite scroll

  return (
    <section className="relative bg-black text-white py-14 overflow-hidden">
      {/* full-bleed */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* fade masks (optional) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-black to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-black to-transparent z-20" />

        {/* Single, seamless track */}
        <motion.div
          className="flex items-center gap-24 py-2 will-change-transform min-w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          style={{ transform: "translateZ(0)" }} // GPU hint
        >
          {looped.map((logo, i) => (
            <motion.div
              key={i}
              className="shrink-0 flex items-center justify-center"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                draggable="false"
                className="
                  block
                  h-20 md:h-28 lg:h-32 w-auto object-contain
                  opacity-90 hover:opacity-100
                  grayscale hover:grayscale-0
                  transition-opacity duration-300
                  drop-shadow-md select-none
                "
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Spacer just to reserve height for the absolute masks */}
        <div className="invisible h-32 md:h-40 lg:h-44" />
      </div>
    </section>
  );
}
