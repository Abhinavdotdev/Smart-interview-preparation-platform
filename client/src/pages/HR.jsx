import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle, XCircle, Star, BookOpen, Target, User, Award } from 'lucide-react';

const HRInterviewPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('behavioral');
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [difficulty, setDifficulty] = useState('beginner');
  const [userAnswer, setUserAnswer] = useState('');
  const [savedAnswers, setSavedAnswers] = useState({});

  const hrQuestions = {
    behavioral: {
      beginner: [
        {
          question: "Tell me about yourself.",
          tip: "Keep it professional, focus on career highlights and relevant experiences.",
          answer: "Structure: Current role → Past experience → Future goals. Keep it concise (2-3 minutes)."
        },
        {
          question: "Why do you want to work here?",
          tip: "Research the company beforehand and mention specific reasons.",
          answer: "Mention company values, culture, growth opportunities, and how you can contribute."
        },
        {
          question: "What are your strengths?",
          tip: "Mention 2-3 strengths with specific examples.",
          answer: "Choose strengths relevant to the job and provide concrete examples of how you've used them."
        },
        {
          question: "What are your weaknesses?",
          tip: "Mention a real weakness but show how you're working to improve it.",
          answer: "Be honest but show self-awareness and steps you're taking to improve."
        }
      ],
      intermediate: [
        {
          question: "Describe a time when you had to work with a difficult team member.",
          tip: "Use the STAR method: Situation, Task, Action, Result.",
          answer: "Focus on communication, empathy, and finding common ground to resolve conflicts."
        },
        {
          question: "How do you handle stress and pressure?",
          tip: "Provide specific strategies and examples.",
          answer: "Mention techniques like prioritization, time management, and maintaining work-life balance."
        },
        {
          question: "Where do you see yourself in 5 years?",
          tip: "Show ambition but be realistic and align with company growth.",
          answer: "Focus on professional development, skill building, and contributing to the organization."
        }
      ],
      advanced: [
        {
          question: "Describe a time when you had to make a difficult decision with limited information.",
          tip: "Demonstrate analytical thinking and decision-making process.",
          answer: "Show how you gathered available data, consulted stakeholders, and made the best decision possible."
        },
        {
          question: "How would you handle a situation where you disagree with your manager?",
          tip: "Show respect for hierarchy while demonstrating independent thinking.",
          answer: "Emphasize respectful communication, presenting data, and finding collaborative solutions."
        }
      ]
    },
    situational: {
      beginner: [
        {
          question: "How would you prioritize multiple urgent tasks?",
          tip: "Demonstrate organizational and time management skills.",
          answer: "Assess urgency vs importance, communicate with stakeholders, and create a structured plan."
        },
        {
          question: "What would you do if you made a mistake at work?",
          tip: "Show accountability and problem-solving skills.",
          answer: "Take responsibility, inform relevant parties, propose solutions, and learn from the experience."
        }
      ],
      intermediate: [
        {
          question: "How would you handle a project with a tight deadline and limited resources?",
          tip: "Show resourcefulness and strategic thinking.",
          answer: "Prioritize critical features, leverage team strengths, and communicate constraints to stakeholders."
        }
      ],
      advanced: [
        {
          question: "How would you implement a major change that employees are resistant to?",
          tip: "Demonstrate change management and leadership skills.",
          answer: "Focus on communication, involving employees in the process, and addressing concerns transparently."
        }
      ]
    },
    career: {
      beginner: [
        {
          question: "Why are you leaving your current job?",
          tip: "Stay positive, focus on growth opportunities.",
          answer: "Emphasize seeking new challenges, career growth, and better alignment with goals."
        },
        {
          question: "What motivates you?",
          tip: "Align your motivation with the job requirements.",
          answer: "Mention professional growth, making impact, solving problems, or helping others."
        }
      ],
      intermediate: [
        {
          question: "Describe your ideal work environment.",
          tip: "Research the company culture beforehand.",
          answer: "Focus on collaboration, learning opportunities, and supportive team dynamics."
        }
      ],
      advanced: [
        {
          question: "How do you stay updated with industry trends?",
          tip: "Show continuous learning and professional development.",
          answer: "Mention specific resources, courses, networks, and how you apply new knowledge."
        }
      ]
    }
  };

  const categories = {
    behavioral: { name: 'Behavioral', icon: User, color: 'bg-blue-500' },
    situational: { name: 'Situational', icon: Target, color: 'bg-green-500' },
    career: { name: 'Career Goals', icon: Award, color: 'bg-purple-500' }
  };

  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const currentQuestions = hrQuestions[selectedCategory]?.[difficulty] || [];
  const currentQ = currentQuestions[currentQuestion];
  
  // Debug logging
  console.log('Selected Category:', selectedCategory);
  console.log('Difficulty:', difficulty);
  console.log('Current Questions:', currentQuestions);
  console.log('Current Question Index:', currentQuestion);
  console.log('Current Question Object:', currentQ);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Load saved answer when question changes
  useEffect(() => {
    const answerKey = `${selectedCategory}-${difficulty}-${currentQuestion}`;
    setUserAnswer(savedAnswers[answerKey] || '');
  }, [selectedCategory, difficulty, currentQuestion, savedAnswers]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setShowAnswer(false);
    // Load saved answer if exists
    const answerKey = `${selectedCategory}-${difficulty}-${currentQuestion}`;
    if (savedAnswers[answerKey]) {
      setUserAnswer(savedAnswers[answerKey]);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setCompletedQuestions(prev => new Set([...prev, `${selectedCategory}-${difficulty}-${currentQuestion}`]));
    // Save the answer
    const answerKey = `${selectedCategory}-${difficulty}-${currentQuestion}`;
    setSavedAnswers(prev => ({
      ...prev,
      [answerKey]: userAnswer
    }));
  };

  const handleNextQuestion = () => {
    // Save current answer before moving
    const answerKey = `${selectedCategory}-${difficulty}-${currentQuestion}`;
    if (userAnswer.trim()) {
      setSavedAnswers(prev => ({
        ...prev,
        [answerKey]: userAnswer
      }));
    }
    
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentQuestion(0);
    }
    setIsRecording(false);
    setTimer(0);
    setShowAnswer(false);
    
    // Load answer for next question
    const nextAnswerKey = `${selectedCategory}-${difficulty}-${currentQuestion < currentQuestions.length - 1 ? currentQuestion + 1 : 0}`;
    setUserAnswer(savedAnswers[nextAnswerKey] || '');
  };

  const handlePrevQuestion = () => {
    // Save current answer before moving
    const answerKey = `${selectedCategory}-${difficulty}-${currentQuestion}`;
    if (userAnswer.trim()) {
      setSavedAnswers(prev => ({
        ...prev,
        [answerKey]: userAnswer
      }));
    }
    
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      setCurrentQuestion(currentQuestions.length - 1);
    }
    setIsRecording(false);
    setTimer(0);
    setShowAnswer(false);
    
    // Load answer for previous question
    const prevAnswerKey = `${selectedCategory}-${difficulty}-${currentQuestion > 0 ? currentQuestion - 1 : currentQuestions.length - 1}`;
    setUserAnswer(savedAnswers[prevAnswerKey] || '');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setIsRecording(false);
    setTimer(0);
    setShowAnswer(false);
    // Load answer for new category/question
    const answerKey = `${category}-${difficulty}-0`;
    setUserAnswer(savedAnswers[answerKey] || '');
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setCurrentQuestion(0);
    setIsRecording(false);
    setTimer(0);
    setShowAnswer(false);
    // Load answer for new difficulty/question
    const answerKey = `${selectedCategory}-${newDifficulty}-0`;
    setUserAnswer(savedAnswers[answerKey] || '');
  };

  const completionPercentage = (completedQuestions.size / Object.values(hrQuestions).flat().reduce((acc, cat) => acc + Object.values(cat).flat().length, 0)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <User className="h-8 w-8" />
                HR Interview Questions
              </h1>
              <p className="text-blue-200 mt-2">Practice HR questions and improve your interview skills</p>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm">Progress</div>
              <div className="text-2xl font-bold text-white">{Math.round(completionPercentage)}%</div>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Categories
              </h3>
              <div className="space-y-3">
                {Object.entries(categories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleCategoryChange(key)}
                      className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        selectedCategory === key
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Difficulty
              </h3>
              <div className="space-y-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => handleDifficultyChange(diff)}
                    className={`w-full p-2 rounded-lg transition-all duration-200 capitalize ${
                      difficulty === diff
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h3 className="text-white font-semibold mb-4">Session Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>Current Timer</span>
                  <span className="font-mono">{formatTime(timer)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Questions Completed</span>
                  <span>{completedQuestions.size}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Current Question</span>
                  <span>{currentQuestion + 1} of {currentQuestions.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
              {currentQ && currentQuestions.length > 0 ? (
                <>
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${categories[selectedCategory].color} rounded-xl flex items-center justify-center`}>
                        {React.createElement(categories[selectedCategory].icon, { className: "h-6 w-6 text-white" })}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white capitalize">
                          {categories[selectedCategory].name} - {difficulty}
                        </h2>
                        <p className="text-white/60">Question {currentQuestion + 1} of {currentQuestions.length}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {completedQuestions.has(`${selectedCategory}-${difficulty}-${currentQuestion}`) ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-white/40" />
                      )}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-white leading-relaxed">
                        {currentQ.question}
                      </h3>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-blue-200 text-sm">
                        <strong>💡 Quick Tip:</strong> {currentQ.tip}
                      </p>
                    </div>
                  </div>

                  {/* Answer Input Area */}
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Your Answer</h4>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span>{userAnswer.length} characters</span>
                        {userAnswer.length > 0 && (
                          <button
                            onClick={() => setUserAnswer('')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={isRecording ? "Start typing your answer here..." : "Click 'Start Practice' to begin answering..."}
                      disabled={!isRecording}
                      className={`w-full h-40 p-4 rounded-lg border text-white placeholder-white/40 resize-none transition-all duration-200 ${
                        isRecording 
                          ? 'bg-white/10 border-green-500/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20' 
                          : 'bg-white/5 border-white/20 cursor-not-allowed'
                      } focus:outline-none`}
                      rows={6}
                    />
                    
                    {isRecording && (
                      <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Recording in progress</span>
                        </div>
                        <div>
                          <span>Time: </span>
                          <span className="font-mono text-white">{formatTime(timer)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recording Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                      <Clock className="h-5 w-5 text-white/60" />
                      <span className="text-xl font-mono text-white">{formatTime(timer)}</span>
                    </div>
                    
                    <button
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                        isRecording
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-5 w-5" />
                          Stop Practice
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Start Practice
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setTimer(0);
                        setIsRecording(false);
                      }}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Sample Answer */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4 text-left transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">View Sample Answer</span>
                        <span className="text-white/60">{showAnswer ? '−' : '+'}</span>
                      </div>
                    </button>
                    
                    {showAnswer && (
                      <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-green-200">{currentQ.answer}</p>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevQuestion}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
                    >
                      Previous
                    </button>
                    
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200"
                    >
                      Next Question
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-white/60 text-lg mb-4">
                    {currentQuestions.length === 0 
                      ? `No questions available for ${categories[selectedCategory].name} - ${difficulty} level.`
                      : 'Loading question...'
                    }
                  </div>
                  <div className="text-white/40 text-sm">
                    Category: {selectedCategory} | Difficulty: {difficulty} | Questions: {currentQuestions.length}
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategory('behavioral');
                      setDifficulty('beginner');
                      setCurrentQuestion(0);
                    }}
                    className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                  >
                    Reset to Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRInterviewPage;