'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import PageHeader from "../../components/PageHeader"; 
import { MapPin, Filter, Loader2 } from "lucide-react";

export default function Destinations() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const resultsRef = useRef(null);
  
  // State for data and loading
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Fetch Data from MongoDB via API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        
        // --- FIX IS HERE ---
        // Your API returns { destinations: [...] }
        if (data.destinations) {
          setDestinations(data.destinations);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // 2. Memoize Categories based on fetched data
  const categories = useMemo(() => {
    if (loading) return ["All"];
    // Using Set to get unique tags
    return ["All", ...new Set(destinations.map((item) => item.tag))];
  }, [destinations, loading]);
  
  // 3. Filter Logic
  const filteredDestinations = useMemo(() => {
    return selectedCategory === "All"
      ? destinations
      : destinations.filter((place) => place.tag === selectedCategory);
  }, [selectedCategory, destinations]);

  // --- CUSTOM SMOOTH SCROLL ---
  const smoothScrollTo = (target, duration) => {
    const offset = 160; 
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      if (resultsRef.current) {
        setTimeout(() => {
          smoothScrollTo(resultsRef.current, 1200); 
        }, 100);
      }
    }
  }, [initialCategory]);

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHeader 
        title="Top Destinations" 
        subtitle="Explore the wonders of Sri Lanka."
        image="/carousel/ritipanna2.jpg" 
      />

      <div 
        ref={resultsRef} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-40"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-lg">
                <Filter className="w-5 h-5 text-orange-500" />
                Filters
              </div>
              
              {/* Category Buttons */}
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {loading ? (
                   // Simple Skeleton Loading for buttons
                   [1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse w-full"></div>)
                ) : (
                  categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left
                        ${selectedCategory === category 
                          ? "bg-orange-500 text-white shadow-md shadow-orange-200" 
                          : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-100"}
                      `}
                    >
                      {category}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE GRID */}
          <div className="flex-1">
             {loading ? (
               <div className="flex justify-center items-center h-64">
                 <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
               </div>
             ) : (
               <>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {filteredDestinations.map((place) => (
                     <div 
                       key={place._id} /* Use _id from MongoDB - Correct! */
                       className="group rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                     >
                        <div className="relative h-56 overflow-hidden">
                          <Image 
                            src={place.image} 
                            alt={place.name} 
                            fill 
                            className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wide z-10">
                            {place.tag}
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                             <MapPin className="w-4 h-4 text-orange-500" />
                             Sri Lanka
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description}</p>
                          <button className="w-full py-2 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition-colors">
                            View Details
                          </button>
                        </div>
                     </div>
                   ))}
                 </div>
                 
                 {filteredDestinations.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500">No destinations found for "{selectedCategory}".</p>
                        <button onClick={() => setSelectedCategory("All")} className="mt-4 text-orange-600 font-semibold hover:underline">
                          Show All
                        </button>
                    </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}