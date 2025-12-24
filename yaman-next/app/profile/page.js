"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Fixed duplicate import
import PageHeader from "../../components/PageHeader";
import { User, Mail, LogOut, MapPin, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; 
  }

  useEffect(() => {
    if (session?.user?.email) {
      const fetchBookings = async () => {
        try {
          const res = await fetch(`/api/bookings?email=${session.user.email}`);
          const data = await res.json();
          setBookings(data.bookings);
        } catch (error) {
          console.log("Error loading bookings", error);
        }
      };
      fetchBookings();
    }
  }, [session]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageHeader 
        title="My Dashboard" 
        subtitle={`Welcome back, ${session.user.name}!`}
        image="/carousel/elephant1.jpg" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: User Card --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center sticky top-24">
              <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-4xl font-bold mb-4 border-4 border-white shadow-lg">
                {session.user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{session.user.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{session.user.email}</p>

              <div className="border-t border-gray-100 py-6 space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Traveler Account</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">{session.user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Sri Lanka</span>
                </div>
              </div>

              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold py-3 px-4 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Content Area --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Trips</p>
                {/* Fixed: Show real booking count */}
                <p className="text-3xl font-bold text-gray-900 mt-2">{bookings.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Saved Places</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Reviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
            </div>

            {/* 2. Recent Activity - Updated to show Real Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-lg">My Bookings</h3>
              </div>
              
              <div className="p-6">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                          <h4 className="font-bold text-gray-900">{booking.packageTitle}</h4>
                          <p className="text-sm text-gray-500">Booked on: {booking.date}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                          <span className="font-bold text-gray-700">{booking.price}</span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Empty State
                  <div className="text-center py-8">
                    <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-orange-500" />
                    </div>
                    <h4 className="text-gray-900 font-bold mb-2">No trips booked yet</h4>
                    <button 
                      onClick={() => router.push('/packages')}
                      className="mt-4 text-orange-500 font-bold hover:underline"
                    >
                      Start Browsing
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}