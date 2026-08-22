import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const event = await Event.findByIdAndUpdate(id, body, { new: true });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
