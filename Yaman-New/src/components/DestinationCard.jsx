import React, { useState, useEffect, useRef } from 'react';
import img1 from '../assets/seegiriya.jpg';

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
  const maxIndex = totalCards; // we scroll to the clones, then jump back

  // Start auto scroll
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setIsTransitioning(true);
    }, 5000);
  };

  // Initial start
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Handle looping logic
  useEffect(() => {
    if (currentIndex === maxIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // Wait for transition
    }
  }, [currentIndex]);

  // Reset interval when currentIndex changes
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
    <div className="px-6 py-12 max-w-[1300px] mx-auto">
      <div className="mb-8">
        <p className="text-orange-500 font-semibold text-sm">WHAT WE SERVE</p>
        <h2 className="text-3xl font-bold mt-2 mb-4 leading-tight">
          We Provide Top <br /> Destinations
        </h2>
        <div className="flex justify-between items-start">
          <p className="text-gray-600 max-w-lg">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts.
          </p>
          <div className="flex items-center m-4 mt-0 h-10 justify-center space-x-4 text-gray-400 text-6xl">
            <button onClick={handlePrev} className="hover:text-black transition">&#8592;</button>
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="hover:text-black transition"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex space-x-6"
          style={getTransformStyle()}
        >
          {extendedDestinations.map((item, index) => (
            <div
              key={index}
              className="shrink-0"
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[33rem] object-cover rounded-md"
                />
                
                <div className="absolute bottom-0 left-0 w-full h-[25%] left-0 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white px-5 py-20 rounded-b-md">
  <h3 className="text-lg font-bold">{item.title}</h3>
  <p className="text-sm">{item.location}</p>
</div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalCards - VISIBLE_CARDS + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentIndex % totalCards ? 'bg-orange-500' : 'bg-orange-200'}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationCard;
