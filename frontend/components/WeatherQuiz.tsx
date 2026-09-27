"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Brain, Zap, CheckCircle, XCircle, Star, RefreshCw, Award } from "lucide-react";

interface WeatherQuizProps {
  onClose: () => void;
}

const quizQuestions = [
  {
    question: "Aaj Nagpur mein barish ke chances kitne % hain?",
    options: ["10%", "45%", "82%", "95%"],
    correct: 2,
    explanation: "IMD data ke mutabiq aaj 82% chances hain heavy rainfall ke!",
    points: 10
  },
  {
    question: "Agar lightning alert ho, toh sabse safe jagah kahan hai?",
    options: ["Khule khet mein", "Ped ke neeche", "Pakki imarat ke andar", "Nadi ke kinare"],
    correct: 2,
    explanation: "Bijli girne se bachne ke liye hamesha pakki building ya car ke andar rahein.",
    points: 20
  },
  {
    question: "Pesticide spray karne ka sabse accha samay kab hota hai?",
    options: ["Dopahar 2 baje", "Subah 7-9 baje", "Raat ko", "Tez hawa mein"],
    correct: 1,
    explanation: "Subah 7-9 baje hawa shant hoti hai aur dhoop tez nahi hoti, isliye spray effective hota hai.",
    points: 15
  },
  {
    question: "Heatwave ke dauran roz kitna paani peena chahiye?",
    options: ["1-2 liter", "2-3 liter", "4-5 liter", "Jitna man kare"],
    correct: 2,
    explanation: "Extreme heat mein body ko hydrated rakhne ke liye 4-5 liter paani zaroori hai.",
    points: 15
  },
  {
    question: "Climate change ke karan pichle 10 saalon mein temperature mein kitni badhotri hui hai?",
    options: ["0.5°C", "1.2°C", "2.5°C", "5°C"],
    correct: 1,
    explanation: "Global data ke mutabiq pichle decade mein average temp lagbhag 1.1°C - 1.2°C badha hai.",
    points: 25
  }
];

export default function WeatherQuiz({ onClose }: WeatherQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === quizQuestions[currentQ].correct) {
      setScore(prev => prev + quizQuestions[currentQ].points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2500);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setStreak(0);
  };

  const getBadge = () => {
    if (score >= 80) return { name: "Weather Wizard 🧙‍♂️", color: "from-yellow-400 to-orange-500" };
    if (score >= 50) return { name: "Climate Hero ", color: "from-blue-400 to-cyan-500" };
    return { name: "Weather Cadet 🎖️", color: "from-gray-400 to-gray-600" };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 sticky top-0 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Weather Quiz Arena</h3>
              <p className="text-xs text-indigo-300">Test your climate knowledge!</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
            <span className="text-gray-400 text-xl">×</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!quizCompleted ? (
            <>
              {/* Progress & Stats */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
                  <Trophy size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{score} pts</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
                  <Zap size={16} className="text-orange-400" />
                  <span className="text-orange-400 font-bold">{streak} Streak</span>
                </div>
                <div className="text-indigo-300 text-sm font-mono">
                  Q {currentQ + 1}/{quizQuestions.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <h4 className="text-white text-xl font-bold leading-relaxed">
                  {quizQuestions[currentQ].question}
                </h4>
              </motion.div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence mode="popLayout">
                  {quizQuestions[currentQ].options.map((option, idx) => {
                    let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 text-white";
                    if (selectedOption !== null) {
                      if (idx === quizQuestions[currentQ].correct) {
                        btnClass = "bg-green-500/20 border-green-500 text-green-400";
                      } else if (idx === selectedOption) {
                        btnClass = "bg-red-500/20 border-red-500 text-red-400";
                      } else {
                        btnClass = "bg-white/5 border-white/5 text-gray-500 opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleOptionClick(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span className="font-medium">{option}</span>
                        {selectedOption === idx && (
                          idx === quizQuestions[currentQ].correct ? 
                            <CheckCircle size={20} /> : <XCircle size={20} />
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Star size={18} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                      <p className="text-indigo-100 text-sm leading-relaxed">
                        {quizQuestions[currentQ].explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Result Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${getBadge().color} flex items-center justify-center shadow-2xl`}>
                <Award className="text-white" size={48} />
              </div>
              
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-indigo-300">You earned the badge:</p>
                <div className={`text-xl font-black bg-gradient-to-r ${getBadge().color} bg-clip-text text-transparent mt-2`}>
                  {getBadge().name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{score}</div>
                  <div className="text-xs text-gray-400">Total Points</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{quizQuestions.length}</div>
                  <div className="text-xs text-gray-400">Questions</div>
                </div>
              </div>

              <button
                onClick={restartQuiz}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition"
              >
                <RefreshCw size={18} /> Play Again
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}