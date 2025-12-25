"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import { Sparkles, Loader2, ChevronLeft, ChevronRight, Star, X, MapPin, Calendar, Wallet, Navigation, Heart } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for the Map component
const TripMap = dynamic(() => import("../../components/TripMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

function PlannerForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [activeDay, setActiveDay] = useState(1);

  // Inputs
  const [from, setFrom] = useState("Colombo");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    const paramDest = searchParams.get("destination");
    const paramDays = searchParams.get("days");
    const paramBudget = searchParams.get("budget");
    if (paramDest) setDestination(paramDest);
    if (paramDays) setDays(paramDays);
    if (paramBudget) setBudget(paramBudget);
  }, [searchParams]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch("/api/ai-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, destination, days, budget, interests }),
      });
      const data = await res.json();
      if (res.ok) {
        setPlan(data);
        setActiveDay(1);
      }
    } catch (error) {
      alert("Error generating plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {/* 1. INPUT FORM (Shows when no plan exists) */}
      {!plan && (
         <div className="min-h-screen flex flex-col bg-white">
            {/* Header Image */}
            <PageHeader title="AI Planner" subtitle="Design your perfect trip in seconds." image="/carousel/train.jpg" />
            
            {/* Form Container - Floating over header */}
            <div className="flex-1 w-full max-w-4xl mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
                   
                   <div className="text-center mb-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">
                        AI-Powered Travel Agent
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Where will you go next?
                      </h1>
                   </div>

                   <form onSubmit={handleGenerate} className="space-y-6">
                      
                      {/* Row 1: Route */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Starting From</label>
                              <div className="relative">
                                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                  type="text" 
                                  required 
                                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 font-bold text-gray-800 transition-all outline-none" 
                                  placeholder="e.g. Colombo"
                                  value={from} 
                                  onChange={(e) => setFrom(e.target.value)}
                                />
                              </div>
                          </div>

                          <div className="relative group">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Destination</label>
                              <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                  type="text" 
                                  required 
                                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 font-bold text-gray-800 transition-all outline-none" 
                                  placeholder="e.g. Ella"
                                  value={destination} 
                                  onChange={(e) => setDestination(e.target.value)}
                                />
                              </div>
                          </div>
                      </div>

                      {/* Row 2: Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Duration</label>
                             <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                  type="number" 
                                  min="1" max="14"
                                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 font-bold text-gray-800 transition-all outline-none" 
                                  value={days} 
                                  onChange={(e) => setDays(e.target.value)}
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">Days</span>
                             </div>
                          </div>

                          <div className="relative group">
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Budget</label>
                             <div className="relative">
                                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <select 
                                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 font-bold text-gray-800 transition-all outline-none appearance-none cursor-pointer" 
                                  value={budget} 
                                  onChange={(e) => setBudget(e.target.value)}
                                >
                                   <option>Low (Backpacker)</option>
                                   <option>Medium (Standard)</option>
                                   <option>High (Luxury)</option>
                                </select>
                             </div>
                          </div>
                      </div>

                      {/* Row 3: Interests */}
                      <div className="relative group">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Specific Interests (Optional)</label>
                          <div className="relative">
                            <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                              type="text" 
                              placeholder="e.g. Hiking, History, Local Food, Relaxing" 
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 font-bold text-gray-800 transition-all outline-none" 
                              value={interests} 
                              onChange={(e) => setInterests(e.target.value)}
                            />
                          </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button 
                          disabled={loading} 
                          className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-orange-500 hover:to-orange-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6" />} 
                            <span className="text-lg">{loading ? "Designing Your Trip..." : "Generate My Itinerary"}</span>
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                          AI-generated plans may vary. Customize your trip later.
                        </p>
                      </div>

                   </form>
                </div>
            </div>
         </div>
      )}

      {/* 2. DASHBOARD (Inline, not fixed modal) */}
      {plan && (
        <div className="pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Navigation / Header context */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span className="font-semibold text-orange-600">AI Planner</span>
                        <span>/</span>
                        <span>{destination}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">{plan.tripTitle}</h1>
                    <p className="text-sm text-gray-500 mt-1">{plan.routeInfo?.distance} • {plan.routeInfo?.travelTime} Travel</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button onClick={() => setPlan(null)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        Edit Search
                    </button>
                    <button className="px-6 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-lg transition-transform hover:scale-105">
                        Save Trip
                    </button>
                </div>
            </div>

            {/* MAIN DASHBOARD CARD */}
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
                    
                    {/* --- LEFT COLUMN: MAP + SUGGESTIONS --- */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col border-r border-gray-100 bg-gray-50 relative">
                        
                        {/* 1. MAP AREA (Flexible height) */}
                        <div className="flex-1 relative w-full overflow-hidden">
                            <TripMap routeInfo={plan.routeInfo} itinerary={plan.itinerary} activeDay={activeDay} />
                            
                            {/* Floating "Current View" Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 z-[500]">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-50 p-2.5 rounded-lg shrink-0 border border-orange-100">
                                        <MapPin className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current View</p>
                                        <p className="text-sm font-bold text-gray-900 line-clamp-1">Day {activeDay}: {plan.itinerary[activeDay - 1]?.theme}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. SUGGESTIONS AREA (Fixed height at bottom) */}
                        <div className="h-[320px] bg-white border-t border-gray-200 flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 sticky top-0">
                                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Recommended Nearby</h4>
                            </div>
                            <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {plan.suggestions?.map((pkg, index) => (
                                    <div key={index} className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-white hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 relative">
                                            <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pkg.title} />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <h5 className="font-bold text-gray-900 text-sm truncate">{pkg.title}</h5>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-xs font-bold">{pkg.rating}</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-500">{pkg.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: ITINERARY --- */}
                    <div className="col-span-1 lg:col-span-7 bg-white h-full flex flex-col overflow-hidden">
                        
                        {/* Day Navigation */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
                            <button 
                                onClick={() => setActiveDay(Math.max(1, activeDay - 1))}
                                disabled={activeDay === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            
                            <div className="text-center">
                                <h3 className="text-xl font-black text-gray-900">Day {activeDay}</h3>
                                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-1">{plan.itinerary[activeDay - 1]?.theme}</p>
                            </div>

                            <button 
                                onClick={() => setActiveDay(Math.min(days, activeDay + 1))}
                                disabled={activeDay == days}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Scrollable Timeline Area */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10">
                            <div className="relative">
                                {/* The Grey Timeline Line - Absolute position relative to the container */}
                                <div className="absolute left-[120px] top-4 bottom-4 w-0.5 bg-gray-100 hidden md:block"></div>

                                <div className="space-y-12">
                                    {plan.itinerary[activeDay - 1]?.activities.map((act, i) => {
                                        let timeLabel = "Morning"; 
                                        const hour = parseInt(act.time.split(':')[0]);
                                        if (hour >= 12) timeLabel = "Afternoon";
                                        if (hour >= 17) timeLabel = "Evening";

                                        return (
                                            <div key={i} className="relative flex flex-col md:flex-row gap-6 md:gap-0 group">
                                                
                                                {/* 1. Time Column (Left) */}
                                                <div className="md:w-[120px] flex flex-col items-start md:items-end md:pr-8 md:text-right shrink-0">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block md:hidden lg:block">{timeLabel}</span>
                                                    <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md">{act.time.split(' ')[0]}</span>
                                                </div>

                                                {/* 2. Dot/Line Column (Center - Hidden on Mobile) */}
                                                <div className="hidden md:flex flex-col items-center justify-start w-0 relative z-10">
                                                     <div className="w-4 h-4 rounded-full bg-white border-[3px] border-orange-500 shadow-sm mt-1.5 group-hover:scale-125 transition-transform duration-300"></div>
                                                </div>

                                                {/* 3. Content Column (Right) */}
                                                <div className="flex-1 md:pl-10">
                                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-default">
                                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{act.title}</h4>
                                                        <p className="text-gray-600 text-sm leading-relaxed">{act.description}</p>
                                                        
                                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-4 text-xs font-semibold text-gray-500">
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                                <span>1.5 hrs</span>
                                                            </div>
                                                            <span>•</span>
                                                            <span>Outdoor</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-10 h-10 animate-spin text-gray-300" /></div>}>
      <PlannerForm />
    </Suspense>
  );
}