export interface Challenge {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  emoji: string;
}

interface DailyContent {
  greeting: string;
  suggestedActivity: string;
  funFact: string;
  challengeOfTheDay: Challenge;
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
  numbers: [
    { id: "n1", category: "numbers", difficulty: "easy", question: "كم عدد أصابع اليد الواحدة؟", correctAnswer: "5", options: ["5", "3", "4", "6"], emoji: "✋" },
    { id: "n2", category: "numbers", difficulty: "easy", question: "1 + 1 = ؟", correctAnswer: "2", options: ["2", "3", "1", "4"], emoji: "🧮" },
    { id: "n3", category: "numbers", difficulty: "easy", question: "كم عين عندك؟", correctAnswer: "2", options: ["2", "1", "3", "4"], emoji: "👀" },
    { id: "n4", category: "numbers", difficulty: "medium", question: "2 + 2 = ؟", correctAnswer: "4", options: ["4", "3", "5", "2"], emoji: "➕" },
    { id: "n5", category: "numbers", difficulty: "medium", question: "كم رجل للقطة؟", correctAnswer: "4", options: ["4", "2", "6", "3"], emoji: "🐱" },
    { id: "n6", category: "numbers", difficulty: "hard", question: "3 + 2 = ؟", correctAnswer: "5", options: ["5", "4", "6", "3"], emoji: "🔢" },
  ],
};

export function getRandomChallenge(category: string, difficulty: string): Challenge {
  const categoryData = challenges[category] || challenges.colors;
  const filtered = categoryData.filter((c) => c.difficulty === difficulty);
  const pool = filtered.length > 0 ? filtered : categoryData;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getChallengesByCategory(category: string): Challenge[] {
  return challenges[category] || [];
}

export function getDailyContent(childAge: number): DailyContent {
  const greetings = [
    "صباح الخير يا بطل! 🌞",
    "أهلاً يا نجم! ⭐",
    "مرحباً يا ذكي! 🧠",
    "هيا نلعب ونتعلم! 🎮",
  ];

  const activities = childAge <= 3
    ? ["تعلم الألوان مع الفواكه", "ابحث عن الأشكال في البيت", "قلّد أصوات الحيوانات"]
    : ["عدّ الأشياء من حولك", "ارسم الأشكال الهندسية", "تعلم أسماء الحيوانات بالإنجليزية"];

  const funFacts = [
    "الفيل هو أكبر حيوان يعيش على اليابسة! 🐘",
    "النحلة تزور أكثر من 1000 زهرة كل يوم! 🐝",
    "الزرافة لسانها أزرق اللون! 🦒",
    "القطة تنام 16 ساعة في اليوم! 🐱",
  ];

  const difficulty = childAge <= 3 ? "easy" : childAge <= 5 ? "medium" : "hard";
  const categories = Object.keys(challenges);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  return {
    greeting: greetings[Math.floor(Math.random() * greetings.length)],
    suggestedActivity: activities[Math.floor(Math.random() * activities.length)],
    funFact: funFacts[Math.floor(Math.random() * funFacts.length)],
    challengeOfTheDay: getRandomChallenge(randomCategory, difficulty),
  };
}
