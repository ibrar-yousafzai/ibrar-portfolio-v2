import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "Opportunity" }, // Free Course / Opportunity / Workshop / Update
    description: { type: String, default: "" },
    linkUrl: { type: String, default: "" },
    linkLabel: { type: String, default: "Learn more" },
    date: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
