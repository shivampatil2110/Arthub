// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isArtist: {
      type: Boolean,
      default: false,
    },
    // Additional fields for artist profile (optional if the user is not an artist)
    profile: {
      bio: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
      socialLinks: {
        type: [String],
        default: [],
      },
      profilePicture: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
