"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";

// Helper function for conditional classes
const cn = (...inputs: (string | undefined | null | boolean)[]) => clsx(inputs);

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down to footer area (last 30% of page)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show button when scrolled past 70% of the page height
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      setIsVisible(scrollPercentage > 0.7);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
        "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-red-primary text-white shadow-red-lg hover:bg-red-secondary transition-all duration-300 ease-out group",
        "hover:scale-110 hover:shadow-red-lg hover:shadow-2xl",
        "focus:outline-none focus:ring-4 focus:ring-red-primary/50",
        "back-to-top-button"
      )}
      aria-label="Back to top"
    >
      {/* Animated arrow icon */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "transition-all duration-300 ease-out",
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
