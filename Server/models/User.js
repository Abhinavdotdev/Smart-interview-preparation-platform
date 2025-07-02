const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added required: true
  email: { type: String, required: true, unique: true }, // Added required: true
  password: { type: String, required: true }, // Added required: true
  streak: { type: Number, default: 0 },
  resumeScore: { type: Number, default: 0 },
  strengths: [String],
  weaknesses: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);