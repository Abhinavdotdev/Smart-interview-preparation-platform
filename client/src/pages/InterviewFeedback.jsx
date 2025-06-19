import { useState } from "react";
import axios from "axios";

function InterviewFeedback() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!answer) return alert("Please enter your interview answer.");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai-feedback", {
        userAnswer: answer,
      });

      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      alert("AI feedback failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        Real-Time AI Interview Feedback
      </h2>

      <textarea
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Paste your interview answer here..."
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Evaluating..." : "Get Feedback"}
      </button>

      {feedback && (
        <div className="mt-6 bg-white p-4 shadow rounded border">
          <h3 className="text-xl font-semibold mb-2">AI Feedback:</h3>
          <pre className="whitespace-pre-wrap">{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default InterviewFeedback;
