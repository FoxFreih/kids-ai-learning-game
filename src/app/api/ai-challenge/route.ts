import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `أنت معلم أطفال محترف. تصنع أسئلة تعليمية ممتعة للأطفال بعمر 3-6 سنوات.

القواعد:
- الأسئلة يجب أن تكون بسيطة ومناسبة للأطفال
- استخدم لغة عربية بسيطة
- كل سؤال يجب أن يكون له إجابة واحدة صحيحة و3 إجابات خاطئة
- أضف emoji مناسب لكل سؤال
- أضف تلميح بسيط إذا كان السؤال متوسط أو صعب

أجب بصيغة JSON فقط بدون أي نص إضافي.`;

function buildUserPrompt(category: string, difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    easy: "سهل جداً (لطفل عمره 3 سنوات)",
    medium: "متوسط (لطفل عمره 4-5 سنوات)",
    hard: "صعب قليلاً (لطفل عمره 5-6 سنوات)",
  };

  const categoryMap: Record<string, string> = {
    colors: "الألوان - اسأل عن ألوان أشياء من حياة الطفل اليومية (فواكه، حيوانات، طبيعة)",
    shapes: "الأشكال الهندسية - اسأل عن أشكال أشياء حقيقية أو عدد الأضلاع",
    animals: "الحيوانات - اسأل عن أصوات أو صفات أو أماكن عيش الحيوانات",
    numbers: "الأرقام والعد - اسأل عن عد أشياء بسيطة أو جمع سهل",
  };

  return `اصنع سؤال تعليمي واحد:
- الفئة: ${categoryMap[category] || categoryMap.colors}
- المستوى: ${difficultyMap[difficulty] || difficultyMap.easy}

أجب بهذه الصيغة بالضبط:
{
  "id": "ai_${Date.now()}",
  "category": "${category}",
  "difficulty": "${difficulty}",
  "question": "السؤال هنا",
  "correctAnswer": "الإجابة الصحيحة",
  "options": ["الإجابة الصحيحة", "خيار خاطئ 1", "خيار خاطئ 2", "خيار خاطئ 3"],
  "hint": "تلميح بسيط (اختياري)",
  "emoji": "emoji مناسب واحد"
}`;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// أسئلة احتياطية إذا لم يكن هناك مفتاح API
const fallbackChallenges: Record<string, object[]> = {
  colors: [
    { id: "fb_c1", category: "colors", difficulty: "easy", question: "ما لون التفاحة؟", correctAnswer: "أحمر", options: ["أحمر", "أزرق", "أخضر", "أصفر"], emoji: "🍎" },
    { id: "fb_c2", category: "colors", difficulty: "easy", question: "ما لون الموز؟", correctAnswer: "أصفر", options: ["أصفر", "أحمر", "أخضر", "بنفسجي"], emoji: "🍌" },
    { id: "fb_c3", category: "colors", difficulty: "medium", question: "ما لون الجزر؟", correctAnswer: "برتقالي", options: ["برتقالي", "أحمر", "أصفر", "بني"], emoji: "🥕" },
  ],
  shapes: [
    { id: "fb_s1", category: "shapes", difficulty: "easy", question: "البيتزا شكلها مثل...", correctAnswer: "دائرة", options: ["دائرة", "مربع", "مثلث", "نجمة"], emoji: "🍕" },
    { id: "fb_s2", category: "shapes", difficulty: "easy", question: "الباب شكله مثل...", correctAnswer: "مربع", options: ["مربع", "دائرة", "مثلث", "نجمة"], emoji: "🚪" },
  ],
  animals: [
    { id: "fb_a1", category: "animals", difficulty: "easy", question: "أي حيوان يحب الجزر؟", correctAnswer: "أرنب", options: ["أرنب", "قطة", "كلب", "أسد"], hint: "له أذنان طويلتان", emoji: "🥕" },
    { id: "fb_a2", category: "animals", difficulty: "easy", question: "أي حيوان يعطينا البيض؟", correctAnswer: "دجاجة", options: ["دجاجة", "بقرة", "قطة", "أسد"], emoji: "🥚" },
  ],
  numbers: [
    { id: "fb_n1", category: "numbers", difficulty: "easy", question: "كم أذن عندك؟", correctAnswer: "2", options: ["2", "1", "3", "4"], emoji: "👂" },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "colors";
  const difficulty = searchParams.get("difficulty") || "easy";

  // إذا لم يكن هناك مفتاح API، استخدم الأسئلة الاحتياطية
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your-api-key-here") {
    const pool = fallbackChallenges[category] || fallbackChallenges.colors;
    const challenge = pool[Math.floor(Math.random() * pool.length)] as Record<string, unknown>;
    if (Array.isArray(challenge.options)) {
      challenge.options = shuffle(challenge.options as string[]);
    }
    return NextResponse.json({ ...challenge, source: "fallback" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(category, difficulty) },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const challenge = JSON.parse(jsonMatch[0]);
    challenge.options = shuffle(challenge.options);
    challenge.source = "ai";

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("AI generation failed, using fallback:", error);
    const pool = fallbackChallenges[category] || fallbackChallenges.colors;
    const challenge = pool[Math.floor(Math.random() * pool.length)] as Record<string, unknown>;
    if (Array.isArray(challenge.options)) {
      challenge.options = shuffle(challenge.options as string[]);
    }
    return NextResponse.json({ ...challenge, source: "fallback" });
  }
}
