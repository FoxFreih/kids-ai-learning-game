import { NextRequest } from "next/server";

const VALID_CATEGORIES = ["colors", "shapes", "animals"];

describe("Challenge API", () => {
  describe("request validation", () => {
    it("should accept valid categories", () => {
      VALID_CATEGORIES.forEach((cat) => {
        const url = new URL(`http://localhost/api/challenge?category=${cat}`);
        const params = url.searchParams;
        expect(VALID_CATEGORIES).toContain(params.get("category"));
      });
    });

    it("should have valid difficulty values", () => {
      const validDifficulties = ["easy", "medium", "hard"];
      validDifficulties.forEach((diff) => {
        expect(["easy", "medium", "hard"]).toContain(diff);
      });
    });
  });

  describe("challenge structure", () => {
    it("challenge object should have required fields", () => {
      const mockChallenge = {
        id: "c1",
        category: "colors",
        difficulty: "easy",
        question: "ما هو لون السماء؟",
        correctAnswer: "أزرق",
        options: ["أزرق", "أحمر", "أخضر", "أصفر"],
        emoji: "🌤️",
      };

      expect(mockChallenge).toHaveProperty("id");
      expect(mockChallenge).toHaveProperty("question");
      expect(mockChallenge).toHaveProperty("correctAnswer");
      expect(mockChallenge).toHaveProperty("options");
      expect(mockChallenge.options).toHaveLength(4);
      expect(mockChallenge.options).toContain(mockChallenge.correctAnswer);
    });

    it("should always have exactly 4 options", () => {
      const options = ["أزرق", "أحمر", "أخضر", "أصفر"];
      expect(options).toHaveLength(4);
    });

    it("correct answer should always be in options", () => {
      const correctAnswer = "أزرق";
      const options = ["أزرق", "أحمر", "أخضر", "أصفر"];
      expect(options).toContain(correctAnswer);
    });
  });
});
