const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Gemini JSON-compatible feedback generator
const getInterviewFeedback = async (userAnswer) => {
  const prompt = `
You are an expert AI interview coach. I will give you a candidate's answer.

Please evaluate it and respond ONLY in the following JSON format:

{
  "clarity": number (0-10),
  "technicalDepth": number (0-10),
  "confidence": number (0-10),
  "feedback": "one-line summary suggestion"
}

Candidate's Answer:
${userAnswer}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    if (!response) {
      console.error("No response from Gemini API");
      return null;
    }

    const text = await response.text();
    console.log("Raw Gemini response:", text);

    // ✅ Try parsing Gemini output to JSON
    const parsed = JSON.parse(text);
    return parsed;

  } catch (err) {
    console.error("Gemini Error:", err.message);
    return null;
  }
};

module.exports = { getInterviewFeedback };
