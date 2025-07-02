const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Route for file upload (used by ResumeUpload.jsx)
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Your Gemini AI analysis logic here for file
    const mockAnalysis = {
      ResumeScore: 85,
      SummaryOfStrengths: "Strong technical skills",
      SuggestionsForImprovement: "Add more achievements",
      JobRolesBestMatched: "Full Stack Developer"
    };

    res.json(mockAnalysis);
    
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// Route for text analysis (used by ResumeAnalyzer.jsx)
// Route for text analysis (used by ResumeAnalyzer.jsx)
router.post('/analyze-text', async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'No resume text provided' });
    }

    // Enhanced mock analysis with better structure
    const mockAnalysis = {
      score: Math.floor(Math.random() * 20) + 75, // Random score 75-95
      strengths: "Strong technical skills and relevant experience",
      suggestions: "Add more quantifiable achievements and industry keywords",
      roles: "Full Stack Developer, Software Engineer"
    };

    res.json(mockAnalysis);
    
  } catch (error) {
    console.error('Error analyzing resume text:', error);
    res.status(500).json({ error: 'Failed to analyze resume text' });
  }
});

module.exports = router;