"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuizGenerator from "../components/QuizGenerator";
import Navbar from "../components/Navbar";

export default function QuizPage() {

  const router =
    useRouter();

  const [quizData,
    setQuizData] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const storedQuiz =
      sessionStorage.getItem(
        "quizData"
      );

    if (
      !storedQuiz
    ) {
      router.push(
        "/home"
      );
      return;
    }

    try {

      const parsedQuiz =
        JSON.parse(
          storedQuiz
        );

      if (
        !parsedQuiz ||
        parsedQuiz.length ===
          0
      ) {

        sessionStorage.removeItem(
          "quizData"
        );

        router.push(
          "/home"
        );

        return;
      }

      setQuizData(
        parsedQuiz
      );

    } catch (
      error
    ) {

      console.error(
        error
      );

      sessionStorage.removeItem(
        "quizData"
      );

      router.push(
        "/home"
      );
    }

    setLoading(
      false
    );

  }, [router]);

  if (
    loading
  ) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push(
              "/home"
            )
          }
          className="mb-8 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          ← Back to Home
        </button>

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Quiz Mode 🧠
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400">
            Test what you learned.
          </p>
        </div>

        <QuizGenerator
          quizData={
            quizData
          }
        />
      </div>
    </main>
  );
}