"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage first, then system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      // No saved preference, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDark(prefersDark);
      if (prefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const toggle = () => {
    if (dark === null) return;

    const next = !dark;
    setDark(next);

    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || dark === null) {
    return (
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/15">
        <span className="text-white/40">⏳</span>
      </div>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/15 text-white/80 hover:bg-white/5 transition-colors"
    >
      {dark ? <span>🌙</span> : <span>☀️</span>}
    </button>
  );
}
