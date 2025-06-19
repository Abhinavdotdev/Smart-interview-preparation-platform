import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:5000/api/resume/upload", formData);
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📄 Upload Your Resume</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze Resume
        </button>
      </form>

      {analysis && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">🔍 Analysis Result</h3>
          <p><strong>Score:</strong> {analysis.ResumeScore || analysis.resumeScore}/100</p>
          <p><strong>Strengths:</strong> {analysis.SummaryOfStrengths || analysis.strengths}</p>
          <p><strong>Suggestions:</strong> {analysis.SuggestionsForImprovement || analysis.suggestions}</p>
          <p><strong>Best Fit Roles:</strong> {analysis.JobRolesBestMatched || analysis.roles}</p>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
