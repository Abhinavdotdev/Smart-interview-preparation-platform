import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume content.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/analyze-resume", {
        resume: resumeText,
      });
      setAnalysis(res.data.result); // your backend sends { result: "..." }
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Resume Strength Analyzer</h2>
      
      <textarea
        rows={10}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {analysis && (
        <div className="mt-6 bg-white shadow p-4 rounded border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">AI Resume Analysis:</h3>
          <pre className="whitespace-pre-wrap text-gray-800">{analysis}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
