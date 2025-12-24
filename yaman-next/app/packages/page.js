"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import { CheckCircle, Clock, Users } from "lucide-react";

// Content extracted from your Old version/Packages.html
const packages = [
  {
    id: 1,
    title: "Air Balloon - Dambulla",
    image: "/baloon.jpg", 
    description: "Soar above the stunning landscapes of Dambulla on a thrilling hot air balloon ride. Experience breathtaking views of ancient temples and lush greenery.",
    price: "$180",
    duration: "3 Hours",
    group: "2-10 People"
  },
  {
    id: 2,
    title: "Safari - Yala",
    image: "/safari.jpg",
    description: "Embark on an unforgettable wildlife adventure. Join expert guides on exhilarating safari drives to spot leopards, elephants, and crocodiles.",
    price: "$120",
    duration: "1 Day",
    group: "Private Jeep"
  },
  {
    id: 3,
    title: "Diving - Unawatuna",
    image: "/diving.jpg",
    description: "Discover the vibrant underwater world. Dive into crystal-clear waters teeming with colorful coral reefs, tropical fish, and shipwrecks.",
    price: "$90",
    duration: "4 Hours",
    group: "1 Person"
  },
  {
    id: 4,
    title: "Water Rafting - Kithulgala",
    image: "/waterrafting.jpg",
    description: "Brace yourself for an adrenaline-pumping experience as you navigate through the rushing rapids of the Kelani River.",
    price: "$60",
    duration: "5 Hours",
    group: "Min 4 People"
  },
  {
    id: 5,
    title: "Cultural Heritage - Sigiriya",
    image: "/sigiria.jpg",
    description: "Step back in time. Explore the ancient rock fortress, marvel at the frescoes, and wander through beautiful gardens.",
    price: "$50",
    duration: "Half Day",
    group: "Family Friendly"
  },
  {
    id: 6,
    title: "Beach Retreat - Mirissa",
    image: "/mirissa.jpg",
    description: "Unwind on golden beaches. Lounge under palm trees, enjoy surfing, or embark on a thrilling dolphin watching adventure.",
    price: "$150",
    duration: "2 Days",
    group: "Couple / Family"
  }
];

export default function Packages() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBook = async (pkg) => {
    // 1. Check Login
    if (!session) {
      alert("Please login to book a trip!");
      router.push("/login");
      return;
    }

    // 2. Confirm Action
    const confirm = window.confirm(`Do you want to book ${pkg.title} for ${pkg.price}?`);
    if (!confirm) return;

    // 3. Send to API
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: session.user.email,
          packageTitle: pkg.title,
          price: pkg.price,
          date: new Date().toLocaleDateString(), 
        }),
      });

      if (res.ok) {
        alert("Booking Successful! Check your profile.");
        router.push("/profile");
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageHeader 
        title="Curated Travel Packages" 
        subtitle="Hand-picked experiences for the adventure of a lifetime."
        image="/carousel/elephant1.jpg" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        {packages.map((pkg, index) => (
          <div key={pkg.id} className={`flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Image Side */}
            <div className="lg:w-2/5 h-64 lg:h-auto relative">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-gray-900">{pkg.title}</h3>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-lg">
                  {pkg.price}
                </span>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {pkg.description}
              </p>

              {/* Icons / Details */}
              <div className="flex gap-6 mb-8 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  {pkg.group}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  Free Cancellation
                </div>
              </div>

              {/* FIXED BUTTON HERE: Added onClick */}
              <button 
                onClick={() => handleBook(pkg)}
                className="self-start bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                Book This Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}