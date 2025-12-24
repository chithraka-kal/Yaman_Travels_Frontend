"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"; // I added lucide-react icons for a cleaner look

// If you don't have lucide-react installed, run: npm install lucide-react
// Or you can replace these with your existing SVG icons.

const destinations = [
  {
    id: 1,
    image: "/seegiriya.jpg",
    title: "Ancient Sigiriya",
    location: "Dambulla, Sri Lanka",
    price: "$150",
  },
  {
    id: 2,
    image: "/carousel/elephant1.jpg",
    title: "Yala Safari",
    location: "Yala National Park",
    price: "$200",
  },
  {
    id: 3,
    image: "/carousel/ritipanna2.jpg",
    title: "Coastal Fishing",
    location: "Galle, Sri Lanka",
    price: "$80",
  },
  {
    id: 4,
    image: "/carousel/train.jpg",
    title: "Ella Train Ride",
    location: "Ella, Sri Lanka",
    price: "$50",
  },
  {
    id: 5,
    image: "/beach1.jpg", // Ensure this image is in /public or change path
    title: "Mirissa Beach",
    location: "Mirissa, Sri Lanka",
    price: "$120",
  },
];

export default function DestinationCard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Width of one card
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="py-16 bg-white relative">
      <div className="mx-auto max-w-[1300px] px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm">
              Top Destinations
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">
              Explore Top <br /> Attractions
            </h2>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 hidden sm:flex">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Container (Hide Scrollbar) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] snap-center group relative cursor-pointer"
            >
              {/* Image Card */}
              <div className="h-[450px] rounded-2xl overflow-hidden shadow-lg relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1 text-orange-300 text-sm font-medium mb-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t border-white/20 pt-4 mt-2">
                    <span className="text-lg font-semibold">{item.price} <span className="text-xs font-normal">/ person</span></span>
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">Book Now</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}