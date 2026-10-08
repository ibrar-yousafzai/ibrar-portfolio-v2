import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  await ContactSubmission.create({
    name,
    email,
    subject: (body.subject || "").trim().slice(0, 150),
    message: message.slice(0, 5000),
    source: (body.source || "").slice(0, 50),
  });

  return NextResponse.json({ ok: true, message: "Thanks — I'll get back to you soon." }, { status: 201 });
}