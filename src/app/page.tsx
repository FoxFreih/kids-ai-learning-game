"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameType } from "@/types";
import { recordAnswer } from "@/services/statsService";
import GameMenu from "@/components/GameMenu";
import ColorGame from "@/components/ColorGame";
import ShapeGame from "@/components/ShapeGame";
import AnimalGame from "@/components/AnimalGame";
import AiGame from "@/components/AiGame";
import ParentDashboard from "@/components/ParentDashboard";
import Celebration from "@/components/Celebration";
import { useSound } from "@/hooks/useSound";

export default function Home() {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const { playSound } = useSound();
  const answerStartTime = useRef<number>(Date.now());

  const getActiveCategory = (): string => {
    if (currentGame === "ai-mode") return "mixed";
    return currentGame === "menu" || currentGame === "parent-dashboard" ? "" : currentGame;
  };

  const handleCorrectAnswer = () => {
    const timeMs = Date.now() - answerStartTime.current;
    setScore((prev) => prev + 1);
    setShowCelebration(true);
    playSound("celebrate");
    recordAnswer(getActiveCategory(), true, timeMs);
    answerStartTime.current = Date.now();
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const handleWrongAnswer = () => {
    const timeMs = Date.now() - answerStartTime.current;
    playSound("wrong");
    recordAnswer(getActiveCategory(), false, timeMs);
    answerStartTime.current = Date.now();
  };

  const handleBackToMenu = () => {
    playSound("click");
    setCurrentGame("menu");
  };

  const handleSelectGame = (game: GameType) => {
    playSound("click");
    answerStartTime.current = Date.now();
    setCurrentGame(game);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-auto">
      {currentGame !== "menu" && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-4 left-4 bg-white/90 rounded-full px-6 py-3 shadow-lg"
        >
          <span className="text-2xl font-bold text-kid-purple">⭐ {score}</span>
        </motion.div>
      )}

      {currentGame !== "menu" && (
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={handleBackToMenu}
          className="absolute top-4 right-4 bg-white/90 rounded-full px-6 py-3 shadow-lg 
                     text-2xl hover:scale-110 transition-transform"
        >
          🏠
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {currentGame === "menu" && (
          <GameMenu key="menu" onSelectGame={handleSelectGame} />
        )}
        {currentGame === "colors" && (
          <ColorGame key="colors" onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />
        )}
        {currentGame === "shapes" && (
          <ShapeGame key="shapes" onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />
        )}
        {currentGame === "animals" && (
          <AnimalGame key="animals" onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />
        )}
        {currentGame === "ai-mode" && (
          <AiGame key="ai-mode" onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />
        )}
        {currentGame === "parent-dashboard" && (
          <ParentDashboard key="parent-dashboard" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCelebration && <Celebration key="celebration" />}
      </AnimatePresence>
    </main>
  );
}
