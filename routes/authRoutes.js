  
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/barcouncil/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
router.post("/register", upload.single("barCouncilPDF"), async (req, res) => {
  try {
    const { name, email, password, role, barCouncilNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    if (role === "lawyer") {
      if (!barCouncilNumber) return res.status(400).json({ message: "Bar Council Number required" });
      if (!req.file) return res.status(400).json({ message: "Bar Council PDF required" });
    }

    const userData = { name, email, password, role: role || "user" };
    if (role === "lawyer") {
      userData.barCouncilNumber = barCouncilNumber;
      userData.barCouncilPDF = req.file.path;
      userData.isVerified = false;
      userData.verificationStatus = "pending";
    }

    const user = await User.create(userData);
    res.status(201).json({
      message: role === "lawyer" ? "Lawyer registered. Awaiting verification." : "User registered successfully.",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const warning = user.role === "lawyer" && !user.isVerified
      ? "Your Bar Council ID is still under review."
      : null;

    res.json({
      message: "Login successful",
      warning,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VERIFY LAWYER (you call this manually)
router.patch("/verify-lawyer/:userId", async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user || user.role !== "lawyer") return res.status(404).json({ message: "Lawyer not found" });

    user.verificationStatus = status;
    user.isVerified = status === "approved";
    await user.save();
    res.json({ message: `Lawyer ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;