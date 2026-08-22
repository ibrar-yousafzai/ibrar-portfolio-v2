import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  let settings = await SiteSettings.findOne({ key: "main" });
  if (!settings) {
    settings = await SiteSettings.create({ key: "main" });
  }
  return NextResponse.json(settings);
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const settings = await SiteSettings.findOneAndUpdate({ key: "main" }, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(settings);
}
