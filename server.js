const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// ── Middleware ───────────────────────────────────────
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Create upload folder if it doesn't exist ─────────
if (!fs.existsSync("uploads/barcouncil")) {
  fs.mkdirSync("uploads/barcouncil", { recursive: true });
}

// ── Connect to MongoDB ───────────────────────────────
connectDB();

// ── Routes ───────────────────────────────────────────
app.use("/api/auth",           require("./routes/authRoutes"));
app.use("/api/cases",          require("./routes/caseRoutes"));
app.use("/api/summary",        require("./routes/summaryRoutes"));
app.use("/api/lawyer-uploads", require("./routes/lawyerUploadRoutes"));

// ── Health check ─────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "LawApp Backend is running ✅" });
});

// ── Start Server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
