import { useState } from "react";
import axios from "axios";

function SelectionPredictor() {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async () => {
    if (!resumeText || !jobRole) {
      alert("Please provide both resume and job role.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/predict-selection", {
        resume: resumeText,
        jobRole,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Error predicting selection chance.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Selection Chance Predictor</h2>

      <input
        type="text"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        placeholder="Enter desired job role (e.g., Frontend Developer)"
        className="w-full border p-3 mb-4 rounded"
      />

      <textarea
        rows={10}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume content here..."
        className="w-full border p-3 mb-4 rounded"
      />

      <button
        onClick={handlePrediction}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Predicting..." : "Predict Selection Chance"}
      </button>

      {result && (
        <div className="mt-6 bg-white shadow p-4 rounded border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Prediction Result:</h3>
          <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default SelectionPredictor;
