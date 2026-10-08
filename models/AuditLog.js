import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  type: { type: String, enum: ['cv', 'linkedin'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);