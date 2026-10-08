import mongoose from "mongoose";

const RagTypeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		explanation: { type: String, default: "" },
		bestFor: { type: String, default: "" },
		whenNotToUse: { type: String, default: "" },
		advanced: { type: Boolean, default: false },
		order: { type: Number, default: 0 },
		status: { type: String, default: "draft" },
	},
	{ timestamps: true }
);

export default mongoose.models.RagType || mongoose.model("RagType", RagTypeSchema);
