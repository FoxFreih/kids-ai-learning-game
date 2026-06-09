import { recordAnswer, getStats, resetStats, getAccuracyPercent, getCategoryAccuracy } from "../services/statsService";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("statsService", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  describe("getStats", () => {
    it("returns default stats when no data stored", () => {
      const stats = getStats();
      expect(stats.totalGames).toBe(0);
      expect(stats.correctAnswers).toBe(0);
      expect(stats.wrongAnswers).toBe(0);
      expect(stats.streak).toBe(0);
      expect(stats.bestStreak).toBe(0);
    });
  });

  describe("recordAnswer", () => {
    it("increments correct answers and streak on correct answer", () => {
      const stats = recordAnswer("colors", true, 1500);
      expect(stats.totalGames).toBe(1);
      expect(stats.correctAnswers).toBe(1);
      expect(stats.streak).toBe(1);
    });

    it("increments wrong answers and resets streak on wrong answer", () => {
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      const stats = recordAnswer("colors", false, 2000);
      expect(stats.wrongAnswers).toBe(1);
      expect(stats.streak).toBe(0);
      expect(stats.bestStreak).toBe(2);
    });

    it("tracks best streak correctly", () => {
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", false, 1000);
      recordAnswer("colors", true, 1000);
      const stats = recordAnswer("colors", true, 1000);
      expect(stats.bestStreak).toBe(3);
      expect(stats.streak).toBe(2);
    });

    it("tracks category stats separately", () => {
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      recordAnswer("animals", false, 2000);
      const stats = recordAnswer("animals", true, 1500);

      expect(stats.categoryStats.colors.played).toBe(2);
      expect(stats.categoryStats.colors.correct).toBe(2);
      expect(stats.categoryStats.animals.played).toBe(2);
      expect(stats.categoryStats.animals.correct).toBe(1);
    });

    it("calculates average time per category", () => {
      recordAnswer("colors", true, 1000);
      const stats = recordAnswer("colors", true, 3000);
      expect(stats.categoryStats.colors.averageTime).toBe(2000);
    });
  });

  describe("resetStats", () => {
    it("resets all stats to default", () => {
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      resetStats();
      const stats = getStats();
      expect(stats.totalGames).toBe(0);
      expect(stats.correctAnswers).toBe(0);
    });
  });

  describe("getAccuracyPercent", () => {
    it("returns 0 when no games played", () => {
      expect(getAccuracyPercent(getStats())).toBe(0);
    });

    it("calculates correct percentage", () => {
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", true, 1000);
      recordAnswer("colors", false, 1000);
      const stats = getStats();
      expect(getAccuracyPercent(stats)).toBe(67);
    });
  });

  describe("getCategoryAccuracy", () => {
    it("returns 0 for unknown category", () => {
      expect(getCategoryAccuracy(getStats(), "unknown")).toBe(0);
    });

    it("calculates per-category accuracy", () => {
      recordAnswer("shapes", true, 1000);
      recordAnswer("shapes", false, 1000);
      const stats = getStats();
      expect(getCategoryAccuracy(stats, "shapes")).toBe(50);
    });
  });
});
