const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    course: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,

      required: function () {
        return this.role === "student";
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    // Verification Selfie
    selfie: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);