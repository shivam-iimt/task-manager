const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, default: null },
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } }
);

module.exports = mongoose.model("User", userSchema);
