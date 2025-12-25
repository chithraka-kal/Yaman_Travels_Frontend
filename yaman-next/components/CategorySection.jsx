"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // 1. Import Link

const categories = [
  {
    title: "Beach", // Changed from "Beaches" to match Destination tags
    image: "/beach.jpg", 
    count: "12 Destinations",
  },
  {
    title: "Wildlife",
    image: "/tiger.jpg",
    count: "5 Parks",
  },
  {
    title: "Heritage",
    image: "/seegiriya.jpg",
    count: "8 Sites",
  },
  {
    title: "Nature", // Changed "Adventure" to "Nature" to match your data
    image: "/rafting.jpg", 
    count: "15 Activities",
  },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm">
            Find Your Style
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            // 2. Wrap in Link to pass query param
            <Link 
              key={index} 
              href={`/destinations?category=${cat.title}`}
              passHref
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer relative overflow-hidden rounded-2xl h-64 shadow-lg"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-1">{cat.title}</h3>
                  <p className="text-sm font-medium bg-orange-500/90 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {cat.count}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}