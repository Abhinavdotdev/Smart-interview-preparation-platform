import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, RotateCcw, Trophy } from 'lucide-react';

const BackendInterview = () => {
  const [selectedTech, setSelectedTech] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const techs = {
    nodejs: {
      name: 'Node.js',
      icon: '🟢',
      questions: [
        "What is Node.js and what makes it different from traditional server-side technologies?",
        "Explain callback hell and how to avoid it with Promises/async-await.",
        "What's the difference between process.nextTick() and setImmediate()?",
        "How would you handle file uploads in Node.js?",
        "Explain clustering in Node.js and when to use it."
      ]
    },
    express: {
      name: 'Express.js',
      icon: '⚡',
      questions: [
        "What is Express.js and its key features?",
        "Explain middleware in Express.js with examples.",
        "How would you implement authentication in Express?",
        "What's the difference between app.use() and app.get()?",
        "How do you handle errors in Express applications?"
      ]
    },
    mongodb: {
      name: 'MongoDB',
      icon: '🍃',
      questions: [
        "What is MongoDB and how does it differ from relational databases?",
        "Explain MongoDB aggregation pipeline with an example.",
        "What are indexes in MongoDB and why are they important?",
        "How would you model relationships in MongoDB?",
        "Explain sharding in MongoDB and when to use it."
      ]
    },
    mysql: {
      name: 'MySQL',
      icon: '🐬',
      questions: [
        "Explain different types of JOINs in MySQL with examples.",
        "What are ACID properties in database transactions?",
        "Explain database normalization and the first three normal forms.",
        "How would you optimize a slow MySQL query?",
        "What's the difference between MyISAM and InnoDB?"
      ]
    },
    django: {
      name: 'Django',
      icon: '🎸',
      questions: [
        "What is Django and its key principles?",
        "Explain Django's ORM and how to create models.",
        "What is Django middleware and how to create custom middleware?",
        "How does Django handle authentication and authorization?",
        "Explain Django's caching framework."
      ]
    },
    java: {
      name: 'Java',
      icon: '☕',
      questions: [
        "What are the main OOP principles in Java?",
        "Explain the difference between ArrayList and LinkedList.",
        "What is multithreading and how do you handle synchronization?",
        "Explain Spring Framework and its core concepts.",
        "How does garbage collection work in Java?"
      ]
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      finishInterview();
    }
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = (tech) => {
    setSelectedTech(tech);
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(1800);
    setIsActive(true);
    setShowResults(false);
    setCurrentAnswer('');
  };

  const nextQuestion = () => {
    setAnswers({ ...answers, [currentQ]: currentAnswer });
    setCurrentAnswer('');
    
    if (currentQ < techs[selectedTech].questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    setAnswers({ ...answers, [currentQ]: currentAnswer });
    setIsActive(false);
    setShowResults(true);
  };

  const calculateScore = () => {
    const answered = Object.keys(answers).length;
    const total = techs[selectedTech].questions.length;
    return Math.round((answered / total) * 100);
  };

  const reset = () => {
    setSelectedTech('');
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(1800);
    setIsActive(false);
    setShowResults(false);
    setCurrentAnswer('');
  };

  // Technology Selection Screen
  if (!selectedTech) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Backend Interview Simulator</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(techs).map(([key, tech]) => (
              <div
                key={key}
                onClick={() => startInterview(key)}
                className="bg-white/10 backdrop-blur p-6 rounded-xl cursor-pointer hover:bg-white/20 transition-all border border-white/20"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-300 text-sm mb-4">5 questions • 30 minutes</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full">
                  Start Interview
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white">Interview Complete!</h1>
              <p className="text-gray-300">{techs[selectedTech].name}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{score}%</div>
                <div className="text-gray-300">Score</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{Object.keys(answers).length}</div>
                <div className="text-gray-300">Answered</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{formatTime(1800 - timeLeft)}</div>
                <div className="text-gray-300">Time Used</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {techs[selectedTech].questions.map((question, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Q{index + 1}: {question}</h3>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-gray-300 text-sm">
                      {answers[index] || "No answer provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Try Another
              </button>
              <button
                onClick={() => startInterview(selectedTech)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg border border-white/20"
              >
                Retake
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interview Screen
  const tech = techs[selectedTech];
  const question = tech.questions[currentQ];
  const progress = ((currentQ + 1) / tech.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{tech.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-white">{tech.name}</h1>
                <p className="text-gray-300">Question {currentQ + 1} of {tech.questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-purple-400 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">{question}</h2>
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Write your detailed answer here..."
            className="w-full h-48 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-300 text-sm">{currentAnswer.length} characters</span>
            <button
              onClick={nextQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              {currentQ === tech.questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        {/* Question Progress */}
        <div className="flex gap-2 justify-center">
          {tech.questions.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index === currentQ
                  ? 'bg-purple-600 text-white'
                  : answers[index]
                  ? 'bg-green-600 text-white'
                  : 'bg-white/20 text-gray-300'
              }`}
            >
              {answers[index] ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackendInterview;