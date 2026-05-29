"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

import {
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  auth,
} from "@/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function Navbar() {
  const {
    theme,
    setTheme,
  } = useTheme();

  const [mounted,
    setMounted] =
    useState(false);

  const [user,
    setUser] =
    useState<User | null>(
      null
    );

  useEffect(() => {
    setMounted(true);

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (
          currentUser
        ) => {
          setUser(
            currentUser
          );
        }
      );

    return () =>
      unsubscribe();
  }, []);

  const handleLogout =
    async () => {
      await signOut(
        auth
      );

      window.location.href =
        "/login";
    };

  if (!mounted)
    return null;

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/home"
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Brain
            <span className="text-sky-500">
              Spark
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme(
                  theme ===
                    "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-105 transition"
            >
              {theme ===
              "dark" ? (
                <Sun size={22} />
              ) : (
                <Moon size={22} />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={
                handleLogout
              }
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-300 font-medium"
            >
              <LogOut
                size={18}
              />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      {user && (
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back,
            {" "}
            <span className="text-sky-500">
              {
                user.displayName
              }
            </span>
            {" "}👋
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
            Ready to study today?
          </p>
        </div>
      )}
    </>
  );
}