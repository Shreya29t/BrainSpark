"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import FlashcardGenerator from "../components/FlashcardGenerator";
import QuizGenerator from "../components/QuizGenerator";
import Footer from "../components/Footer";

export default function HomePage() {
  const [quizData, setQuizData] =
    useState<any[]>([]);

  // Always open at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <FeatureCards />

      {/* Flashcard Generator */}
      <FlashcardGenerator
        setQuizData={
          setQuizData
        }
      />

      {/* Quiz Generator */}
      <QuizGenerator
        quizData={
          quizData
        }
      />

      {/* About */}
      <section
        id="about"
        className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About BrainSpark
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-8">
            BrainSpark helps students
            transform PDFs, notes,
            images, and study material
            into intelligent flashcards
            and quizzes using AI —
            making learning smarter,
            faster, and more effective.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}



















