const express = require("express");
const router = express.Router();
const { getAIInterviewFeedback } = require("../controllers/feedbackController");

router.post("/ai-feedback", getAIInterviewFeedback);

module.exports = router;
