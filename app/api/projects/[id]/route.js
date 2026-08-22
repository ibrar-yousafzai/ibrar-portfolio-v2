import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

function normalizeProjectPayload(body) {
  const demoImages = Array.isArray(body?.demoImages)
    ? body.demoImages.map((image) => String(image).trim()).filter(Boolean)
    : [];
  const imageUrl = String(body?.imageUrl || demoImages[0] || "").trim();

  return {
    ...body,
    imageUrl,
    demoImages: demoImages.length ? demoImages : imageUrl ? [imageUrl] : [],
  };
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(id, normalizeProjectPayload(body), { new: true });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
