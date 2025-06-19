const { GoogleGenerativeAI } = require("@google/generative-ai");

// Instantiate with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Main Function
const getInterviewFeedback = async (userAnswer) => {
  const prompt = `
You are an expert AI interview coach. I will give you a candidate's response to an interview question.

Please evaluate the answer and provide:
1. Clarity Score out of 10 – How clearly did the candidate express their thoughts?
2. Technical Depth Score out of 10 – How technically strong and in-depth was their explanation?
3. Confidence Score out of 10 – Based on the tone and flow, how confident does the candidate sound?
4. Emoji Feedback Summary:
   - 😃 Excellent
   - 🙂 Good
   - 😐 Average
   - 😟 Needs Improvement

Also include:
5. One-line Feedback for each of the above categories.

---
Candidate's Answer: 
${userAnswer}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (err) {
    console.error("Error from Gemini API:", err.message);
    return "Feedback could not be generated. Please try again.";
  }
};

module.exports = { getInterviewFeedback };
