const express = require("express");
const router  = express.Router();
const Case    = require("../models/Case");
const User    = require("../models/User");

// GET /api/analytics/top-crimes
// Returns case count grouped by category, sorted descending
router.get("/top-crimes", async (req, res) => {
  try {
    const results = await Case.aggregate([
      { $group:   { _id: "$category", count: { $sum: 1 } } },
      { $sort:    { count: -1 } },
      { $limit:   10 },
      { $project: { _id: 0, name: "$_id", count: 1 } },
    ]);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/analytics/stats
// Returns total_cases, total_sections, total_users counts
router.get("/stats", async (req, res) => {
  try {
    const total_cases     = await Case.countDocuments();
    const categories      = await Case.distinct("category");

    // Count unique sections across all cases
    const sectResult = await Case.aggregate([
      { $unwind: "$sections" },
      { $group:  { _id: "$sections" } },
      { $count:  "total" },
    ]);
    const total_sections = sectResult[0]?.total || 0;

    let total_users = 0;
    try { total_users = await User.countDocuments(); } catch { /* ignore if User model not available */ }

    res.json({
      success: true,
      data: {
        total_cases,
        total_sections,
        total_users,
        total_categories: categories.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
