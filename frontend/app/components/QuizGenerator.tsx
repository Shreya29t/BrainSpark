"use client";

import { useState, useEffect } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface Props {
  quizData: QuizQuestion[];
}

export default function QuizGenerator({ quizData }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // ✅ useEffect BEFORE any early return
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      if (currentQuestion < (quizData?.length ?? 0) - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelected(null);
        setCountdown(null);
      } else {
        setShowScore(true);
      }
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, currentQuestion, quizData]);

  // ✅ Early return AFTER all hooks
  if (!quizData || quizData.length === 0) return null;

  const currentQuiz = quizData[currentQuestion];

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === currentQuiz.answer) {
      setScore((prev) => prev + 1);
    }
    setCountdown(3);
  };

  const progress = selected
    ? (((currentQuestion + 1) / quizData.length) * 100)
    : ((currentQuestion / quizData.length) * 100);

  const getOptionColor = (option: string): string => {
    if (!selected) return "#e2e8f0";
    if (option === currentQuiz.answer) return "#34d399";
    if (selected === option) return "#f87171";
    return "#475569";
  };

  if (showScore) {
    const percentage = Math.round((score / quizData.length) * 100);
    const emoji =
      percentage === 100 ? "🏆" : percentage >= 70 ? "🎉" : percentage >= 40 ? "👍" : "💪";

    return (
      <section className="max-w-2xl mx-auto py-20">
        <div
          className="border border-slate-700 rounded-[36px] p-14 text-center"
          style={{ background: "transparent" }}
        >
          <div className="text-6xl mb-6">{emoji}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-slate-400 text-base mb-10">Here's how you did</p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <span style={{ fontSize: "6rem", fontWeight: 700, color: "#38bdf8", lineHeight: 1 }}>
              {score}
            </span>
            <div className="flex flex-col items-start gap-1">
              <span style={{ color: "#64748b", fontSize: "1rem" }}>out of</span>
              <span style={{ color: "#cbd5e1", fontSize: "2rem", fontWeight: 700 }}>
                {quizData.length}
              </span>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${percentage}%`,
                backgroundColor:
                  percentage >= 70 ? "#34d399" : percentage >= 40 ? "#fbbf24" : "#f87171",
              }}
            />
          </div>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>{percentage}% correct</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-12">
      <div
        className="border border-slate-700 rounded-[36px] p-10 md:p-12"
        style={{ background: "transparent" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">
              Question
            </p>
            <h3 className="text-xl font-semibold text-white">
              {currentQuestion + 1}
              <span className="text-slate-500 font-light">/{quizData.length}</span>
            </h3>
          </div>

          <div className="flex items-center gap-6">
            {countdown !== null && (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full border-2"
                style={{ borderColor: "#38bdf8", color: "#38bdf8", fontSize: "1.1rem", fontWeight: 700 }}
              >
                {countdown}
              </div>
            )}
            <div className="text-right">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">
                Score
              </p>
              <h3 className="text-xl font-semibold" style={{ color: "#38bdf8" }}>
                {score}
              </h3>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: "#38bdf8" }}
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-10">
          {currentQuiz.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-1">
          {currentQuiz.options.map((option, index) => {
            const color = getOptionColor(option);
            const isCorrect = option === currentQuiz.answer;
            const isWrong = selected === option && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default"
                style={{ background: "transparent", border: "none", color }}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <span
                    className="flex-shrink-0 text-xs font-bold"
                    style={{ color, minWidth: "1.5rem" }}
                  >
                    {["A", "B", "C", "D"][index]}.
                  </span>
                  <span
                    className="flex-1 min-w-0 whitespace-normal break-words text-base font-medium"
                    style={{ textDecoration: isWrong ? "line-through" : "none", color }}
                  >
                    {option}
                  </span>
                </div>

                {selected && isCorrect && (
                  <span className="flex-shrink-0 font-bold" style={{ color: "#34d399" }}>✓</span>
                )}
                {selected && isWrong && (
                  <span className="flex-shrink-0 font-bold" style={{ color: "#f87171" }}>✗</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}