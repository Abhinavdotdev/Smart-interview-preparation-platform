import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, Pause, SkipForward, Code, Zap, Clock, CheckCircle, AlertCircle, Trophy, Target, BookOpen } from 'lucide-react';

const FrontendInterviewPrep = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState('javascript');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionType, setQuestionType] = useState('conceptual');
  const [userAnswer, setUserAnswer] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    averageTime: 0
  });

  const technologies = [
    {
      value: 'html',
      label: 'HTML',
      icon: '🏗️',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      description: 'Structure & Semantics'
    },
    {
      value: 'css',
      label: 'CSS',
      icon: '🎨',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Styling & Layout'
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      icon: '⚡',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      description: 'Core Language & DOM'
    },
    {
      value: 'react',
      label: 'React',
      icon: '⚛️',
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      description: 'Components & Hooks'
    },
    {
      value: 'vue',
      label: 'Vue.js',
      icon: '💚',
      color: 'bg-green-100 text-green-800 border-green-200',
      description: 'Progressive Framework'
    },
    {
      value: 'angular',
      label: 'Angular',
      icon: '🅰️',
      color: 'bg-red-100 text-red-800 border-red-200',
      description: 'Full Framework'
    }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-600 bg-green-50', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600 bg-yellow-50', icon: '🚀' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-600 bg-red-50', icon: '🔥' }
  ];

  const questionTypes = [
    { value: 'conceptual', label: 'Conceptual', icon: '💡', description: 'Theory and concepts' },
    { value: 'practical', label: 'Practical', icon: '⚒️', description: 'Code implementation' },
    { value: 'debugging', label: 'Debugging', icon: '🐛', description: 'Find and fix issues' },
    { value: 'optimization', label: 'Optimization', icon: '📈', description: 'Performance & best practices' }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isTimerActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Gemini API Integration Functions
 const callGeminiAPI = async (questionText) => {
  try {
    const response = await fetch("http://localhost:5000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: questionText }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unknown error");
    return data.text;
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw new Error("API request failed");
  }
};

  const generateQuestion = async () => {
    setIsLoading(true);
    setShowFeedback(false);
    setUserAnswer('');

    try {
      // Create a detailed prompt for Gemini API
      const prompt = `Generate a ${difficulty} level ${selectedTechnology} ${questionType} interview question for frontend developers. 

Requirements:
- Make it specific and realistic for actual interviews
- For ${selectedTechnology} technology focus
- ${difficulty} difficulty level appropriate
- ${questionType} type question
- Include practical examples if needed
- Make it challenging but fair
- Ensure it tests real-world knowledge

Please provide only the question without any additional explanation or formatting.`;

      // Call Gemini API
      const generatedQuestion = await callGeminiAPI(prompt);

      if (generatedQuestion && generatedQuestion.trim()) {
        setCurrentQuestion(generatedQuestion.trim());
      } else {
        // Fallback questions if API fails
        const fallbackQuestions = [
          `What are the key differences between ${selectedTechnology} and other frontend technologies?`,
          `Explain a common ${selectedTechnology} concept that's important for ${difficulty} developers.`,
          `How would you solve a typical ${selectedTechnology} problem in a ${questionType} scenario?`,
          `What are the best practices for ${selectedTechnology} development at ${difficulty} level?`
        ];
        setCurrentQuestion(fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]);
      }

      setTimer(0);
      setIsTimerActive(false);

    } catch (error) {
      console.error('Error generating question:', error);

      // Provide fallback question on error
      const errorFallbacks = {
        html: "Explain the semantic importance of HTML5 elements and how they improve accessibility.",
        css: "How would you create a responsive layout using modern CSS techniques?",
        javascript: "Explain the concept of asynchronous programming in JavaScript with examples.",
        react: "What are React Hooks and how do they change the way we write components?",
        vue: "Explain Vue.js reactivity system and how it differs from other frameworks.",
        angular: "How does dependency injection work in Angular and why is it important?"
      };

      setCurrentQuestion(
        errorFallbacks[selectedTechnology] ||
        `Describe the main concepts and best practices for ${selectedTechnology} development.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startPractice = () => {
    setIsTimerActive(true);
  };

  const pausePractice = () => {
    setIsTimerActive(false);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert('Please provide an answer before submitting.');
      return;
    }

    setIsLoading(true);
    setIsTimerActive(false);

    try {
      // Create detailed evaluation prompt for Gemini API
      const evaluationPrompt = `You are an expert frontend developer interviewer. Please evaluate this candidate's answer:

QUESTION: ${currentQuestion}

CANDIDATE'S ANSWER: ${userAnswer}

TECHNOLOGY: ${selectedTechnology}
DIFFICULTY: ${difficulty}
QUESTION TYPE: ${questionType}

Please provide:
1. Whether the answer is CORRECT or INCORRECT (and why)
2. Score out of 10
3. Specific strengths in the answer
4. Areas for improvement
5. Additional tips or suggestions
6. What a perfect answer would include

Format your response clearly with sections for easy reading.`;

      // Call Gemini API for evaluation
      const evaluation = await callGeminiAPI(evaluationPrompt);

      if (evaluation && evaluation.trim()) {
        // Parse the evaluation to determine if it's correct/incorrect
        const isCorrect = evaluation.toLowerCase().includes('correct') &&
          !evaluation.toLowerCase().includes('incorrect');

        // Extract score if mentioned
        const scoreMatch = evaluation.match(/(\d+)\/10|(\d+) out of 10|score[:\s]*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : (isCorrect ? 7 : 4);

        const feedbackText = `🎯 **AI Evaluation Results**

⏱️ **Time Taken:** ${formatTime(timer)}
📊 **Score:** ${score}/10
${isCorrect ? '✅ **Status:** CORRECT' : '❌ **Status:** NEEDS IMPROVEMENT'}

**Detailed Feedback:**
${evaluation}

---
**Performance Stats Updated!** 📈`;

        setFeedback(feedbackText);
        setShowFeedback(true);
        setQuestionsAnswered(prev => prev + 1);

        // Update session stats with actual evaluation
        setSessionStats(prev => ({
          correct: prev.correct + (isCorrect ? 1 : 0),
          total: prev.total + 1,
          averageTime: Math.round(((prev.averageTime * prev.total) + timer) / (prev.total + 1))
        }));

      } else {
        throw new Error('Empty response from API');
      }

    } catch (error) {
      console.error('Error getting feedback:', error);

      // Provide basic feedback on API failure
      const basicFeedback = `⚠️ **Unable to connect to AI evaluator**

⏱️ **Time Taken:** ${formatTime(timer)}
📝 **Your Answer:** Recorded successfully

**Basic Assessment:**
- Answer length: ${userAnswer.length} characters
- Contains technical terms: ${userAnswer.toLowerCase().includes(selectedTechnology.toLowerCase()) ? 'Yes' : 'Check'}
- Detailed response: ${userAnswer.length > 100 ? 'Yes' : 'Could be more detailed'}

**Suggestion:** Try to include more specific examples and technical details in your answers.

**Note:** Please check your internet connection and API configuration to get detailed AI feedback.`;

      setFeedback(basicFeedback);
      setShowFeedback(true);
      setQuestionsAnswered(prev => prev + 1);

      // Update stats even on error
      setSessionStats(prev => ({
        correct: prev.correct,
        total: prev.total + 1,
        averageTime: Math.round(((prev.averageTime * prev.total) + timer) / (prev.total + 1))
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
    setTimer(0);
    setIsTimerActive(false);
  };

  // Generate initial question on component mount or when settings change
  useEffect(() => {
    generateQuestion();
  }, [selectedTechnology, difficulty, questionType]);

  const currentTech = technologies.find(tech => tech.value === selectedTechnology);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            🚀 Frontend Interview Prep
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Master frontend technologies with AI-powered questions and instant feedback
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions Answered</p>
                <p className="text-2xl font-bold text-gray-800">{questionsAnswered}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-2xl font-bold text-gray-800">{formatTime(timer)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Session Score</p>
                <p className="text-2xl font-bold text-gray-800">{sessionStats.total > 0 ? `${Math.round((sessionStats.correct / sessionStats.total) * 100)}%` : '0%'}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Time</p>
                <p className="text-2xl font-bold text-gray-800">{formatTime(sessionStats.averageTime)}</p>
              </div>
              <Zap className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Practice Settings
              </h2>

              {/* Technology Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Technology
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {technologies.map((tech) => (
                    <button
                      key={tech.value}
                      onClick={() => setSelectedTechnology(tech.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedTechnology === tech.value
                          ? tech.color + ' border-current transform scale-105'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <div className="text-lg mb-1">{tech.icon}</div>
                      <div className="text-sm font-medium">{tech.label}</div>
                      <div className="text-xs opacity-75">{tech.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setDifficulty(diff.value)}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-200 flex items-center ${difficulty === diff.value
                          ? diff.color + ' border-current'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <span className="text-lg mr-3">{diff.icon}</span>
                      <span className="font-medium">{diff.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Question Type
                </label>
                <div className="space-y-2">
                  {questionTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setQuestionType(type.value)}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${questionType === type.value
                          ? 'bg-purple-50 border-purple-300 text-purple-800'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{type.icon}</span>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs opacity-75">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate New Question Button */}
              <button
                onClick={generateQuestion}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Generating...' : 'New Question'}
              </button>
            </div>
          </div>

          {/* Main Practice Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Current Question */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{currentTech?.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {currentTech?.label} - {difficulties.find(d => d.value === difficulty)?.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {questionTypes.find(qt => qt.value === questionType)?.label} Question
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{formatTime(timer)}</div>
                    <div className="text-sm text-gray-600">Time Elapsed</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                      <span className="text-gray-600">Generating your question...</span>
                    </div>
                  ) : (
                    <p className="text-gray-800 leading-relaxed text-lg">{currentQuestion}</p>
                  )}
                </div>
              </div>

              {/* Answer Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Answer
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your detailed answer here. Include code examples, explanations, and any relevant details..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 min-h-[200px] font-mono text-sm"
                  disabled={isLoading}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {!isTimerActive ? (
                  <button
                    onClick={startPractice}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Timer
                  </button>
                ) : (
                  <button
                    onClick={pausePractice}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Timer
                  </button>
                )}

                <button
                  onClick={submitAnswer}
                  disabled={isLoading || !userAnswer.trim()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isLoading ? 'Evaluating...' : 'Submit Answer'}
                </button>

                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Next Question
                </button>
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-green-600" />
                    AI Feedback
                  </h4>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">{feedback}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔧 API Setup Instructions</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>⚠️ Important:</strong> To use this platform with real AI-generated questions, you need to:
            </p>
            <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
              <li>Get your Gemini API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
              <li>Replace 'YOUR_GEMINI_API_KEY' in the code with your actual API key</li>
              <li>Enable the Generative Language API in your Google Cloud Console</li>
            </ol>
          </div>

          <h4 className="text-md font-bold text-gray-800 mb-3">📚 How to Use</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <div>
                <p className="font-medium text-gray-800">Choose Technology</p>
                <p>Select from HTML, CSS, JavaScript, React, Vue, or Angular</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <div>
                <p className="font-medium text-gray-800">Set Difficulty</p>
                <p>Pick beginner, intermediate, or advanced level</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <div>
                <p className="font-medium text-gray-800">Answer & Submit</p>
                <p>AI evaluates your answers and provides detailed feedback</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
              <div>
                <p className="font-medium text-gray-800">Track Progress</p>
                <p>Monitor correct/incorrect answers and improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendInterviewPrep;