// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import configuration and middleware
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { verifyToken } = require("./middlewares/authMiddleware");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());

// Serve static files (e.g., uploaded images)
app.use("/uploads", express.static("uploads"));

// Import route files
const authRoutes = require("./routes/auth");
const artworkRoutes = require("./routes/artwork");
const orderRoutes = require("./routes/order");
const commissionRoutes = require("./routes/commission");
// const promotionRoutes = require("./routes/promotion");

// Public routes (do not require authentication)
app.use("/api/v1/auth", authRoutes);

// Protected routes (require a valid JWT)
// You can apply verifyToken globally on these routes:
app.use("/api/v1/artworks", verifyToken, artworkRoutes);
app.use("/api/v1/orders", verifyToken, orderRoutes);
app.use("/api/v1/commissions", verifyToken, commissionRoutes);
// app.use("/api/v1/promotions", verifyToken, promotionRoutes);

// Global error handling middleware (should be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
