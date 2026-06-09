"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GameStats } from "@/types";
import { getStats, getAccuracyPercent, getCategoryAccuracy, resetStats } from "@/services/statsService";

const CATEGORY_LABELS: Record<string, { name: string; emoji: string }> = {
  colors: { name: "الألوان", emoji: "🎨" },
  shapes: { name: "الأشكال", emoji: "🔷" },
  animals: { name: "الحيوانات", emoji: "🦁" },
  numbers: { name: "الأرقام", emoji: "🔢" },
};

export default function ParentDashboard() {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    setStats(getStats());
  }, []);

  const handleReset = () => {
    resetStats();
    setStats(getStats());
    setShowReset(false);
  };

  if (!stats) return null;

  const accuracy = getAccuracyPercent(stats);
  const categories = Object.keys(stats.categoryStats);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-white">📊 لوحة تحكم الأهل</h2>

      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <StatCard
          label="مجموع الألعاب"
          value={stats.totalGames}
          emoji="🎮"
          color="bg-blue-500"
        />
        <StatCard
          label="إجابات صحيحة"
          value={stats.correctAnswers}
          emoji="✅"
          color="bg-green-500"
        />
        <StatCard
          label="أفضل سلسلة"
          value={stats.bestStreak}
          emoji="🔥"
          color="bg-orange-500"
        />
        <StatCard
          label="نسبة النجاح"
          value={`${accuracy}%`}
          emoji="📈"
          color="bg-purple-500"
        />
      </div>

      {/* شريط التقدم */}
      <div className="w-full bg-white/90 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-700 mb-4">نسبة النجاح الإجمالية</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${accuracy}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${
              accuracy >= 70 ? "bg-green-500" : accuracy >= 40 ? "bg-yellow-500" : "bg-red-400"
            }`}
          />
        </div>
        <p className="text-center mt-2 text-gray-600">
          {accuracy >= 70 ? "ممتاز! طفلك يتعلم بسرعة 🌟" :
           accuracy >= 40 ? "جيد! يحتاج المزيد من التمرين 💪" :
           stats.totalGames === 0 ? "لم يلعب بعد - هيا نبدأ! 🎮" :
           "يحتاج مساعدة - جربي المستوى السهل 🤗"}
        </p>
      </div>

      {/* إحصائيات كل فئة */}
      {categories.length > 0 && (
        <div className="w-full bg-white/90 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-700 mb-4">الأداء حسب الفئة</h3>
          <div className="space-y-4">
            {categories.map((cat) => {
              const catInfo = CATEGORY_LABELS[cat] || { name: cat, emoji: "📚" };
              const catAccuracy = getCategoryAccuracy(stats, cat);
              const catStat = stats.categoryStats[cat];

              return (
                <div key={cat} className="flex items-center gap-4">
                  <span className="text-3xl w-10">{catInfo.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-gray-700">{catInfo.name}</span>
                      <span className="text-sm text-gray-500">
                        {catStat.correct}/{catStat.played} ({catAccuracy}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${catAccuracy}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* آخر لعب */}
      <div className="w-full bg-white/90 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-700 mb-2">آخر مرة لعب</h3>
        <p className="text-gray-600">
          {stats.totalGames > 0
            ? new Date(stats.lastPlayed).toLocaleDateString("ar-SA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "لم يلعب بعد"}
        </p>
      </div>

      {/* زر إعادة الضبط */}
      <div className="mt-4">
        {!showReset ? (
          <button
            onClick={() => setShowReset(true)}
            className="text-white/60 hover:text-white text-sm underline transition-colors"
          >
            إعادة ضبط الإحصائيات
          </button>
        ) : (
          <div className="bg-red-100 rounded-xl p-4 flex gap-3 items-center">
            <p className="text-red-700 text-sm">هل أنت متأكد؟ سيتم حذف كل الإحصائيات</p>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
            >
              نعم، احذف
            </button>
            <button
              onClick={() => setShowReset(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  emoji,
  color,
}: {
  label: string;
  value: string | number;
  emoji: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${color} rounded-2xl p-4 text-white text-center shadow-lg`}
    >
      <span className="text-3xl block">{emoji}</span>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs mt-1 opacity-80">{label}</p>
    </motion.div>
  );
}
