const express = require("express");
const router = express.Router();
// You can remove the axios import if it's no longer used anywhere else in this file.
// const axios = require("axios"); 
const { GoogleGenerativeAI } = require("@google/generative-ai"); // <-- Make sure you have installed this: npm install @google/generative-ai

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Initialize the Gemini AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Get the generative model
    // Using gemini-1.5-flash-latest as seen in your Google AI Studio Quickstart
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Generate content
    const result = await model.generateContent(prompt);
    const responseText = await result.response;
    const text = responseText.text(); // Extract the text from the response

    res.json({ text });
  } catch (err) {
    // Improved error logging for SDK errors
    console.error("Gemini API Error:", err.message);
    if (err.response && err.response.data) {
      console.error("Gemini API Full Error Response:", err.response.data);
    } else if (err.status && err.details) {
         console.error("Gemini API Full Error Object:", JSON.stringify(err, null, 2));
    }
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

module.exports = router;