"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // 1. Import useSearchParams
import PageHeader from "../../components/PageHeader";
import { CheckCircle, Clock, Users, Loader2, Filter } from "lucide-react";

function PackagesContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 2. Get Search Inputs
  const searchDestination = searchParams.get("destination") || "";
  const searchGuests = searchParams.get("guests") || "";
  
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (data.packages) {
          setPackages(data.packages);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBook = async (pkg) => {
    if (!session) {
      alert("Please login to book a trip!");
      router.push("/login");
      return;
    }
    const confirm = window.confirm(`Do you want to book ${pkg.title} for ${pkg.price}?`);
    if (!confirm) return;

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

  // 3. THE SORTING LOGIC (Relevant Packages First)
  const sortedPackages = [...packages].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Normalize strings for comparison
    const destLower = searchDestination.toLowerCase();
    const guestStr = searchGuests.toString();

    // Check Package A
    if (destLower && (a.title.toLowerCase().includes(destLower) || a.description.toLowerCase().includes(destLower))) {
      scoreA += 10; // Big boost for destination match
    }
    if (searchGuests && a.group && a.group.includes(guestStr)) {
      scoreA += 5; // Medium boost for guest match
    }

    // Check Package B
    if (destLower && (b.title.toLowerCase().includes(destLower) || b.description.toLowerCase().includes(destLower))) {
      scoreB += 10;
    }
    if (searchGuests && b.group && b.group.includes(guestStr)) {
      scoreB += 5;
    }

    // Sort Descending (Highest score first)
    return scoreB - scoreA;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageHeader 
        title="Curated Travel Packages" 
        subtitle="Hand-picked experiences for the adventure of a lifetime."
        image="/carousel/elephant1.jpg" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        
        {/* Helper Banner if Searching */}
        {searchDestination && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex items-center gap-3">
            <Filter className="w-5 h-5 text-orange-600" />
            <p className="text-orange-800">
              Showing results for <strong>"{searchDestination}"</strong> 
              {searchGuests && <span> for <strong>{searchGuests} guests</strong></span>}.
              <br/>
              <span className="text-sm text-orange-600/80">Best matches are listed first.</span>
            </p>
          </div>
        )}

        {loading ? (
           <div className="flex justify-center items-center h-64">
             <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
           </div>
        ) : (
          sortedPackages.map((pkg, index) => {
            // Check if this is a "Top Match" (Has a score > 0)
            const isMatch = searchDestination && (
                pkg.title.toLowerCase().includes(searchDestination.toLowerCase()) || 
                pkg.description.toLowerCase().includes(searchDestination.toLowerCase())
            );

            return (
              <div 
                key={pkg._id} 
                className={`flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 
                ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}
                ${isMatch ? 'ring-2 ring-orange-400 ring-offset-4' : ''} 
                `}
              >
                
                {/* Image Side */}
                <div className="lg:w-2/5 h-64 lg:h-auto relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Match Badge */}
                  {isMatch && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      TOP MATCH
                    </div>
                  )}
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
                    <div className={`flex items-center gap-2 ${searchGuests && pkg.group && pkg.group.includes(searchGuests) ? "text-orange-600 font-bold" : ""}`}>
                      <Users className="w-5 h-5 text-orange-500" />
                      {pkg.group}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      Free Cancellation
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBook(pkg)}
                    className="self-start bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// 4. Wrap in Suspense to prevent Build Errors
export default function Packages() {
  return (
    <Suspense fallback={<div className="text-center pt-20">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}