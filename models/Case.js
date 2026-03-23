  
const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  caseTitle: { type: String, required: true, trim: true },
  caseNumber: { type: String, required: true, unique: true },
  crimeNumber: { type: String, default: null },
  category: { type: String, required: true, enum: ["Cyber Crime","Theft","Murder","Bail Case","Kidnapping","Fraud","Assault","Drug Offense","Property Dispute","Other"] },
  court: { type: String, required: true },
  bench: { type: String, default: null },
  judge: { type: String, required: true },
  date: { type: Date, required: true },
  sections: { type: [String], default: [] },
  isBailCase: { type: Boolean, default: false },
  isMurder: { type: Boolean, default: false },
  isKidnapping: { type: Boolean, default: false },
  isCyberCrime: { type: Boolean, default: false },
  fullText: { type: String, required: true },
  summary: { type: String, default: null },
  summaryGeneratedAt: { type: Date, default: null },
}, { timestamps: true });

caseSchema.index({ category: 1 });
caseSchema.index({ date: -1 });

module.exports = mongoose.model("Case", caseSchema);