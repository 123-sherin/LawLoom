const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const multer  = require("multer");
const User    = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/barcouncil/"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ── REGISTER ──────────────────────────────────────────
// PDF is OPTIONAL for lawyers — HTML form does not have a PDF input
// Lawyers are auto-verified so they can log in immediately
router.post("/register", upload.single("barCouncilPDF"), async (req, res) => {
  try {
    const { name, email, password, role, barCouncilNumber } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email and password are required" });

    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    if (role === "lawyer" && !barCouncilNumber)
      return res.status(400).json({ message: "Bar Council Enrollment Number is required for lawyers" });

    const userData = {
      name:     name.trim(),
      email:    email.trim().toLowerCase(),
      password,
      role:     role || "user",
    };

    if (role === "lawyer") {
      userData.barCouncilNumber   = barCouncilNumber;
      userData.barCouncilPDF      = req.file ? req.file.path : null; // PDF is optional
      // Auto-verify for development — remove in production and add admin review
      userData.isVerified         = true;
      userData.verificationStatus = "approved";
    }

    const user = await User.create(userData);

    res.status(201).json({
      message: "Account created successfully.",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// ── LOGIN ─────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
