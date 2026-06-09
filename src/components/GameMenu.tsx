"use client";

import { motion } from "framer-motion";
import { GameType } from "@/types";

interface GameMenuProps {
  onSelectGame: (game: GameType) => void;
}

const games = [
  { id: "colors" as GameType, emoji: "🎨", label: "الألوان", color: "from-kid-red to-kid-orange" },
  { id: "shapes" as GameType, emoji: "🔷", label: "الأشكال", color: "from-kid-blue to-kid-cyan" },
  { id: "animals" as GameType, emoji: "🦁", label: "الحيوانات", color: "from-kid-green to-kid-yellow" },
  { id: "ai-mode" as GameType, emoji: "🤖", label: "الوضع الذكي", color: "from-purple-500 to-pink-500" },
];

export default function GameMenu({ onSelectGame }: GameMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center gap-8"
    >
      <motion.h1
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-5xl md:text-7xl font-bold text-white text-shadow-kid text-center"
      >
        🌟 هيا نتعلم! 🌟
      </motion.h1>

      <p className="text-2xl text-white/90 text-center">اختر لعبة يا بطل!</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectGame(game.id)}
            className={`bg-gradient-to-br ${game.color} p-8 rounded-3xl shadow-2xl 
                       flex flex-col items-center gap-4 min-w-[160px]
                       border-4 border-white/50 hover:border-white transition-all`}
          >
            <span className="text-6xl">{game.emoji}</span>
            <span className="text-xl font-bold text-white">{game.label}</span>
            {game.id === "ai-mode" && (
              <span className="text-xs bg-white/30 rounded-full px-3 py-1 text-white">
                ✨ أسئلة جديدة كل مرة
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* زر لوحة الأهل */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectGame("parent-dashboard")}
        className="mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white 
                   px-8 py-4 rounded-2xl text-lg border-2 border-white/30 
                   hover:border-white/60 transition-all flex items-center gap-3"
      >
        <span className="text-2xl">📊</span>
        <span>لوحة تحكم الأهل</span>
      </motion.button>
    </motion.div>
  );
}
