import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css"; // update the path as needed


import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [resumeScore, setResumeScore] = useState(78);
  const [practiceStreak, setPracticeStreak] = useState(4);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const chartData = [
    { area: "DSA", score: 8 },
    { area: "React", score: 9 },
    { area: "HR", score: 6 },
    { area: "Backend", score: 5 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">👋 Welcome to your Dashboard</h1>
      <p className="mb-4">Let’s start preparing for interviews smartly!</p>

      {/* Strength Areas Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Your Strength Areas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Resume Score Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Resume Score</h2>
        <div className="flex items-center space-x-4">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{
              background: resumeScore >= 80 ? "green" : resumeScore >= 60 ? "orange" : "red",
            }}
          >
            {resumeScore}%
          </div>
          <p>
            Your resume is {resumeScore >= 80 ? "excellent!" : resumeScore >= 60 ? "good" : "needs improvement"}.
          </p>
        </div>
      </div>

      {/* Practice Streak Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Daily Practice Streak</h2>
        <p className="text-lg">
          🔥 You've practiced for <span className="font-bold text-blue-600">{practiceStreak}</span> days in a row!
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
