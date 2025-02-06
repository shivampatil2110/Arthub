// backend/controllers/artworkController.js
const Artwork = require("../models/Artwork");

exports.uploadArtwork = async (req, res) => {
  try {
    const { title, description, price, medium, style, image } = req.body;
    // Assume the artist is taken from req.user (set by auth middleware)
    const artist = req.user ? req.user.id : null;
    if (!title || !price || !medium || !style || !image) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const artwork = new Artwork({
      title,
      description,
      price,
      image,
      medium,
      style,
      artist,
    });
    await artwork.save();
    res.status(201).json({ message: "Artwork uploaded successfully" });
  } catch (error) {
    console.error("Artwork upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.searchArtworks = async (req, res) => {
  try {
    // Query parameters: q (search query), medium, style, price-min, price-max
    const {
      q,
      medium,
      style,
      "price-min": priceMin,
      "price-max": priceMax,
    } = req.query;
    let filter = {};
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }
    if (medium) {
      filter.medium = medium;
    }
    if (style) {
      filter.style = style;
    }
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }
    const artworks = await Artwork.find(filter);
    res.status(200).json({ artworks });
  } catch (error) {
    console.error("Artwork search error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
