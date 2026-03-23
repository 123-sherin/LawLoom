  
const mongoose = require("mongoose");

const lawyerUploadSchema = new mongoose.Schema({
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caseTitle: { type: String, required: true, trim: true },
  caseNumber: { type: String, required: true },
  category: { type: String, required: true, enum: ["Cyber Crime","Theft","Murder","Bail Case","Kidnapping","Fraud","Assault","Drug Offense","Property Dispute","Other"] },
  court: { type: String, required: true },
  judge: { type: String, default: null },
  date: { type: Date, default: null },
  sections: { type: [String], default: [] },
  fullText: { type: String, required: true },
  lawyerNotes: { type: String, default: null },
  isPublic: { type: Boolean, default: false },
  lastEditedAt: { type: Date, default: null },
  editHistory: [{ editedAt: { type: Date }, changedFields: { type: [String] } }],
}, { timestamps: true });

module.exports = mongoose.model("LawyerUpload", lawyerUploadSchema);