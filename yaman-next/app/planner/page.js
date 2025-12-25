"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; // <--- 1. Import this
import PageHeader from "../../components/PageHeader";
import { Sparkles, Loader2, MapPin, Calendar, Wallet } from "lucide-react";

// We need to wrap the logic in a component to use searchParams safely in Next.js
function PlannerForm() {
  const searchParams = useSearchParams(); // <--- 2. Get the URL params
  
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  
  // Form States
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState("");

  // 3. This UseEffect catches the data from the Home Page Widget!
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
        body: JSON.stringify({ destination, days, budget, interests }),
      });

      const data = await res.json();
      if (res.ok) {
        setPlan(data);
      } else {
        alert("Failed to generate plan. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12">
        {/* --- INPUT FORM --- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12 animate-fade-in-up">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Destination */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Where to?</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ella, Sigiriya, Kandy" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Days */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">How many days?</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  min="1" max="14"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Budget</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <select 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none appearance-none bg-white"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option>Low (Backpacker)</option>
                  <option>Medium (Standard)</option>
                  <option>High (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Interests */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Interests (Optional)</label>
              <textarea 
                placeholder="e.g. Hiking, History, Food, Relaxing" 
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none h-24"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              ></textarea>
            </div>

            {/* Generate Button */}
            <div className="col-span-2">
              <button 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Generating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Plan My Trip
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* --- RESULTS DISPLAY --- */}
        {plan && (
          <div className="animate-fade-in-up space-y-8 mb-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">{plan.tripTitle}</h2>
              <p className="text-gray-600 mt-2">{plan.summary}</p>
            </div>

            <div className="grid gap-8">
              {plan.itinerary.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-xl">Day {day.day}</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{day.theme}</span>
                  </div>
                  <div className="p-6 space-y-6">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-24 flex-shrink-0 font-bold text-gray-400 text-right pt-1 text-sm">
                          {activity.time}
                        </div>
                        <div className="border-l-2 border-purple-100 pl-6 pb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{activity.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

// 4. Main Page Component wrapping the form with Suspense
export default function PlannerPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader 
        title="AI Trip Planner" 
        subtitle="Tell us where you want to go, and let AI build your perfect journey."
        image="/carousel/train.jpg" 
      />
      
      {/* Suspense is required when using useSearchParams in Next.js 13+ */}
      <Suspense fallback={<div className="text-center mt-20">Loading form...</div>}>
        <PlannerForm />
      </Suspense>
    </div>
  );
}