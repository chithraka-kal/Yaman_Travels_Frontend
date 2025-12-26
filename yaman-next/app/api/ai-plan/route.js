import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { from, destination, days, budget, interests } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ 1. Use the working Lite model & Enable JSON Mode
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", 
      generationConfig: { responseMimeType: "application/json" } 
    });

    // ✅ 2. Cleaned up prompt (Removed "no markdown" instructions as JSON mode handles it)
    const prompt = `
      You are an expert travel planner for Sri Lanka.
      Plan a ${days}-day trip to ${destination} starting from ${from}.
      Budget Level: ${budget}
      Interests: ${interests}

      Structure:
      {
        "tripTitle": "Catchy Trip Name",
        "summary": "2 sentence summary",
        "routeInfo": { 
           "distance": "e.g., 200km", 
           "travelTime": "e.g., 5 hours",
           "startCoordinates": [lat, lng],
           "endCoordinates": [lat, lng]
        },
        "itinerary": [
          {
            "day": 1,
            "theme": "Day Theme",
            "activities": [
              { "time": "Morning", "title": "Place", "description": "Short info", "coordinates": [lat, lng] }
            ]
          }
        ],
        "suggestions": [
           {
             "title": "Name of a specific activity/package related to this trip", 
             "rating": 4.8, 
             "price": "$50", 
             "image": "Real Unsplash URL for this specific activity",
             "description": "One sentence marketing hook"
           },
           { "title": "Another Package", "rating": 4.5, "price": "$...", "image": "...", "description": "..." } 
           // Give exactly 3 suggestions
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    
    // ✅ 3. Parse directly (No regex needed thanks to JSON mode)
    const plan = JSON.parse(result.response.text());
    
    return NextResponse.json(plan);

  } catch (error) {
    console.error("AI Plan Error:", error);
    return NextResponse.json({ message: "Failed to generate plan" }, { status: 500 });
  }
}