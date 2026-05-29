"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/firebase";

import {
  Brain,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router =
    useRouter();

  const handleLogin =
    async () => {
      try {
        await signInWithPopup(
          auth,
          provider
        );

        // Go to BrainSpark homepage
        router.push(
          "/home"
        );
      } catch (error) {
        console.error(
          "Login Error:",
          error
        );

        alert(
          "Google login failed. Please try again."
        );
      }
    };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6">

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl rounded-[36px] border border-slate-200 dark:border-slate-800 shadow-xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-[28px] bg-sky-500 flex items-center justify-center shadow-lg">

            <Brain
              size={38}
              className="text-white"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Brain
            <span className="text-sky-500">
              Spark
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8">
            Smarter learning with
            AI-powered flashcards
            and quizzes.
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={
            handleLogin
          }
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-2xl font-semibold text-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-3"
        >
          <Sparkles
            size={20}
          />

          Continue with Google
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Continue your learning
          journey with BrainSpark 🚀
        </p>
      </div>
    </main>
  );
}