"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSpeech } from "@/hooks/useSpeech";

interface ShapeGameProps {
  onCorrect: () => void;
  onWrong: () => void;
}

interface Challenge {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  emoji: string;
}

const SHAPE_EMOJIS: Record<string, string> = {
  "دائرة": "⭕",
  "مربع": "⬜",
  "مثلث": "🔺",
  "نجمة": "⭐",
  "معين": "🔷",
  "قلب": "❤️",
  "3": "3️⃣",
  "4": "4️⃣",
  "5": "5️⃣",
  "2": "2️⃣",
  "6": "6️⃣",
};

export default function ShapeGame({ onCorrect, onWrong }: ShapeGameProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [loading, setLoading] = useState(true);
  const { speak } = useSpeech();

  const fetchChallenge = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/challenge?category=shapes&difficulty=easy");
      const data = await response.json();
      setChallenge(data);
      setTimeout(() => speak(data.question), 500);
    } catch (error) {
      console.error("Failed to fetch challenge:", error);
    }
    setLoading(false);
    setFeedback(null);
  }, [speak]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleChoice = (option: string) => {
    if (feedback || !challenge) return;

    if (option === challenge.correctAnswer) {
      setFeedback("correct");
      speak("ممتاز! أحسنت");
      onCorrect();
      setTimeout(fetchChallenge, 2000);
    } else {
      setFeedback("wrong");
      speak("جرب مرة ثانية");
      onWrong();
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (loading || !challenge) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl text-white font-bold"
      >
        جاري التحميل... ⏳
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center gap-8"
    >
      <motion.div
        key={challenge.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white/95 rounded-3xl p-8 shadow-2xl text-center"
      >
        <span className="text-6xl block mb-4">{challenge.emoji}</span>
        <p className="text-3xl font-bold text-gray-700">{challenge.question}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => speak(challenge.question)}
          className="mt-4 bg-amber-100 hover:bg-amber-200 rounded-full px-5 py-2 
                     text-2xl transition-all"
        >
          🔊 اسمع
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {challenge.options.map((option, index) => (
          <motion.button
            key={`${option}-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice(option)}
            className="w-36 h-36 md:w-44 md:h-44 rounded-2xl shadow-xl border-4 border-white/70
                       bg-white flex flex-col items-center justify-center gap-2
                       hover:border-amber-400 transition-all"
          >
            <span className="text-5xl">{SHAPE_EMOJIS[option] || "🔹"}</span>
            <span className="text-lg font-bold text-gray-700">{option}</span>
          </motion.button>
        ))}
      </div>

      {feedback === "correct" && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-white"
        >
          🎉 ممتاز! 🎉
        </motion.p>
      )}

      {feedback === "wrong" && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl text-white"
        >
          جرب مرة ثانية! 🌟
        </motion.p>
      )}
    </motion.div>
  );
}
