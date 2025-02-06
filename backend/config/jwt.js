// backend/config/jwt.js
module.exports = {
  secret: process.env.JWT_SECRET || "your_jwt_secret",
  expiresIn: "1d", // Token expiration (e.g., 1 day)
};
