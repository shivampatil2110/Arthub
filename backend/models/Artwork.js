// backend/models/Artwork.js
const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    medium: {
      type: String,
      required: [true, "Medium is required"],
    },
    style: {
      type: String,
      required: [true, "Style is required"],
    },
    // Reference to the artist who uploaded the artwork
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artwork", ArtworkSchema);
