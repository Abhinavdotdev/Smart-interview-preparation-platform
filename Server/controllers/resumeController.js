// controllers/resumeController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: "Resume text is required." });
  }

  try {
    const prompt = `
You are a resume reviewer AI. Given the resume text below, analyze and return a JSON object with:
{
  "score": 0 to 100,
  "strengths": "summary of strengths",
  "suggestions": "what can be improved",
  "bestFitRoles": "list of matching job roles"
}

Resume:
${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Extract JSON from Gemini response
    const jsonStart = text.indexOf("{");
    const json = text.slice(jsonStart);

    res.status(200).json(JSON.parse(json));
  } catch (err) {
    console.error("Resume analysis error:", err.message);
    res.status(500).json({ error: "Could not analyze resume." });
  }
};
