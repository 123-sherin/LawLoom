  
const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true, unique: true },
  summaryText: { type: String, required: true },
  generatedBy: { type: String, default: "groq-llama3-8b" },
  inputLength: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Summary", summarySchema);
