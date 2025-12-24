import PageHeader from "../../components/PageHeader";
import { MapPin } from "lucide-react";

// Data derived from your old files + placeholders
const allDestinations = [
  {
    id: 1,
    name: "Sigiriya",
    image: "/seegiriya.jpg", // Make sure these match your public folder
    description: "Explore the ancient rock fortress and the 'Heavenly Maidens' frescoes.",
    tag: "Heritage"
  },
  {
    id: 2,
    name: "Ella",
    image: "/carousel/train.jpg",
    description: "Famous for the Nine Arch Bridge, hiking trails, and stunning mountain views.",
    tag: "Nature"
  },
  {
    id: 3,
    name: "Mirissa",
    image: "/beach1.jpg",
    description: "The best place for whale watching, surfing, and relaxing on golden sands.",
    tag: "Beach"
  },
  {
    id: 4,
    name: "Yala National Park",
    image: "/carousel/elephant1.jpg",
    description: "Home to the highest density of leopards in the world and majestic elephants.",
    tag: "Wildlife"
  },
  {
    id: 5,
    name: "Galle Fort",
    image: "/gall.jpg", // Ensure image exists
    description: "A historic dutch fort with charming streets, cafes, and ocean views.",
    tag: "City"
  },
  {
    id: 6,
    name: "Nuwara Eliya",
    image: "/kandy.jpg", // Using kandy placeholder if nuwara eliya missing
    description: "Little England of Sri Lanka, surrounded by tea plantations and waterfalls.",
    tag: "Hill Country"
  }
];

export default function Destinations() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Header */}
      <PageHeader 
        title="Top Destinations" 
        subtitle="Explore the wonders of Sri Lanka, from misty mountains to golden beaches."
        image="/carousel/ritipanna2.jpg" 
      />

      {/* 2. Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((place) => (
            <div key={place.id} className="group rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wide">
                  {place.tag}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                   <MapPin className="w-4 h-4 text-orange-500" />
                   Sri Lanka
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{place.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {place.description}
                </p>
                <button className="w-full py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}