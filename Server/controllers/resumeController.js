const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const resumeText = req.file.buffer.toString("utf8");

    const prompt = `
You are a resume reviewer AI. Given the resume text below, analyze and return:
1. Resume Score (out of 100)
2. Summary of strengths
3. Suggestions for improvement
4. Job roles best matched

Respond in JSON format.

Resume:
${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const jsonStart = text.indexOf("{");
    const json = text.slice(jsonStart);

    res.json(JSON.parse(json));
  } catch (err) {
    console.error("Resume analysis error:", err);
    res.status(500).json({ error: "Could not analyze resume." });
  }
};
