const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Case = require("../models/Case");
const Summary = require("../models/Summary");
const { protect } = require("../middleware/auth");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1"
});

// ── Helpers ───────────────────────────────────────
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retries the Gemini call up to `retries` times on 429 errors
async function generateWithRetry(model, prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      const isRateLimit =
        err.message.includes("429") ||
        err.message.includes("quota") ||
        err.message.includes("retry");

      if (isRateLimit && attempt < retries) {
        console.warn(`⚠️ Gemini rate limit hit. Retrying in 15s... (attempt ${attempt}/${retries})`);
        await delay(15000); // wait 15 seconds before retrying
      } else {
        throw err; // rethrow on last attempt or non-rate-limit error
      }
    }
  }
}

// TEMP ROUTE - delete after use
router.get("/clear/all", async (req, res) => {
  await Summary.deleteMany({});
  res.json({ message: "All summaries cleared!" });
});

// GET OR GENERATE SUMMARY
// If summary exists in DB → return it (no Gemini call)
// If not → call Gemini, save it, return it
router.get("/:caseId", protect, async (req, res) => {
  try {
    const { caseId } = req.params;

    // ✅ Return cached summary — no Gemini call needed
    const existing = await Summary.findOne({ caseId });
    if (existing) {
      return res.json({
        source: "cached",
        summary: existing.summaryText,
        generatedAt: existing.createdAt,
      });
    }

    // Fetch case text
    const caseDoc = await Case.findById(caseId);
    if (!caseDoc) return res.status(404).json({ message: "Case not found" });
    if (!caseDoc.fullText) return res.status(400).json({ message: "No case text to summarize" });

    const textToSend = caseDoc.fullText.substring(0, 10000);

    // ✅ FIX: Use gemini-1.5-flash — much higher free tier quota than gemini-2.0-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a legal assistant. Summarize this Indian court judgment in simple English under 300 words. Include: parties involved, what the case is about, key facts, final verdict, and IPC sections applied.\n\nJUDGMENT:\n${textToSend}`;

    // ✅ FIX: Retry up to 3 times on rate limit before giving up
    const summaryText = await generateWithRetry(model, prompt, 3);

    // Save to DB so Gemini is never called again for this case
    await Summary.create({
      caseId,
      summaryText,
      generatedBy: "gemini-1.5-flash",
      inputLength: textToSend.length,
    });
    await Case.findByIdAndUpdate(caseId, {
      summary: summaryText,
      summaryGeneratedAt: new Date(),
    });

    res.json({ source: "generated", summary: summaryText, generatedAt: new Date() });

  } catch (error) {
    const isRateLimit =
      error.message.includes("429") ||
      error.message.includes("quota") ||
      error.message.includes("retry");

    if (isRateLimit) {
      return res.status(429).json({
        message: "Gemini API rate limit reached. Please wait a minute and try again.",
      });
    }

    res.status(500).json({ message: "Summary failed: " + error.message });
  }
});

module.exports = router;