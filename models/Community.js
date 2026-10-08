import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    memberInfo: { type: String, default: "" },
    blurb: { type: String, default: "" },
    joinUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Community || mongoose.model("Community", CommunitySchema);
