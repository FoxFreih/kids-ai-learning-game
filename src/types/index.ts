export interface Challenge {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  emoji: string;
  source?: "api" | "ai" | "fallback";
}

export interface GameStats {
  totalGames: number;
  correctAnswers: number;
  wrongAnswers: number;
  streak: number;
  bestStreak: number;
  categoryStats: Record<string, CategoryStat>;
  lastPlayed: string;
}

export interface CategoryStat {
  played: number;
  correct: number;
  averageTime: number;
}

export type GameType = "menu" | "colors" | "shapes" | "animals" | "ai-mode" | "parent-dashboard";

export type Difficulty = "easy" | "medium" | "hard";

export type FeedbackType = "correct" | "wrong" | null;
