"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface AiGameProps {
  onCorrect: () => void;
  onWrong: () => void;
}

interface Challenge {
  id: string;
  category: string;
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  emoji: string;
  source?: string;
}

const CATEGORIES = ["colors", "shapes", "animals", "numbers"];

export default function AiGame({ onCorrect, onWrong }: AiGameProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const fetchAiChallenge = useCallback(async () => {
    setLoading(true);
    setShowHint(false);
    try {
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const response = await fetch(
        `/api/ai-challenge?category=${randomCategory}&difficulty=${difficulty}`
      );
      const data = await response.json();
      setChallenge(data);
    } catch (error) {
      console.error("Failed to fetch AI challenge:", error);
    }
    setLoading(false);
    setFeedback(null);
  }, [difficulty]);

  useEffect(() => {
    fetchAiChallenge();
  }, [fetchAiChallenge]);

  // نظام تكيّفي بسيط: بعد 3 إجابات صحيحة متتالية، نرفع الصعوبة
  useEffect(() => {
    if (consecutiveCorrect >= 3 && difficulty === "easy") {
      setDifficulty("medium");
      setConsecutiveCorrect(0);
    } else if (consecutiveCorrect >= 3 && difficulty === "medium") {
      setDifficulty("hard");
      setConsecutiveCorrect(0);
    }
  }, [consecutiveCorrect, difficulty]);

  const handleChoice = (option: string) => {
    if (feedback || !challenge) return;

    if (option === challenge.correctAnswer) {
      setFeedback("correct");
      setConsecutiveCorrect((prev) => prev + 1);
      onCorrect();
      setTimeout(fetchAiChallenge, 1800);
    } else {
      setFeedback("wrong");
      setConsecutiveCorrect(0);
      onWrong();
      if (difficulty === "hard") setDifficulty("medium");
      else if (difficulty === "medium") setDifficulty("easy");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case "easy": return "⭐";
      case "medium": return "⭐⭐";
      case "hard": return "⭐⭐⭐";
      default: return "⭐";
    }
  };

  if (loading || !challenge) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="text-6xl"
        >
          🤖
        </motion.div>
        <p className="text-3xl text-white font-bold">الروبوت يفكر بسؤال...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center gap-6"
    >
      {/* مؤشر الصعوبة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/20 rounded-full px-4 py-2 text-white text-lg"
      >
        المستوى: {getDifficultyLabel()}
        {challenge.source === "ai" && " 🤖"}
        {challenge.source === "fallback" && " 📚"}
      </motion.div>

      {/* بطاقة السؤال */}
      <motion.div
        key={challenge.id}
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-white/95 rounded-3xl p-8 shadow-2xl text-center max-w-md"
      >
        <span className="text-6xl block mb-4">{challenge.emoji}</span>
        <p className="text-2xl font-bold text-gray-700">{challenge.question}</p>

        {challenge.hint && showHint && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg mt-3 text-amber-600 bg-amber-50 rounded-xl p-2"
          >
            💡 {challenge.hint}
          </motion.p>
        )}

        {challenge.hint && !showHint && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowHint(true)}
            className="mt-3 text-base text-purple-500 underline"
          >
            💡 أحتاج مساعدة
          </motion.button>
        )}
      </motion.div>

      {/* خيارات الإجابة */}
      <div className="grid grid-cols-2 gap-4">
        {challenge.options.map((option, index) => (
          <motion.button
            key={`${option}-${index}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice(option)}
            disabled={feedback !== null}
            className={`w-36 h-28 md:w-44 md:h-32 rounded-2xl shadow-xl border-4
                       flex items-center justify-center text-xl font-bold
                       transition-all ${
                         feedback === "correct" && option === challenge.correctAnswer
                           ? "bg-green-200 border-green-500"
                           : feedback === "wrong" && option !== challenge.correctAnswer
                           ? "bg-white border-white/70 opacity-50"
                           : "bg-white border-white/70 hover:border-purple-400"
                       }`}
          >
            <span className="text-gray-700">{option}</span>
          </motion.button>
        ))}
      </div>

      {/* رسائل التغذية الراجعة */}
      {feedback === "correct" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <p className="text-4xl font-bold text-white">🎉 رائع! 🎉</p>
          <p className="text-xl text-white/80 mt-2">سؤال جديد قادم...</p>
        </motion.div>
      )}

      {feedback === "wrong" && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          className="text-3xl text-white"
        >
          ليس هذا... حاول مرة أخرى! 💪
        </motion.p>
      )}

      {/* زر سؤال جديد */}
      {!feedback && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={fetchAiChallenge}
          className="mt-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 
                     rounded-full text-lg transition-all"
        >
          🔄 سؤال آخر
        </motion.button>
      )}
    </motion.div>
  );
}
