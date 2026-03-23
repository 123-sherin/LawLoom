 const express = require("express");
const router = express.Router();
const LawyerUpload = require("../models/LawyerUpload");
const { protect, verifiedLawyerOnly } = require("../middleware/auth");

// CREATE — upload new case
router.post("/", protect, verifiedLawyerOnly, async (req, res) => {
  try {
    const upload = await LawyerUpload.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json({ message: "Case uploaded successfully", upload });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ — get my uploads
router.get("/", protect, verifiedLawyerOnly, async (req, res) => {
  try {
    const uploads = await LawyerUpload.find({ uploadedBy: req.user._id })
      .select("-fullText")
      .sort({ createdAt: -1 });
    res.json({ count: uploads.length, uploads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE
router.get("/:id", protect, verifiedLawyerOnly, async (req, res) => {
  try {
    const upload = await LawyerUpload.findById(req.params.id);
    if (!upload) return res.status(404).json({ message: "Not found" });
    if (upload.uploadedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });
    res.json(upload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", protect, verifiedLawyerOnly, async (req, res) => {
  try {
    const upload = await LawyerUpload.findById(req.params.id);
    if (!upload) return res.status(404).json({ message: "Not found" });
    if (upload.uploadedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    const allowed = ["caseTitle","caseNumber","category","court","judge","date","sections","fullText","lawyerNotes","isPublic"];
    allowed.forEach(f => { if (req.body[f] !== undefined) upload[f] = req.body[f]; });

    upload.lastEditedAt = new Date();
    upload.editHistory.push({ editedAt: new Date(), changedFields: Object.keys(req.body) });
    await upload.save();

    res.json({ message: "Updated successfully", upload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", protect, verifiedLawyerOnly, async (req, res) => {
  try {
    const upload = await LawyerUpload.findById(req.params.id);
    if (!upload) return res.status(404).json({ message: "Not found" });
    if (upload.uploadedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    await LawyerUpload.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
