"use client";

import { Carousel, Typography, Button } from "@material-tailwind/react";
import Link from "next/link"; 

export function CarouselWithContent() {
  return (
    <Carousel
      // carousel settings
      autoplay={true}
      loop={true}
      autoplayDelay={6000}
      transition={{ duration: 0.8 }} 
      className="h-[85vh] w-full overflow-hidden" 
      
      // Custom Navigation Dots (Bottom center)
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-3">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-10 bg-orange-500" : "w-4 bg-white/60"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* --- SLIDE 1: ELEPHANT --- */}
      <div className="relative h-full w-full">
        {/* Background Image */}
        <img
          src="/carousel/elephant1.jpg"
          alt="Elephant in Sri Lanka"
          className="h-full w-full object-cover" 
        />
        
        {/* Gradient Overlay (Darker at bottom for text readability) */}
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-gradient-to-t from-black/80 via-black/30 to-black/30">
          <div className="w-3/4 text-center md:w-2/4 pt-12">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
            >
              The Heart of <br/> <span className="text-orange-500">Nature</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-90 text-lg md:text-xl font-light"
            >
              Experience the untamed beauty of Sri Lanka's wildlife. 
              From the gathering of elephants to the leopards of Yala.
            </Typography>
            <div className="flex justify-center gap-4">
              <Button size="lg" color="orange" className="shadow-orange-500/20 hover:scale-105 transition-transform">
                Explore Safaris
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE 2: FISHING (CULTURE) --- */}
      <div className="relative h-full w-full">
        <img
          src="/carousel/ritipanna2.jpg"
          alt="Stilt Fishing"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/40">
          <div className="w-3/4 pl-8 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-4xl md:text-5xl lg:text-6xl font-black"
            >
              Timeless <br/> <span className="text-blue-400">Traditions</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-90 text-lg md:text-xl font-light"
            >
              Immerse yourself in a culture that has thrived for thousands of years.
              Discover the iconic stilt fishermen at sunset.
            </Typography>
            <div className="flex gap-4">
               <Button size="lg" color="white" className="text-gray-900 hover:bg-gray-200">
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE 3: TRAIN (ADVENTURE) --- */}
      <div className="relative h-full w-full">
        <img
          src="/carousel/train.jpg"
          alt="Ella Train"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
          <div className="w-full pb-20 pl-8 md:pl-20 lg:pl-32 pr-8">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-4xl md:text-5xl lg:text-6xl font-black"
            >
              Journeys <br/> Beyond <span className="text-green-400">Roads</span>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-10 opacity-90 text-lg md:text-xl font-light max-w-2xl"
            >
              Take the world's most scenic train ride through the misty tea plantations of Ella.
            </Typography>
             <Button size="lg" color="green" className="shadow-green-500/20">
                Book Tickets
              </Button>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default CarouselWithContent;