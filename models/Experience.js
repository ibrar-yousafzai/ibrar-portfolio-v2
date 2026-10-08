import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "BS Computer Science" or "Data Analyst Intern"
    organization: { type: String, required: true }, // e.g. university or company name
    type: { type: String, default: "Work" }, // Education / Work / Internship / Volunteer
    startDate: { type: String, default: "" }, // e.g. "2022" or "Jan 2024"
    endDate: { type: String, default: "Present" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
