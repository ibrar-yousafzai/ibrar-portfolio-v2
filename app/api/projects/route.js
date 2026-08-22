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

export async function GET() {
  await connectDB();
  const projects = await Project.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(projects);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(normalizeProjectPayload(body));
  return NextResponse.json(project, { status: 201 });
}
