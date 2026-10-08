import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const experience = await Experience.findByIdAndUpdate(id, body, { new: true });
  if (!experience) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(experience);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
