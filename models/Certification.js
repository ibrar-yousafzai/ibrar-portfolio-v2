import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    group: { type: String, required: true }, // e.g. "Google", "Cybersecurity"
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    year: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model("Certification", CertificationSchema);
