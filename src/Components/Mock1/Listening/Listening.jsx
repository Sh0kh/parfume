import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle, XCircle, Volume2 } from 'lucide-react';

// JSON данные с тестовыми вопросами
const listeningTestData = {
  "part1": {
    "title": "SECTION 1",
    "subtitle": "Conversation about booking a hotel room",
    "audioUrl": "#", // В реальном приложении здесь будет URL аудио
    "duration": "5:30",
    "instructions": "You will hear a conversation between a customer and a hotel receptionist. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    "questions": [
      {
        "id": 1,
        "type": "form_completion",
        "text": "Customer's name: ___________",
        "answer": "Smith"
      },
      {
        "id": 2,
        "type": "form_completion", 
        "text": "Number of nights: ___________",
        "answer": "3"
      },
      {
        "id": 3,
        "type": "form_completion",
        "text": "Type of room: ___________ room",
        "answer": "double"
      },
      {
        "id": 4,
        "type": "form_completion",
        "text": "Check-in date: ___________ March",
        "answer": "15th"
      },
      {
        "id": 5,
        "type": "form_completion",
        "text": "Special requirements: ___________ floor",
        "answer": "ground"
      }
    ]
  },
  "part2": {
    "title": "SECTION 2", 
    "subtitle": "Talk about a local sports center",
    "audioUrl": "#",
    "duration": "6:00",
    "instructions": "You will hear a talk about a local sports center. Choose the correct letter A, B or C.",
    "questions": [
      {
        "id": 6,
        "type": "multiple_choice",
        "text": "The sports center is located",
        "options": ["A) in the city center", "B) near the university", "C) by the river"],
        "answer": "B"
      },
      {
        "id": 7,
        "type": "multiple_choice",
        "text": "The center opens at",
        "options": ["A) 6:00 AM", "B) 7:00 AM", "C) 8:00 AM"],
        "answer": "A"
      },
      {
        "id": 8,
        "type": "multiple_choice",
        "text": "Monthly membership costs",
        "options": ["A) £25", "B) £30", "C) £35"],
        "answer": "B"
      },
      {
        "id": 9,
        "type": "multiple_choice",
        "text": "The swimming pool is",
        "options": ["A) heated", "B) outdoor", "C) Olympic size"],
        "answer": "A"
      },
      {
        "id": 10,
        "type": "multiple_choice",
        "text": "Personal training sessions are available",
        "options": ["A) weekdays only", "B) weekends only", "C) every day"],
        "answer": "C"
      }
    ]
  },
  "part3": {
    "title": "SECTION 3",
    "subtitle": "University students discussing an assignment",
    "audioUrl": "#",
    "duration": "7:00", 
    "instructions": "You will hear two university students discussing their assignment. Complete the sentences below. Write NO MORE THAN THREE WORDS for each answer.",
    "questions": [
      {
        "id": 11,
        "type": "sentence_completion",
        "text": "The assignment is about ___________.",
        "answer": "climate change"
      },
      {
        "id": 12,
        "type": "sentence_completion",
        "text": "The deadline is ___________.",
        "answer": "next Friday"
      },
      {
        "id": 13,
        "type": "sentence_completion",
        "text": "They need to include ___________ in their research.",
        "answer": "recent data"
      },
      {
        "id": 14,
        "type": "sentence_completion", 
        "text": "The professor wants ___________ references minimum.",
        "answer": "ten"
      },
      {
        "id": 15,
        "type": "sentence_completion",
        "text": "They will meet in the ___________.",
        "answer": "library"
      }
    ]
  },
  "part4": {
    "title": "SECTION 4",
    "subtitle": "Lecture on renewable energy",
    "audioUrl": "#",
    "duration": "8:30",
    "instructions": "You will hear a lecture on renewable energy. Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
    "questions": [
      {
        "id": 16,
        "type": "note_completion",
        "text": "Solar energy: Uses ___________ panels",
        "answer": "photovoltaic"
      },
      {
        "id": 17,
        "type": "note_completion",
        "text": "Wind energy: Turbines need ___________ wind speeds",
        "answer": "consistent"
      },
      {
        "id": 18,
        "type": "note_completion",
        "text": "Hydroelectric power: Requires ___________ dams",
        "answer": "large"
      },
      {
        "id": 19,
        "type": "note_completion",
        "text": "Main advantage: ___________ pollution",
        "answer": "no"
      },
      {
        "id": 20,
        "type": "note_completion",
        "text": "Main disadvantage: High ___________ costs",
        "answer": "initial"
      }
    ]
  }
};

