import mongoose from "mongoose";

const FaqItemSchema = new mongoose.Schema(
	{
		question: { type: String, required: true },
		answer: { type: String, required: true },
		order: { type: Number, default: 0 },
		status: { type: String, default: "draft" },
	},
	{ timestamps: true }
);

export default mongoose.models.FaqItem || mongoose.model("FaqItem", FaqItemSchema);
