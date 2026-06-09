"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSpeech } from "@/hooks/useSpeech";

interface AnimalGameProps {
  onCorrect: () => void;
  onWrong: () => void;
}

interface Challenge {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  emoji: string;
}

const ANIMAL_EMOJIS: Record<string, string> = {
  "قطة": "🐱",
  "كلب": "🐶",
  "أسد": "🦁",
  "أرنب": "🐰",
  "فيل": "🐘",
  "زرافة": "🦒",
  "قرد": "🐵",
  "بقرة": "🐮",
  "دجاجة": "🐔",
  "عصفور": "🐦",
  "سمكة": "🐟",
  "بومة": "🦉",
  "نحلة": "🐝",
};

export default function AnimalGame({ onCorrect, onWrong }: AnimalGameProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const { speak } = useSpeech();

  const fetchChallenge = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/challenge?category=animals&difficulty=easy");
      const data = await response.json();
      setChallenge(data);
      setTimeout(() => speak(data.question), 500);
    } catch (error) {
      console.error("Failed to fetch challenge:", error);
    }
    setLoading(false);
    setFeedback(null);
    setShowHint(false);
  }, [speak]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleChoice = (option: string) => {
    if (feedback || !challenge) return;

    if (option === challenge.correctAnswer) {
      setFeedback("correct");
      speak("يا بطل! إجابة صحيحة");
      onCorrect();
      setTimeout(fetchChallenge, 2000);
    } else {
      setFeedback("wrong");
      speak("ليس هذا، جرب مرة ثانية");
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

        <div className="flex gap-3 mt-4 justify-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(challenge.question)}
            className="bg-amber-100 hover:bg-amber-200 rounded-full px-5 py-2 
                       text-2xl transition-all"
          >
            🔊 اسمع
          </motion.button>

          {challenge.hint && !showHint && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowHint(true);
                speak(challenge.hint!);
              }}
              className="bg-blue-100 hover:bg-blue-200 rounded-full px-5 py-2 
                         text-2xl transition-all"
            >
              💡 مساعدة
            </motion.button>
          )}
        </div>

        {challenge.hint && showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl mt-3 text-gray-500"
          >
            💡 {challenge.hint}
          </motion.p>
        )}
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
            <span className="text-5xl">{ANIMAL_EMOJIS[option] || "🐾"}</span>
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
          🎉 يا بطل! 🎉
        </motion.p>
      )}

      {feedback === "wrong" && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl text-white"
        >
          ليس هذا... جرب تاني! 🤔
        </motion.p>
      )}
    </motion.div>
  );
}