export default function Listening() {
  const [currentPart, setCurrentPart] = useState('instructions');
  const [answers, setAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const timerRef = useRef(null);

  // Симуляция аудио плеера
  useEffect(() => {
    let interval;
    if (isPlaying && !testComplete) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, testComplete]);

  // Таймер теста
  useEffect(() => {
    if (currentPart !== 'instructions' && !testComplete) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTestComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentPart, testComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value.trim()
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    Object.values(listeningTestData).forEach(part => {
      part.questions.forEach(question => {
        total++;
        const userAnswer = answers[question.id] || '';
        const correctAnswer = question.answer.toLowerCase().trim();
        
        if (userAnswer.toLowerCase() === correctAnswer) {
          correct++;
        }
      });
    });
    
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const getBandScore = (percentage) => {
    if (percentage >= 90) return 9.0;
    if (percentage >= 80) return 8.0;
    if (percentage >= 70) return 7.0;
    if (percentage >= 60) return 6.0;
    if (percentage >= 50) return 5.0;
    if (percentage >= 40) return 4.0;
    return 3.0;
  };

  const startTest = () => {
    setCurrentPart('part1');
    setTimeRemaining(30 * 60);
  };

  const nextPart = () => {
    const parts = ['part1', 'part2', 'part3', 'part4'];
    const currentIndex = parts.indexOf(currentPart);
    if (currentIndex < parts.length - 1) {
      setCurrentPart(parts[currentIndex + 1]);
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      setTestComplete(true);
    }
  };

  const finishTest = () => {
    setTestComplete(true);
    setShowResults(true);
    setIsPlaying(false);
  };

  const resetTest = () => {
    setCurrentPart('instructions');
    setAnswers({});
    setIsPlaying(false);
    setCurrentTime(0);
    setTestComplete(false);
    setShowResults(false);
    setTimeRemaining(30 * 60);
  };

  const renderQuestion = (question) => {
    const userAnswer = answers[question.id] || '';
    const isCorrect = showResults && userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    const isWrong = showResults && userAnswer && !isCorrect;

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div key={question.id} className="mb-6 p-4 bg-white rounded-lg border">
            <p className="font-medium mb-3">{question.id}. {question.text}</p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.charAt(0)}
                    checked={userAnswer === option.charAt(0)}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    disabled={testComplete}
                    className="text-blue-600"
                  />
                  <span className={`${showResults && question.answer === option.charAt(0) ? 'text-green-600 font-bold' : ''}`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
            {showResults && (
              <div className="mt-2 flex items-center space-x-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm">
                  {isCorrect ? 'Correct' : `Correct answer: ${question.answer}`}
                </span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div key={question.id} className="mb-6 p-4 bg-white rounded-lg border">
            <p className="font-medium mb-3">{question.id}. {question.text}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              disabled={testComplete}
              className={`w-full p-2 border rounded-lg ${
                isCorrect ? 'border-green-500 bg-green-50' : 
                isWrong ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${testComplete ? 'cursor-not-allowed' : ''}`}
              placeholder="Your answer..."
            />
            {showResults && (
              <div className="mt-2 flex items-center space-x-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm">
                  {isCorrect ? 'Correct' : `Correct answer: ${question.answer}`}
                </span>
              </div>
            )}
          </div>
        );
    }
  };

  if (currentPart === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">IELTS Listening Test</h1>
            <p className="text-xl text-gray-600">Practice Test - 40 Questions, 30 Minutes</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Test Instructions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">General Instructions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Total time: 30 minutes</li>
                  <li>• 40 questions in 4 sections</li>
                  <li>• Each audio will play only once</li>
                  <li>• Write your answers as you listen</li>
                  <li>• Use only the words from the audio</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Answer Guidelines</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Follow word limits carefully</li>
                  <li>• Check spelling and grammar</li>
                  <li>• Use capital letters where appropriate</li>
                  <li>• Write clearly and legibly</li>
                  <li>• Transfer answers carefully</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Test Sections</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><span className="font-semibold">Section 1:</span> Everyday conversation (Questions 1-10)</p>
                  <p><span className="font-semibold">Section 2:</span> Monologue on general topic (Questions 11-20)</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold">Section 3:</span> Academic discussion (Questions 21-30)</p>
                  <p><span className="font-semibold">Section 4:</span> Academic lecture (Questions 31-40)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startTest}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Listening Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const bandScore = getBandScore(score.percentage);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Test Results</h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Score</h3>
                <p className="text-3xl font-bold text-blue-600">{score.correct}/{score.total}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Percentage</h3>
                <p className="text-3xl font-bold text-green-600">{score.percentage}%</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Band Score</h3>
                <p className="text-3xl font-bold text-purple-600">{bandScore}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Answer Review</h2>
              {Object.entries(listeningTestData).map(([partKey, part]) => (
                <div key={partKey} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">{part.title}</h3>
                  <div className="space-y-4">
                    {part.questions.map(renderQuestion)}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-x-4">
              <button
                onClick={resetTest}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Take Test Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPartData = listeningTestData[currentPart];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{currentPartData.title}</h1>
              <p className="text-gray-600">{currentPartData.subtitle}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-semibold">
                  {currentPart === 'part1' ? '1' : 
                   currentPart === 'part2' ? '2' :
                   currentPart === 'part3' ? '3' : '4'}/4
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Audio Player */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Audio Player
              </h3>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Duration: {currentPartData.duration}</span>
                  <span className="text-sm font-mono">{formatTime(currentTime)}</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((currentTime / 600) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={testComplete}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={() => setCurrentTime(0)}
                  disabled={testComplete}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Instructions:</p>
                <p className="text-sm text-blue-700 mt-1">{currentPartData.instructions}</p>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={nextPart}
                  disabled={testComplete}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {currentPart === 'part4' ? 'Finish Test' : 'Next Section'}
                </button>
                <button
                  onClick={finishTest}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Questions {currentPartData.questions[0].id}-{currentPartData.questions[currentPartData.questions.length - 1].id}</h3>
              
              <div className="space-y-6">
                {currentPartData.questions.map(renderQuestion)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}