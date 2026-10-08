import mongoose from "mongoose";

const CaseStudySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		summary: { type: String, default: "" },
		tags: { type: [String], default: [] },
		linkUrl: { type: String, default: "" },
		isTodoPlaceholder: { type: Boolean, default: false },
		order: { type: Number, default: 0 },
		status: { type: String, default: "draft" },
	},
	{ timestamps: true }
);

export default mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
