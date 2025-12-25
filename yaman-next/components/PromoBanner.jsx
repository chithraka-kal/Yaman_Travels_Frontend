"use client";

import { motion } from "framer-motion";
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/carousel/ritipanna2.jpg')", // Ensure this path is correct
          backgroundAttachment: "fixed", // This creates the parallax effect
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Dark Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Explore Sri Lanka's <br/> Hidden Gems
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            Book your "Cultural Triangle" package this month and get a free guided village tour. Experience the authentic island life.
          </p>
          <Link href={`/packages`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl">
            View Packages
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}