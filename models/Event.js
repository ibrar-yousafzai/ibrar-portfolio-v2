import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, default: "" }, // Workshop / Hackathon / Community
    about: { type: String, default: "" },
    takeaway: { type: String, default: "" },
    certificateImageUrl: { type: String, default: "" },
    tags: { type: [String], default: [] },
    date: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
