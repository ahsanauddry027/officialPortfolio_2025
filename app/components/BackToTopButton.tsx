"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";

// Helper function for conditional classes - Vercel deployment fix
const cn = (...inputs: (string | undefined | null | boolean)[]) => clsx(inputs);

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down to footer area
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Show button earlier on mobile devices (60% vs 70% on desktop)
      const isMobile = window.innerWidth <= 768;
      const threshold = isMobile ? 0.6 : 0.7;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      setIsVisible(scrollPercentage > threshold);
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility); // Recalculate on resize
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback to top of page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-primary text-white shadow-red-lg hover:bg-red-secondary transition-all duration-300 ease-out group",
        "hover:scale-110 hover:shadow-red-lg hover:shadow-2xl",
        "focus:outline-none focus:ring-4 focus:ring-red-primary/50",
        "back-to-top-button",
        "md:bottom-6 md:right-6"
      )}
      aria-label="Back to top"
    >
      {/* Animated arrow icon */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "transition-all duration-300 ease-out sm:w-6 sm:h-6",
            isHovered ? "transform -translate-y-1" : "transform translate-y-0"
          )}
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-red-primary/30 blur-md transition-all duration-300",
            isHovered ? "opacity-100 scale-150" : "opacity-0 scale-100"
          )}
        />
      </div>

      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full border-2 border-red-primary/30 animate-ping" />
    </button>
  );
}
