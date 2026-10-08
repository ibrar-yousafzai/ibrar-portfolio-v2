import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FaqItem from "@/models/FaqItem";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const item = await FaqItem.findByIdAndUpdate(id, body, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await FaqItem.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
