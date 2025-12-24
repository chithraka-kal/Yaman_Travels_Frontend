"use client";

import { useState } from "react";

export default function SearchWidget() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { destination, date, guests });
    // This is where we will eventually connect your AI Route Planner!
    alert(`Searching for trip to ${destination} on ${date} for ${guests} people.`);
  };

  return (
    // The -mt-20 pulls this box UP to overlap the carousel
    <div className="relative z-20 mx-auto max-w-5xl -mt-20 px-4 mb-12">
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          {/* Destination Input */}
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Where to?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search places (e.g. Ella)"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              When?
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-gray-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Guests Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Guests
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 mt-1 md:mt-0">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}