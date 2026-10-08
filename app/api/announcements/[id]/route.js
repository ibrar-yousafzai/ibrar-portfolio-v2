import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const announcement = await Announcement.findByIdAndUpdate(id, body, { new: true });
  if (!announcement) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(announcement);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Announcement.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
