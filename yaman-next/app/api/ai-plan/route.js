import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { destination, days, budget, interests } = await req.json();

    // 1. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 2. Construct the Prompt
    // We strictly ask for JSON so we can display it beautifully in the UI
    const prompt = `
      You are an expert travel guide for Sri Lanka.
      Plan a ${days}-day trip to ${destination}.
      Budget Level: ${budget}
      Interests: ${interests}

      Please provide a detailed itinerary in strict JSON format. 
      Do NOT add any markdown formatting (like \`\`\`json). Just return the raw JSON object.
      
      The JSON structure must be:
      {
        "tripTitle": "Catchy title for the trip",
        "summary": "A brief 2-sentence summary of what to expect",
        "itinerary": [
          {
            "day": 1,
            "theme": "Theme of the day (e.g., Culture & History)",
            "activities": [
              { "time": "Morning", "title": "Activity Name", "description": "Brief details" },
              { "time": "Afternoon", "title": "Activity Name", "description": "Brief details" },
              { "time": "Evening", "title": "Activity Name", "description": "Brief details" }
            ]
          }
          // ... repeat for all days
        ]
      }
    `;

    // 3. Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Clean and Parse JSON
    // Sometimes Gemini wraps JSON in markdown blocks, we remove them just in case
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { message: "Failed to generate itinerary" }, 
      { status: 500 }
    );
  }
}