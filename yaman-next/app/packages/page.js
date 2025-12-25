"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import { CheckCircle, Clock, Users, Loader2 } from "lucide-react";

export default function Packages() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // State for data and loading
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Packages from API
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
        {loading ? (
           <div className="flex justify-center items-center h-64">
             <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
           </div>
        ) : (
          packages.map((pkg, index) => (
            <div key={pkg._id} className={`flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
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
          ))
        )}
      </div>
    </div>
  );
}