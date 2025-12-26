import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Destination from "@/models/Destination";

export async function GET() {
  try {
    await connectMongoDB();

    // 1. Clear old data to avoid duplicates
    await Destination.deleteMany({});

    // 2. Insert sample data
    const sampleDestinations = [
      {
        name: "Sigiriya",
        description: "An ancient rock fortress located in the northern Matale District near the town of Dambulla.",
        image: "/seegiriya.jpg", // Make sure this image exists in your public folder
        tag: "Heritage",
        location: "Matale",
        price: "$30"
      },
      {
        name: "Ella",
        description: "A small town in the Badulla District of Uva Province, it is approximately 200 kilometres east of Colombo.",
        image: "/carousel/train.jpg",
        tag: "Nature",
        location: "Ella",
        price: "$15"
      },
      {
        name: "Mirissa",
        description: "A small town on the south coast of Sri Lanka, located in the Matara District of the Southern Province.",
        image: "/carousel/ritipanna2.jpg",
        tag: "Beach",
        location: "Mirissa",
        price: "$20"
      }
    ];

    await Destination.insertMany(sampleDestinations);

    return NextResponse.json({ 
      message: "Database seeded successfully!", 
      count: sampleDestinations.length 
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}