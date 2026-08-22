import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const certifications = await Certification.find({}).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(certifications);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const certification = await Certification.create(body);
  return NextResponse.json(certification, { status: 201 });
}
