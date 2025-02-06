// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // Attach the decoded payload (e.g., user ID, isArtist flag) to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = {
  verifyToken,
};
