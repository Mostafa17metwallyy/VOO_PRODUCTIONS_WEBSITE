import React from "react";

const teamMembers = [
  {
    name: "Anna Brown",
    role: "React Engineer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Smith",
    role: "Backend Developer",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Sophia Lee",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "John Carter",
    role: "AI Specialist",
    img: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    name: "Emily White",
    role: "Project Manager",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Chris Evans",
    role: "Data Scientist",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Olivia Green",
    role: "Marketing Strategist",
    img: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Michael Johnson",
    role: "DevOps Engineer",
    img: "https://randomuser.me/api/portraits/men/53.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-black py-20 text-center">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-blue-400 mb-12">
        The Team Behind It All
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="group bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
          >
            {/* Image */}
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Content */}
            <div className="p-5">
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
