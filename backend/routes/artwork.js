// backend/routes/artwork.js
const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artworkController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");

// Protect this route with verifyToken
router.post(
  "/",
  upload.single("image"),
  artworkController.uploadArtwork
);
router.get("/search", artworkController.searchArtworks);

module.exports = router;
