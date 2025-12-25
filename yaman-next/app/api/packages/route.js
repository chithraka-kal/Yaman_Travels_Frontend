import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Package from "@/models/Package";

// 1. GET ALL PACKAGES
export async function GET() {
  try {
    await connectMongoDB();
    const packages = await Package.find({});
    return NextResponse.json({ packages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching packages" }, { status: 500 });
  }
}

// 2. CREATE A PACKAGE (For seeding data)
export async function POST(req) {
  try {
    const { title, image, description, price, duration, group } = await req.json();
    await connectMongoDB();
    await Package.create({ title, image, description, price, duration, group });
    return NextResponse.json({ message: "Package Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating package" }, { status: 500 });
  }
}