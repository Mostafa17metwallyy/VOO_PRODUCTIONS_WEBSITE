import React from "react";
import ehabImg from "../assets/ehabImg.jpg";
import adhamImg from "../assets/adhamImg.jpg";

const teamMembers = [
  { name: "Ehab Gohar", role: "CEO", img: ehabImg },
  { name: "Adham Abouelfetouh", role: "VP", img: adhamImg },
];

export default function TeamSection() {
  return (
    <section className="bg-black py-20 text-center">
      <h2 className="text-4xl font-bold text-blue-400 mb-12">
        The Team Behind It All
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="group bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image wrapper: now clips the zoomed image */}
            <div className="relative aspect-[4/5] bg-neutral-800 overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top origin-top
                           grayscale transition-transform duration-500
                           group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>

            {/* Content sits above; won't be overlapped */}
            <div className="p-5 relative z-10">
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition duration-300">
                {member.name}
              </h3>
              <p className="text-gray-400 group-hover:text-blue-300 transition duration-300">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
