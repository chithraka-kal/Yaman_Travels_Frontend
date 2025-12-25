"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/carousel/elephant1.jpg", 
    title: "The Heart of Nature",
    subtitle: "Experience the untamed beauty of Sri Lanka's wildlife.",
    cta: "Explore Safaris",
    link: "/packages",
    align: "center", // <--- 1. Center Align
  },
  {
    id: 2,
    image: "/carousel/train.jpg", 
    title: "Scenic Train Journeys",
    subtitle: "Ride through the misty mountains of Ella.",
    cta: "View Tours",
    link: "/packages",
    align: "left",   // <--- 2. Left Align
  },
  {
    id: 3,
    image: "/carousel/seegiriya.jpg", 
    title: "Ancient Wonders",
    subtitle: "Climb the fortress in the sky.",
    cta: "Discover History",
    link: "/packages",
    align: "right",  // <--- 3. Right Align
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover opacity-60" // Darker overlay for better text contrast
            />
            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>

          {/* Content Container - Dynamic Alignment */}
          <div className={`relative z-10 flex h-full flex-col justify-center px-6 sm:px-16 lg:px-24
            ${
              slide.align === "center"
                ? "items-center text-center"
                : slide.align === "right"
                ? "items-end text-right"
                : "items-start text-left" // Default to Left
            }
          `}>
            
            {/* Title: Reduced weight from extrabold to bold */}
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl drop-shadow-lg leading-tight max-w-3xl">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-lg text-gray-200 sm:text-xl md:text-2xl drop-shadow-md max-w-2xl">
              {slide.subtitle}
            </p>

            {/* Button */}
            <Link
              href={slide.link}
              className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white transition-transform hover:bg-orange-600 hover:scale-105 shadow-xl"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}