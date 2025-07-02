const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const { route } = require("./mockRoutes");

// Save a new answer
router.post("/", async (req, res) => {
  try {
    const answer = new Answer(req.body);
    await answer.save();
    res.status(201).json({ message: "Answer saved", data: answer });
  } catch (err) {
    console.error("❌ Error saving answer:", err);
    res.status(500).json({ message: "Failed to save answer" });
  }
});

// Optional: Get all answers
router.get("/", async (req, res) => {
  try {
    const answers = await Answer.find().sort({ createdAt: -1 });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch answers" });
  }
});

module.exports = route;
