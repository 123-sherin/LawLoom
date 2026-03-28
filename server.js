require("dotenv").config({ path: __dirname + "/.env" });
const express  = require("express");
const cors     = require("cors");
const path     = require("path");
const fs       = require("fs");
const connectDB = require("./config/db");
const app = express();

app.use(cors({ origin:"*", methods:["GET","POST","PUT","PATCH","DELETE"], allowedHeaders:["Content-Type","Authorization"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

["uploads/barcouncil","uploads/cases"].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

connectDB();

app.use("/api/auth",      require("./routes/authRoutes"));
app.use("/api/cases",     require("./routes/caseRoutes"));
app.use("/api/summary",   require("./routes/summaryRoutes"));
app.use("/api/sections",  require("./routes/sectionsRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Mounts both POST /api/upload-case  AND  GET /api/lawyer-uploads
app.use("/api", require("./routes/lawyerUploadRoutes"));

app.get("/", (req, res) => res.json({ message: "LawLoom Backend running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server on http://localhost:" + PORT));
