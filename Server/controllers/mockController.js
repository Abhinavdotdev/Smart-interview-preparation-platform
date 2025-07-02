const { getInterviewFeedback } = require("../utils/gemini");

exports.handleMockInterview = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required." });
  }

  try {
    const combinedAnswer = `Question: ${question}\nAnswer: ${answer}`;
    const result = await getInterviewFeedback(combinedAnswer);

    console.log("Gemini AI Feedback:", result); // ✅ for debugging

    res.json({ result });
  } catch (err) {
    console.error("Mock interview error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
