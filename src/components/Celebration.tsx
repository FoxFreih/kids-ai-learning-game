"use client";

import { motion } from "framer-motion";

const EMOJIS = ["🎉", "⭐", "🌟", "🎊", "💫", "✨", "🏆", "👏", "🥳", "💖"];

export default function Celebration() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ y: -50, x: `${particle.x}vw`, opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{ duration: 2, delay: particle.delay, ease: "easeIn" }}
          className="absolute text-4xl"
        >
          {particle.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
}
