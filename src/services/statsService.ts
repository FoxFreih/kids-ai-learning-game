import { GameStats, CategoryStat } from "@/types";

const STORAGE_KEY = "kids-game-stats";

const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  streak: 0,
  bestStreak: 0,
  categoryStats: {},
  lastPlayed: new Date().toISOString(),
};

export function getStats(): GameStats {
  if (typeof window === "undefined") return DEFAULT_STATS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATS;
    return JSON.parse(stored);
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: GameStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordAnswer(category: string, correct: boolean, timeMs: number): GameStats {
  const stats = getStats();

  stats.totalGames += 1;
  stats.lastPlayed = new Date().toISOString();

  if (correct) {
    stats.correctAnswers += 1;
    stats.streak += 1;
    if (stats.streak > stats.bestStreak) {
      stats.bestStreak = stats.streak;
    }
  } else {
    stats.wrongAnswers += 1;
    stats.streak = 0;
  }

  if (!stats.categoryStats[category]) {
    stats.categoryStats[category] = { played: 0, correct: 0, averageTime: 0 };
  }

  const cat: CategoryStat = stats.categoryStats[category];
  const prevTotal = cat.averageTime * cat.played;
  cat.played += 1;
  if (correct) cat.correct += 1;
  cat.averageTime = (prevTotal + timeMs) / cat.played;

  saveStats(stats);
  return stats;
}

export function resetStats(): void {
  saveStats(DEFAULT_STATS);
}

export function getAccuracyPercent(stats: GameStats): number {
  if (stats.totalGames === 0) return 0;
  return Math.round((stats.correctAnswers / stats.totalGames) * 100);
}

export function getCategoryAccuracy(stats: GameStats, category: string): number {
  const cat = stats.categoryStats[category];
  if (!cat || cat.played === 0) return 0;
  return Math.round((cat.correct / cat.played) * 100);
}
