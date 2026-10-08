import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const experiences = await Experience.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(experiences);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const experience = await Experience.create(body);
  return NextResponse.json(experience, { status: 201 });
}
