import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		priceText: { type: String, default: "" },
		billingNote: { type: String, default: "" },
		features: { type: [String], default: [] },
		highlighted: { type: Boolean, default: false },
		order: { type: Number, default: 0 },
		status: { type: String, default: "draft" },
	},
	{ timestamps: true }
);

export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
