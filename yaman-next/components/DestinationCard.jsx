"use client"; 

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Removed image import, using string path
const img1 = "/seegiriya.jpg";

const destinations = [
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
  { image: img1, title: 'Enjoy the beauty of Maldives', location: 'Maldives, Republic Maldives' },
];

const CARD_WIDTH = 400;
const GAP = 24;
const VISIBLE_CARDS = 3;

const DestinationCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const totalCards = destinations.length;
  const extendedDestinations = [...destinations, ...destinations.slice(0, VISIBLE_CARDS)];
  const maxIndex = totalCards;

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setIsTransitioning(true);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (currentIndex === maxIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);
    }
  }, [currentIndex]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const getTransformStyle = () => {
    return {
      transform: `translateX(-${(CARD_WIDTH + GAP) * currentIndex}px)`,
      transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none',
      width: `${(CARD_WIDTH + GAP) * extendedDestinations.length}px`,
    };
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalCards);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalCards - 1);
      }, 20);
    } else {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleDotClick = (i) => {
    setIsTransitioning(true);
    setCurrentIndex(i);
  };

  return (
    <div className="px-6 py-12 max-w-[1300px] mx-auto overflow-hidden">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-orange-500 font-semibold text-sm">WHAT WE SERVE</p>
        <h2 className="text-3xl font-bold mt-2 mb-4 leading-tight">
          We Provide Top <br /> Destinations
        </h2>
        {/* ... controls ... */}
         <div className="flex justify-between items-start">
          <p className="text-gray-600 max-w-lg">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...
          </p>
          <div className="flex items-center m-4 mt-0 h-10 justify-center space-x-4 text-gray-400 text-6xl">
            <motion.button
              whileHover={{ x: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={handlePrev}
              className="hover:text-black transition"
            >
              &#8592;
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="hover:text-black transition"
            >
              &#8594;
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div
          className="flex space-x-6"
          style={getTransformStyle()}
        >
          {extendedDestinations.map((item, index) => (
            <motion.div
              key={index}
              className="shrink-0"
              style={{ width: `${CARD_WIDTH}px` }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <img
                  src={item.image} // using string path directly
                  alt={item.title}
                  className="w-full h-[33rem] object-cover rounded-md"
                />
                <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white px-5 py-20 rounded-b-md">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center mt-6 space-x-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {Array.from({ length: totalCards - VISIBLE_CARDS + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentIndex % totalCards ? 'bg-orange-500' : 'bg-orange-200'}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DestinationCard;