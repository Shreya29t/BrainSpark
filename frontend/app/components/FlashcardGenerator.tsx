"use client";

import { useState } from "react";
import {
  FileText,
  ImageIcon,
  Type,
  Upload,
} from "lucide-react";

interface Flashcard {
  question: string;
  answer: string;
}

interface Props {
  setQuizData: (
    quiz: any[]
  ) => void;
}

export default function FlashcardGenerator({
  setQuizData,
}: Props) {

  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [uploadType,
    setUploadType] =
    useState("pdf");

  const [flashcards,
    setFlashcards] =
    useState<
      Flashcard[]
    >([]);

  const [loading,
    setLoading] =
    useState(false);

  const [flipped,
    setFlipped] =
    useState<number | null>(
      null
    );

  const handleUpload =
    async () => {

      sessionStorage.removeItem(
        "quizData"
      );

      if (!file) {
        alert(
          "Please upload a file first 📚"
        );
        return;
      }

      setLoading(
        true
      );

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      try {

        const response =
          await fetch(
            "http://127.0.0.1:8000/upload-pdf",
            {
              method:
                "POST",
              body:
                formData,
            }
          );

        const data =
          await response.json();

        console.log(
          "API Response:",
          data
        );

        // Flashcards
        if (
          data.flashcards
        ) {
          setFlashcards(
            data.flashcards
          );
        }

        // Quiz
        if (
          data.quiz
        ) {

          setQuizData(
            data.quiz
          );

          sessionStorage.setItem(
            "quizData",
            JSON.stringify(
              data.quiz
            )
          );
        }

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          "Something went wrong"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  return (
    <section
      id="flashcards"
      className="py-24 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI Flashcard Generator
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Upload study material and
            generate smart flashcards instantly.
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm p-8 mb-16">

          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-5">
            Choose Upload Type
          </h3>

          {/* Upload Type */}
          <div className="flex flex-wrap gap-4 mb-8">

            {[
              {
                name: "pdf",
                icon:
                  <FileText size={18} />,
              },
              {
                name: "image",
                icon:
                  <ImageIcon size={18} />,
              },
              {
                name: "text",
                icon:
                  <Type size={18} />,
              },
            ].map((type) => (
              <button
                key={
                  type.name
                }
                type="button"
                onClick={() =>
                  setUploadType(
                    type.name
                  )
                }
                className={`px-5 py-3 rounded-2xl flex items-center gap-2 font-medium transition ${
                  uploadType ===
                  type.name
                    ? "bg-sky-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {type.icon}
                {type.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-[28px] p-10 text-center">

            <Upload
              size={40}
              className="mx-auto text-sky-500 mb-4"
            />

            <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Upload Study Material
            </h4>

            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Upload PDFs, notes or
              documents
            </p>

            {/* Upload */}
            <label className="cursor-pointer inline-block">

              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => {

                  const selectedFile =
                    e.target
                      .files?.[0];

                  if (
                    selectedFile
                  ) {
                    setFile(
                      selectedFile
                    );
                  }
                }}
              />

              <span className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-2xl transition font-medium">
                Browse Files
              </span>
            </label>

            {/* File Name */}
            {file && (
              <p className="mt-5 text-slate-600 dark:text-slate-300">
                Selected File:
                {" "}
                <span className="font-semibold">
                  {file.name}
                </span>
                {" "}✅
              </p>
            )}
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={
              handleUpload
            }
            disabled={
              loading
            }
            className="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-2xl font-semibold transition shadow-sm"
          >
            {loading
              ? "Generating..."
              : "Generate Flashcards"}
          </button>
        </div>

        {/* Flashcards */}
        {flashcards.length >
          0 && (
          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">
              Generated Flashcards
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {flashcards.map(
                (
                  card,
                  index
                ) => {

                  const isFlipped =
                    flipped ===
                    index;

                  return (
                    <div
                      key={
                        index
                      }
                      onClick={() =>
                        setFlipped(
                          isFlipped
                            ? null
                            : index
                        )
                      }
                      className="cursor-pointer rounded-[32px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 shadow-sm hover:shadow-lg transition min-h-[260px]"
                    >

                      <div className="flex justify-between mb-5">

                        <span className="text-sky-500 text-sm font-semibold">
                          {isFlipped
                            ? "Answer"
                            : "Question"}
                        </span>

                        <span className="text-xs text-slate-400">
                          Tap to flip
                        </span>
                      </div>

                      <p className="text-lg leading-8 text-slate-800 dark:text-slate-200">
                        {isFlipped
                          ? card.answer
                          : card.question}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            {/* Start Quiz */}
            <div className="flex justify-center mt-14">

              <button
                type="button"
                onClick={() => {

                  const storedQuiz =
                    sessionStorage.getItem(
                      "quizData"
                    );

                  if (
                    !storedQuiz
                  ) {
                    alert(
                      "Please generate quiz first 📚"
                    );
                    return;
                  }

                  window.location.assign(
                    "/quiz"
                  );
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-[20px] text-lg font-semibold shadow-md transition hover:scale-105"
              >
                Start Quiz 🚀
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}