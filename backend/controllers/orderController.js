// backend/controllers/orderController.js
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const artworkId = req.params.artworkId; // Artwork ID should be provided in the URL

    // Validate required fields
    if (!shippingAddress || !paymentMethod || !artworkId) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Assume buyer information is available via req.user (set by authentication middleware)
    const buyerEmail = req.user ? req.user.email : "buyer@example.com";

    // In a production app, you would fetch artwork details (title, artist, price) by artworkId.
    // For demonstration purposes, we'll use dummy values.
    const order = new Order({
      buyerEmail,
      shippingAddress,
      paymentMethod,
      artworkId,
      artworkTitle: "Sample Artwork Title",
      artworkArtist: "Sample Artist",
      price: 100, // Dummy price value
    });

    await order.save();
    res.status(200).json({ message: "Artwork purchased successfully" });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOrdersByBuyer = async (req, res) => {
  try {
    const buyerEmail = req.query.email;
    if (!buyerEmail) {
      return res.status(400).json({ error: "Buyer email is required." });
    }

    const orders = await Order.find({ buyerEmail }).sort({ orderDate: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
