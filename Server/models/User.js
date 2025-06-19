const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  streak: { type: Number, default: 0 },
  resumeScore: { type: Number, default: 0 },
  strengths: [String],
  weaknesses: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
