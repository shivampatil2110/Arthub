// backend/models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    buyerEmail: {
      type: String,
      required: [true, "Buyer email is required"],
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    // Reference to the purchased artwork
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    artworkTitle: {
      type: String,
      required: [true, "Artwork title is required"],
    },
    artworkArtist: {
      type: String,
      required: [true, "Artwork artist is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
