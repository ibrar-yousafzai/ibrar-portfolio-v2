import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const events = await Event.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(events);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const event = await Event.create(body);
  return NextResponse.json(event, { status: 201 });
}
