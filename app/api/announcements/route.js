import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const announcements = await Announcement.find({}).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(announcements);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const announcement = await Announcement.create(body);
  return NextResponse.json(announcement, { status: 201 });
}
