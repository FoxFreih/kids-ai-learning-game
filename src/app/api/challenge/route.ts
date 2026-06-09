import { NextRequest, NextResponse } from "next/server";

interface Challenge {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  emoji: string;
}

const challenges: Record<string, Challenge[]> = {
  colors: [
    { id: "c1", category: "colors", difficulty: "easy", question: "ما هو لون السماء؟", correctAnswer: "أزرق", options: ["أزرق", "أحمر", "أخضر", "أصفر"], emoji: "🌤️" },
    { id: "c2", category: "colors", difficulty: "easy", question: "ما هو لون الشمس؟", correctAnswer: "أصفر", options: ["أصفر", "أزرق", "بنفسجي", "أخضر"], emoji: "☀️" },
    { id: "c3", category: "colors", difficulty: "easy", question: "ما هو لون العشب؟", correctAnswer: "أخضر", options: ["أخضر", "أحمر", "أزرق", "برتقالي"], emoji: "🌿" },
    { id: "c4", category: "colors", difficulty: "medium", question: "ما هو لون الباذنجان؟", correctAnswer: "بنفسجي", options: ["بنفسجي", "أحمر", "أزرق", "أسود"], emoji: "🍆" },
    { id: "c5", category: "colors", difficulty: "medium", question: "ما هو لون البرتقالة؟", correctAnswer: "برتقالي", options: ["برتقالي", "أصفر", "أحمر", "وردي"], emoji: "🍊" },
    { id: "c6", category: "colors", difficulty: "hard", question: "ما هو لون الفلامنغو؟", correctAnswer: "وردي", options: ["وردي", "أحمر", "برتقالي", "بنفسجي"], emoji: "🦩" },
  ],
  shapes: [
    { id: "s1", category: "shapes", difficulty: "easy", question: "الكرة شكلها مثل...", correctAnswer: "دائرة", options: ["دائرة", "مربع", "مثلث", "نجمة"], emoji: "⚽" },
    { id: "s2", category: "shapes", difficulty: "easy", question: "التلفاز شكله مثل...", correctAnswer: "مربع", options: ["مربع", "دائرة", "مثلث", "معين"], emoji: "📺" },
    { id: "s3", category: "shapes", difficulty: "easy", question: "الهرم شكله مثل...", correctAnswer: "مثلث", options: ["مثلث", "مربع", "دائرة", "نجمة"], emoji: "🔺" },
    { id: "s4", category: "shapes", difficulty: "medium", question: "كم ضلع للمثلث؟", correctAnswer: "3", options: ["3", "4", "5", "2"], emoji: "📐" },
    { id: "s5", category: "shapes", difficulty: "medium", question: "كم ضلع للمربع؟", correctAnswer: "4", options: ["4", "3", "5", "6"], emoji: "⬜" },
    { id: "s6", category: "shapes", difficulty: "hard", question: "أي شكل ليس له زوايا؟", correctAnswer: "دائرة", options: ["دائرة", "مربع", "مثلث", "معين"], emoji: "🔵" },
  ],
  animals: [
    { id: "a1", category: "animals", difficulty: "easy", question: "أي حيوان يقول 'مياو'؟", correctAnswer: "قطة", options: ["قطة", "كلب", "أسد", "أرنب"], hint: "حيوان أليف صغير", emoji: "🐱" },
    { id: "a2", category: "animals", difficulty: "easy", question: "أي حيوان له خرطوم طويل؟", correctAnswer: "فيل", options: ["فيل", "زرافة", "أسد", "قرد"], hint: "هو أكبر حيوان بري", emoji: "🐘" },
    { id: "a3", category: "animals", difficulty: "easy", question: "أي حيوان يعطينا الحليب؟", correctAnswer: "بقرة", options: ["بقرة", "دجاجة", "قطة", "أرنب"], emoji: "🐮" },
    { id: "a4", category: "animals", difficulty: "medium", question: "أي حيوان يطير؟", correctAnswer: "عصفور", options: ["عصفور", "سمكة", "قطة", "أرنب"], emoji: "🐦" },
    { id: "a5", category: "animals", difficulty: "medium", question: "أي حيوان يعيش في الماء؟", correctAnswer: "سمكة", options: ["سمكة", "أسد", "قرد", "دجاجة"], emoji: "🐟" },
    { id: "a6", category: "animals", difficulty: "hard", question: "أي حيوان ينام في النهار ويستيقظ في الليل؟", correctAnswer: "بومة", options: ["بومة", "دجاجة", "عصفور", "نحلة"], emoji: "🦉" },
  ],
};

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "colors";
  const difficulty = searchParams.get("difficulty") || "easy";

  const categoryData = challenges[category] || challenges.colors;
  const filtered = categoryData.filter((c) => c.difficulty === difficulty);
  const pool = filtered.length > 0 ? filtered : categoryData;

  const challenge = pool[Math.floor(Math.random() * pool.length)];
  challenge.options = shuffle(challenge.options);

  return NextResponse.json(challenge);
}
