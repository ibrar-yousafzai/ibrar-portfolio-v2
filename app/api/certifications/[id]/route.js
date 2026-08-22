import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const certification = await Certification.findByIdAndUpdate(id, body, { new: true });
  if (!certification) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(certification);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Certification.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
