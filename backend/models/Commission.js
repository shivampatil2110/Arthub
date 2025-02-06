const mongoose = require("mongoose");

const CommissionSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: [true, "Buyer name is required"],
    },
    buyerEmail: {
      type: String,
      required: [true, "Buyer email is required"],
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Artist ID is required"],
    },
    commissionDescription: {
      type: String,
      required: [true, "Commission description is required"],
    },
    commissionRate: {
      type: Number,
      required: [true, "Commission rate is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commission", CommissionSchema);
