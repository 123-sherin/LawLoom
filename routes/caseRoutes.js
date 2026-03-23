const express = require("express");
const router = express.Router();
const Case = require("../models/Case");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const cases = await Case.find(filter).select("-fullText").sort({ date: -1 });
    res.json({ cases });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const caseDoc = await Case.findById(req.params.id);
    if (!caseDoc) return res.status(404).json({ message: "Case not found" });
    res.json(caseDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

