const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.predictSelection = async (req, res) => {
  const { resume, jobRole } = req.body;
  if (!resume || !jobRole) {
    return res.status(400).json({ error: "Resume and job role are required." });
  }

  const prompt = `
You are a hiring manager. Based on the resume and the job role, estimate the chance of selection.

Provide:
1. Selection Chance in percentage
2. Short justification (highlight skills or gaps)
3. Advice to improve

Format your response like this:
{
  "chance": "78%",
  "justification": "Strong React skills but lacks backend experience",
  "advice": "Gain Node.js experience and complete 1-2 backend projects"
}

Resume:
${resume}

Job Role:
${jobRole}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Selection prediction error:", err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};
