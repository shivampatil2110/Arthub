// backend/models/Promotion.js
const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Artist ID is required"],
    },
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: [true, "Artwork ID is required"],
    },
    title: {
      type: String,
      required: [true, "Promotion title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
