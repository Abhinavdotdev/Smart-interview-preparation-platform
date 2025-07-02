import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, Trophy, Code, BookOpen, Zap, Target } from 'lucide-react';

const DSA = () => {
  const [selectedTopic, setSelectedTopic] = useState('arrays');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [solved, setSolved] = useState(new Set());
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const topics = {
    arrays: { name: 'Arrays', icon: '🔢', color: 'bg-blue-500' },
    strings: { name: 'Strings', icon: '🔤', color: 'bg-green-500' },
    linkedlist: { name: 'Linked Lists', icon: '🔗', color: 'bg-purple-500' },
    trees: { name: 'Trees', icon: '🌳', color: 'bg-yellow-500' },
    graphs: { name: 'Graphs', icon: '🕸️', color: 'bg-red-500' },
    dp: { name: 'Dynamic Programming', icon: '⚡', color: 'bg-indigo-500' }
  };

  const questions = {
    arrays: [
      {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        template: "function twoSum(nums, target) {\n    // Your code here\n    \n}",
        testCases: [
          { input: [[2,7,11,15], 9], expected: [0,1] },
          { input: [[3,2,4], 6], expected: [1,2] }
        ]
      },
      {
        title: "Maximum Subarray",
        difficulty: "Medium",
        description: "Find the contiguous subarray with the largest sum.",
        example: "Input: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6",
        template: "function maxSubArray(nums) {\n    // Your code here\n    \n}",
        testCases: [
          { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
          { input: [[1]], expected: 1 }
        ]
      }
    ],
    strings: [
      {
        title: "Valid Palindrome",
        difficulty: "Easy",
        description: "Check if a string is a palindrome, considering only alphanumeric characters.",
        example: "Input: 'A man, a plan, a canal: Panama'\nOutput: true",
        template: "function isPalindrome(s) {\n    // Your code here\n    \n}",
        testCases: [
          { input: ["A man, a plan, a canal: Panama"], expected: true },
          { input: ["race a car"], expected: false }
        ]
      }
    ]
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = () => {
    try {
      const question = questions[selectedTopic][currentQuestion];
      const func = new Function('return ' + userCode)();
      
      let passed = 0;
      const results = question.testCases.map(test => {
        try {
          const result = func(...test.input);
          const isCorrect = JSON.stringify(result) === JSON.stringify(test.expected);
          if (isCorrect) passed++;
          return { passed: isCorrect, input: test.input, expected: test.expected, got: result };
        } catch (e) {
          return { passed: false, error: e.message };
        }
      });

      setTestResults({ passed, total: question.testCases.length, results });
      
      if (passed === question.testCases.length) {
        setSolved(prev => new Set([...prev, `${selectedTopic}-${currentQuestion}`]));
        setIsRunning(false);
      }
    } catch (e) {
      setTestResults({ error: e.message });
    }
  };

  const startPractice = () => {
    setIsRunning(true);
    setTimeSpent(0);
    setTestResults(null);
    setUserCode(questions[selectedTopic][currentQuestion].template);
  };

  const currentQ = questions[selectedTopic]?.[currentQuestion];
  const isQuestionSolved = solved.has(`${selectedTopic}-${currentQuestion}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DSA Practice Arena
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{solved.size} Solved</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">{formatTime(timeSpent)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Topics
              </h2>
              <div className="space-y-3">
                {Object.entries(topics).map(([key, topic]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTopic(key);
                      setCurrentQuestion(0);
                      setTestResults(null);
                      setUserCode('');
                    }}
                    className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedTopic === key
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{topic.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{topic.name}</div>
                        <div className="text-xs text-gray-400">
                          {questions[key]?.length || 0} problems
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {currentQ ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Problem Statement */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{currentQ.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        currentQ.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        currentQ.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {currentQ.difficulty}
                      </span>
                      {isQuestionSolved && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description:</h4>
                      <p className="text-gray-300 leading-relaxed">{currentQ.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <pre className="bg-black/30 p-4 rounded-lg text-sm font-mono text-green-400">
                        {currentQ.example}
                      </pre>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={startPractice}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <Target className="w-5 h-5" />
                        Start Practice
                      </button>
                      
                      <div className="flex gap-2">
                        {questions[selectedTopic].map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentQuestion(idx)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                              idx === currentQuestion
                                ? 'bg-blue-500 text-white'
                                : solved.has(`${selectedTopic}-${idx}`)
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Code Editor
                    </h4>
                    <button
                      onClick={runCode}
                      disabled={!userCode.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-4 h-4" />
                      Run Code
                    </button>
                  </div>
                  
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your solution here..."
                    className="w-full h-64 bg-black/30 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-gray-500"
                  />

                  {testResults && (
                    <div className="mt-4 p-4 bg-black/30 rounded-lg">
                      {testResults.error ? (
                        <div className="text-red-400">
                          <strong>Error:</strong> {testResults.error}
                        </div>
                      ) : (
                        <div>
                          <div className={`font-medium mb-2 ${
                            testResults.passed === testResults.total ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {testResults.passed}/{testResults.total} test cases passed
                          </div>
                          {testResults.passed === testResults.total && (
                            <div className="flex items-center gap-2 text-green-400">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Solution Accepted! 🎉</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
                <Zap className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h2 className="text-2xl font-bold mb-4">Ready to Code?</h2>
                <p className="text-gray-400 mb-6">
                  Select a topic from the sidebar to start practicing DSA problems
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {Object.entries(topics).map(([key, topic]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTopic(key)}
                      className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl hover:from-white/10 hover:to-white/15 transition-all duration-300 transform hover:scale-105 border border-white/10"
                    >
                      <div className="text-2xl mb-2">{topic.icon}</div>
                      <div className="text-sm font-medium">{topic.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSA;