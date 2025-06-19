import React, { useState } from "react";
import axios from "axios";

const MockInterview = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEmoji = (score) => {
    const rating = parseInt(score);
    if (rating >= 9) return "🔥";
    if (rating >= 7) return "😊";
    if (rating >= 5) return "😐";
    return "😟";
  };

  const handleSubmit = async () => {
    if (!question || !answer) return alert("Please enter both fields.");

    setLoading(true);
    try {
      const res = await axios.post("/api/mock/mock-interview", {
        question,
        answer,
      });
      setResult(JSON.parse(res.data.result));
    } catch (error) {
      console.error(error);
      alert("Error getting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Mock Interview</h2>

      <textarea
        placeholder="Enter Interview Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        rows={2}
      />
      <textarea
        placeholder="Your Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        rows={5}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">AI Feedback:</h3>
          <p>
            <strong>Clarity:</strong> {result.clarity} {getEmoji(result.clarity)}
          </p>
          <p>
            <strong>Technical Depth:</strong> {result.technicalDepth}{" "}
            {getEmoji(result.technicalDepth)}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}{" "}
            {getEmoji(result.confidence)}
          </p>
          <p className="mt-2">
            <strong>Suggestions:</strong> {result.feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
