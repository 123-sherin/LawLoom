  
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const verifiedLawyerOnly = (req, res, next) => {
  if (req.user && req.user.role === "lawyer" && req.user.isVerified) {
    next();
  } else {
    return res.status(403).json({ message: "Only verified lawyers can do this." });
  }
};

module.exports = { protect, verifiedLawyerOnly };