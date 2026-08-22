import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export const dynamic = "force-dynamic";

// Increments and returns the live visitor count. Called once per page load
// from the public site's client component.
export async function POST() {
  await connectDB();
  const doc = await Visitor.findOneAndUpdate(
    { key: "main" },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return NextResponse.json({ count: doc.count });
}

// Read-only fetch, used by the admin dashboard so viewing it doesn't
// itself count as a visit.
export async function GET() {
  await connectDB();
  const doc = await Visitor.findOne({ key: "main" });
  return NextResponse.json({ count: doc?.count || 0 });
}
