"use client";

import {
  FileText,
  Brain,
  CircleHelp,
  Languages,
  ImageIcon,
} from "lucide-react";

export default function FeatureCards() {

  const handleQuiz =
    () => {

      const storedQuiz =
        sessionStorage.getItem(
          "quizData"
        );

      if (
        !storedQuiz ||
        storedQuiz ===
          "[]"
      ) {
        alert(
          "Please upload notes and generate flashcards first 📚"
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

          alert(
            "Please upload notes first 📚"
          );

          return;
        }

        window.location.href =
          "/quiz";

      } catch (
        error
      ) {

        console.error(
          error
        );

        sessionStorage.removeItem(
          "quizData"
        );

        alert(
          "Please upload notes first 📚"
        );
      }
    };

  const features = [
    {
      title:
        "Upload Documents",
      description:
        "Upload PDFs, DOCX files, notes, and study material instantly.",
      icon: FileText,
      action: () => {
        document
          .getElementById(
            "flashcards"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
          });
      },
    },

    {
      title:
        "AI Flashcards",
      description:
        "Generate smart flashcards automatically from your study content.",
      icon: Brain,
      action: () => {
        document
          .getElementById(
            "flashcards"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
          });
      },
    },

    {
      title:
        "Quiz Generator",
      description:
        "Practice concepts using AI-generated quizzes and boost retention.",
      icon: CircleHelp,
      action:
        handleQuiz,
    },

    {
      title:
        "Multi-language",
      description:
        "Generate flashcards in different languages for flexible learning.",
      icon: Languages,
      action: () => {
        document
          .getElementById(
            "flashcards"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
          });
      },
    },

    {
      title:
        "Image Upload",
      description:
        "Convert text from images into smart study flashcards.",
      icon: ImageIcon,
      action: () => {
        document
          .getElementById(
            "flashcards"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
          });
      },
    },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need to
            Study Smarter
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Powerful AI tools designed
            to make learning easier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map(
            (
              feature,
              index
            ) => {
              const Icon =
                feature.icon;

              return (
                <button
                  key={index}
                  onClick={
                    feature.action
                  }
                  className="text-left rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >

                  <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                    <Icon
                      size={30}
                      className="text-sky-500"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {
                      feature.title
                    }
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-8">
                    {
                      feature.description
                    }
                  </p>

                </button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}