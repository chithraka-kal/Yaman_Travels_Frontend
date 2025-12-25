import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Destination from "@/models/Destination";

// 1. CREATE A NEW DESTINATION
export async function POST(req) {
  try {
    // Destructure the fields matching your frontend data
    const { name, image, description, tag } = await req.json();
    
    await connectMongoDB();
    
    await Destination.create({ name, image, description, tag });
    
    return NextResponse.json({ message: "Destination Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating destination" }, { status: 500 });
  }
}

// 2. GET ALL DESTINATIONS (With Optional Filtering)
export async function GET(req) {
  try {
    // We check if there's a specific category requested in the URL
    // e.g. /api/destinations?category=Nature
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    await connectMongoDB();

    let query = {};
    
    // If a category is provided and it's not "All", filter by it
    if (category && category !== "All") {
      query = { tag: category };
    }

    // Fetch destinations. No userEmail filter needed since these are public.
    const destinations = await Destination.find(query);

    return NextResponse.json({ destinations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching destinations" }, { status: 500 });
  }
}