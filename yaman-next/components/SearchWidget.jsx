"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, MapPin, Calendar, Users, Wallet, Clock } from "lucide-react";

export default function SearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search"); // 'search' or 'ai'

  // Form States
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Medium");

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === "search") {
      const query = new URLSearchParams({ destination, date, guests }).toString();
      router.push(`/packages?${query}`);
    } else {
      const query = new URLSearchParams({ destination, days, budget }).toString();
      router.push(`/planner?${query}`);
    }
  };

  return (
    <div className="relative z-20 mx-auto max-w-5xl -mt-28 px-4 mb-16">
      
      {/* --- 1. FIXED SLIDING TABS (GRID SYSTEM) --- */}
      <div className="flex justify-center mb-4">
        <div className="relative grid grid-cols-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/10 w-[340px]">
          
          {/* The Sliding White Background */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${activeTab === "search" ? "translate-x-0 left-1.5" : "translate-x-full left-1.5"}`}
          />

          {/* Tab 1: Search */}
          <button
            onClick={() => setActiveTab("search")}
            className={`relative z-10 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-500 ${
              activeTab === "search" ? "text-orange-600" : "text-white hover:text-gray-200"
            }`}
          >
            <Search className="w-4 h-4" /> Find Packages
          </button>

          {/* Tab 2: AI Planner */}
          <button
            onClick={() => setActiveTab("ai")}
            className={`relative z-10 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-500 ${
              activeTab === "ai" ? "text-purple-600" : "text-white hover:text-gray-200"
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Trip Planner
          </button>
        </div>
      </div>

      {/* --- 2. THE WIDGET BOX (MORPHING CONTAINER) --- */}
      <div 
        className={`rounded-3xl shadow-2xl p-6 md:p-8 border overflow-hidden transition-all duration-500 ease-in-out
          ${activeTab === 'search' 
            ? 'bg-white border-white/50 shadow-orange-500/10' 
            : 'bg-white/95 border-purple-100 shadow-purple-500/20'
          }`}
      >
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          
          {/* STATIC FIELD: DESTINATION */}
          <div className="md:col-span-4 space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-500 ${activeTab === 'ai' ? 'text-purple-500' : 'text-orange-500'}`}>
              <MapPin className="w-4 h-4" /> Where to?
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ella, Sigiriya"
              className={`w-full p-4 rounded-2xl border outline-none font-bold text-gray-700 transition-all duration-500
                ${activeTab === 'ai' 
                  ? 'bg-purple-50/50 focus:ring-2 focus:ring-purple-500 border-purple-100 placeholder-purple-300' 
                  : 'bg-gray-50 focus:ring-2 focus:ring-orange-500 border-gray-100 placeholder-gray-400'}`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* DYNAMIC FIELDS - USING CSS OPACITY TRANSITION INSTEAD OF MOUNT/UNMOUNT */}
          {/* We keep the layout identical to prevent jumping */}
          
          {/* Middle Field */}
          <div className="md:col-span-3 space-y-2">
            <div className="relative h-[86px]"> {/* Fixed height container to prevent jumps */}
                
                {/* Layer 1: Date (Search Mode) */}
                <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === 'search' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 -z-10'}`}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-orange-500" /> Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-600"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Layer 2: Duration (AI Mode) */}
                <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === 'ai' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 -z-10'}`}>
                    <label className="text-xs font-bold text-purple-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" /> Duration
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1" max="14"
                            className="w-full p-4 bg-purple-50/50 rounded-2xl border border-purple-100 focus:ring-2 focus:ring-purple-500 outline-none font-bold text-gray-700"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                        />
                        <span className="absolute right-4 top-4 text-sm text-gray-400 font-bold">Days</span>
                    </div>
                </div>

            </div>
          </div>

          {/* Right Field */}
          <div className="md:col-span-2 space-y-2">
            <div className="relative h-[86px]">
                
                {/* Layer 1: Guests (Search Mode) */}
                <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === 'search' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 -z-10'}`}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-orange-500" /> Guests
                    </label>
                    <select
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                    >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3-5">3-5 Group</option>
                        <option value="5+">5+ Large</option>
                    </select>
                </div>

                 {/* Layer 2: Budget (AI Mode) */}
                 <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === 'ai' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 -z-10'}`}>
                    <label className="text-xs font-bold text-purple-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Wallet className="w-4 h-4" /> Budget
                    </label>
                    <select
                        className="w-full p-4 bg-purple-50/50 rounded-2xl border border-purple-100 focus:ring-2 focus:ring-purple-500 outline-none font-bold text-gray-700"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="md:col-span-3">
             {/* We use a fixed height div to align bottom with inputs */}
             <div className="h-[58px] relative">
                <button
                type="submit"
                className={`absolute inset-0 w-full font-bold text-lg rounded-2xl shadow-lg transition-all duration-500 flex items-center justify-center gap-2 transform active:scale-95
                    ${activeTab === "search"
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-200"
                    }`}
                >
                {activeTab === "search" ? (
                    <>
                    <Search className="w-5 h-5" /> Search
                    </>
                ) : (
                    <>
                    <Sparkles className="w-5 h-5" /> Plan Trip
                    </>
                )}
                </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}