import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const items = await CaseStudy.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(items);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const item = await CaseStudy.create(body);
  return NextResponse.json(item, { status: 201 });
}
