const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAIInterviewFeedback = async (req, res) => {
  const { userAnswer } = req.body;
  if (!userAnswer) return res.status(400).json({ error: "Answer is required." });

  const prompt = `
You are an expert AI interview evaluator.

Based on the candidate's answer, give the following in this exact JSON format:
{
  "clarity": "8/10",
  "technicalDepth": "7/10",
  "confidence": "9/10",
  "emoji": "🙂",
  "feedback": {
    "clarity": "Clearly articulated points.",
    "technicalDepth": "Covers basic concepts but lacks depth.",
    "confidence": "Shows confidence, slight hesitation noted."
  }
}

Candidate's Answer:
${userAnswer}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({ feedback: text });
  } catch (err) {
    console.error("Feedback error:", err.message);
    res.status(500).json({ error: "Feedback generation failed" });
  }
};
