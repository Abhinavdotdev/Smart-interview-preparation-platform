// src/pages/DSA.jsx
import React, { useState } from "react";

// import { getInterviewFeedback } from "../utils/gemini";




function DSA() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const questions = [
    "Explain the difference between stack and queue.",
    "What is the time complexity of binary search?",
    "How does a hash table work?",
  ];

  const handleSubmit = async () => {
    if (!answer || !selectedQuestion) return alert("Select question and write an answer!");
    try {
      const response = await fetch("http://localhost:5000/api/mock/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: selectedQuestion, answer }),
      });
      const data = await response.json();
      setFeedback(data.result); // Expected: clarity, depth, confidence
    } catch (err) {
      setFeedback("❌ Error fetching feedback");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">DSA Interview Questions</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select a Question:</label>
        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select --</option>
          {questions.map((q, i) => (
            <option key={i} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Your Answer:</label>
        <textarea
          rows="5"
          className="w-full border rounded p-2"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get AI Feedback
      </button>

      {feedback && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold mb-2">AI Feedback:</h3>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(feedback, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DSA;
