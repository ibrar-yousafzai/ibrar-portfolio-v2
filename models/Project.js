import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "" }, // e.g. "Environmental AI"
    status: { type: String, default: "Case study" }, // Live / Case study / In progress
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] }, // e.g. ["Python", "Regression", "EDA"]
    outcome: { type: String, default: "" }, // real metric/result line
    imageUrl: { type: String, default: "" },
    demoImages: { type: [String], default: [] },
    caseStudyUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
