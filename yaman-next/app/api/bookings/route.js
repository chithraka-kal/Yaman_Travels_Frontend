import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

// 1. CREATE A NEW BOOKING
export async function POST(req) {
  try {
    const { userEmail, packageTitle, price, date } = await req.json();
    await connectMongoDB();
    await Booking.create({ userEmail, packageTitle, price, date });
    return NextResponse.json({ message: "Booking Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}

// 2. GET BOOKINGS FOR A USER
export async function GET(req) {
  try {
    // Get the email from the URL query parameters (e.g. ?email=user@test.com)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    await connectMongoDB();
    
    // Find bookings for this specific email, sort by newest first
    const bookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });
    
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}