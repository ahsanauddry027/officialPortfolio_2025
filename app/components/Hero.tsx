"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const roles = useMemo(
    () => [
      "Full-Stack Developer",
      "UI/UX Enthusiast",
      "Open Source Contributor",
    ],
    []
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIndex % roles.length] + ".....";
    const step = () => {
      if (!deleting) {
        const next = full.slice(0, display.length + 1);
        setDisplay(next);
        if (next === full) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        const next = full.slice(0, Math.max(0, display.length - 1));
        setDisplay(next);
        if (next.length === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    };
    const delay = deleting ? 50 : 90;
    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [display, deleting, roleIndex, roles]);

  return (
    <section
      id="home"
      className="relative min-h-[70svh] sm:min-h-[75svh] md:min-h-[88svh] flex items-center border border-foreground/20 rounded-lg px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 hover:border-opacity-80 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] cursor-pointer group bg-background/50"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-20%,rgba(120,119,198,0.18),transparent)] group-hover:bg-[radial-gradient(1200px_500px_at_50%_-20%,rgba(120,119,198,0.25),transparent)] transition-all duration-500" />
        <div className="absolute -inset-24 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(120,119,198,0.1),transparent,rgba(120,119,198,0.1))] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,rgba(120,119,198,0.15),transparent,rgba(120,119,198,0.15))] transition-all duration-500" />
      </div>
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-widest uppercase text-foreground/60"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,rgba(120,119,198,1),rgba(120,119,198,0.2))] font-[var(--font-display)]"
        >
          Ahsan Habib
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl"
        >
          <span className="text-foreground">{display}</span>
          <span className="inline-block w-[1ch] -mb-[2px] animate-pulse">
            |
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            href="#contact"
            className="group h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full relative overflow-hidden text-sm font-medium"
          >
            <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(120,119,198,0.9),rgba(120,119,198,0.3))] opacity-90" />
            <span className="relative text-background">Contact Me</span>
          </a>
          <a
            href="https://github.com/ahsanauddry027"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
