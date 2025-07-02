const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", AnswerSchema);
