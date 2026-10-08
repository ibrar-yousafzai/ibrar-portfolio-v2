import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const projects = await Project.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(projects);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(body);
  return NextResponse.json(project, { status: 201 });
}
