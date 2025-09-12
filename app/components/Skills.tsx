"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

type Skill = { name: string; description: string; useCase: string };

const skills: Skill[] = [
  {
    name: "React",
    description:
      "Component-based UI library for building interactive interfaces.",
    useCase: "SPA dashboards, dynamic forms, and reusable UI systems.",
  },
  {
    name: "Next.js",
    description:
      "React framework with SSR, SSG, routing, and image optimization.",
    useCase: "SEO-friendly sites, hybrid apps, and fast content platforms.",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript that improves reliability.",
    useCase: "Large codebases, SDKs, and refactor-safe enterprise apps.",
  },
  {
    name: "Node.js",
    description: "Event-driven runtime for building scalable backends.",
    useCase: "APIs, realtime services, CLI tools, and integrations.",
  },
  {
    name: "TailwindCSS",
    description: "Utility-first CSS for rapid, consistent styling.",
    useCase: "Design systems, responsive UIs, and fast iteration.",
  },
  {
    name: "Framer Motion",
    description: "Production-ready animations and gestures for React.",
    useCase: "Micro-interactions, page transitions, and visual polish.",
  },
  {
    name: "MongoDB",
    description: "Document database with flexible schemas.",
    useCase: "Content, analytics, and event data with evolving models.",
  },
  {
    name: "PHP",
    description: "General-purpose language powering many CMS platforms.",
    useCase: "Server-rendered sites, CMS customization, and APIs.",
  },
  {
    name: "MySQL",
    description: "Relational database known for reliability and speed.",
    useCase: "Transactional systems, reporting, and BI pipelines.",
  },
  {
    name: "Java",
    description: "Robust, portable language for large-scale systems.",
    useCase: "Back-office platforms, Android, and enterprise services.",
  },
  {
    name: "Spring Boot",
    description: "Convention-over-configuration framework for Java APIs.",
    useCase: "Microservices, REST APIs, and production-ready backends.",
  },
];

function SkillIcon({ name }: { name: string }) {
  const base = "h-6 w-6";
  switch (name) {
    case "React":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" strokeWidth="1.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.5"
            transform="rotate(60 12 12)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.5"
            transform="rotate(120 12 12)"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm4.5 14.5L9 7v6h2v4h2v-2.5l3.5 3Z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 8h8v2h-3v8h-2V10H8V8Z" fill="var(--background)" />
        </svg>
      );
    case "Node.js":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 2l9 5v10l-9 5-9-5V7l9-5Z" />
          <path d="M8.5 10v4l3.5 2 3.5-2v-4L12 8l-3.5 2Z" />
        </svg>
      );
    case "TailwindCSS":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <path d="M12 6c-3 0-4 2-5 3 1-1 2-1 3-1 2 0 3 1 4 3 1 2 3 3 5 3 3 0 4-2 5-3-1 1-2 1-3 1-2 0-3-1-4-3-1-2-3-3-5-3Z" />
        </svg>
      );
    case "Framer Motion":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <path d="M4 3h10l6 6-6 6H4V3Zm0 12h10v6H4v-6Z" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <path d="M12 2s5 4 5 10-5 10-5 10-5-4-5-10S12 2 12 2Z" />
        </svg>
      );
    case "PHP":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 10h2a1.5 1.5 0 010 3H8v-3Zm6 0h2a1.5 1.5 0 010 3h-2v-3Zm-1 0v5" />
        </svg>
      );
    case "MySQL":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M4 16c2-4 6-8 10-8 3 0 4 1 6 3" />
          <circle cx="18" cy="14" r="2" fill="currentColor" />
        </svg>
      );
    case "Java":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 3s-2 2-2 4 2 3 2 5-2 3-2 5 2 4 2 4" />
          <ellipse cx="12" cy="20" rx="6" ry="2" />
        </svg>
      );
    case "Spring Boot":
      return (
        <svg
          viewBox="0 0 24 24"
          className={base}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <polygon points="12,2 22,9 18,22 6,22 2,9" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={base} fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function Skills() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string>(skills[0]?.name || "");

  const scrollByAmount = (dir: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="skills"
      className="max-w-6xl mx-auto mt-20 md:mt-28 scroll-mt-24"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
        Skills
      </h2>

      {/* Interactive Skills Carousel */}
      <div className="relative mb-12">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={rowRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 no-scrollbar py-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              onClick={() => setSelected(s.name)}
              role="button"
              aria-pressed={selected === s.name}
              tabIndex={0}
              className={`min-w-[45%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] snap-start rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-colors border ${
                selected === s.name
                  ? "border-foreground/30 bg-foreground/5"
                  : "border-foreground/10 bg-background/60 hover:bg-foreground/5"
              }`}
            >
              <div className="shrink-0 text-foreground/80">
                <SkillIcon name={s.name} />
              </div>
              <div className="text-xs sm:text-sm font-medium">{s.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Selected Skill Details */}
        <div className="mt-5">
          <AnimatePresence mode="wait">
            {skills
              .filter((s) => s.name === selected)
              .map((s) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-foreground/10 p-3 sm:p-4 md:p-5 bg-background/60"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-foreground/80">
                      <SkillIcon name={s.name} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm uppercase tracking-wider text-foreground/60">
                        Selected Skill
                      </div>
                      <h3 className="text-base sm:text-lg font-medium mt-1">
                        {s.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs sm:text-sm text-foreground/80">
                    <p>{s.description}</p>
                    <p className="text-foreground/70">
                      <span className="font-medium">Use case:</span> {s.useCase}
                    </p>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-2 absolute -top-10 right-0">
          <button
            aria-label="Scroll skills left"
            onClick={() => scrollByAmount("left")}
            className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-foreground/15 text-foreground/80 hover:bg-foreground/5"
          >
            ‹
          </button>
          <button
            aria-label="Scroll skills right"
            onClick={() => scrollByAmount("right")}
            className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-foreground/15 text-foreground/80 hover:bg-foreground/5"
          >
            ›
          </button>
        </div>
        <div className="mt-2 md:hidden text-xs text-foreground/60 text-center">
          Swipe to see more →
        </div>
      </div>

      {/* Comprehensive Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Frontend Development */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="border-l-2 border-blue-500/30 pl-4 space-y-2">
            <h3 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Frontend Development
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm">
              Modern web interfaces with React ecosystem
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Framer Motion",
              ].map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 sm:px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-700 hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Backend Development */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="border-l-2 border-green-500/30 pl-4 space-y-2">
            <h3 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Backend Development
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm">
              Scalable server-side applications and APIs
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
              {["Node.js", "Java", "Spring Boot", "PHP", "Express.js"].map(
                (skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 sm:px-3 py-1 bg-green-100 rounded-full text-xs text-green-700 hover:bg-green-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-green-900/30 dark:text-green-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Database & Storage */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="border-l-2 border-purple-500/30 pl-4 space-y-2">
            <h3 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Database & Storage
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm">
              Data management and persistence solutions
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
              {["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"].map(
                (skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 sm:px-3 py-1 bg-purple-100 rounded-full text-xs text-purple-700 hover:bg-purple-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Development Tools */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="border-l-2 border-orange-500/30 pl-4 space-y-2">
            <h3 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Development Tools
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm">
              Modern development workflow and deployment
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
              {["Git", "Docker", "Vercel", "AWS", "VS Code"].map(
                (skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 sm:px-3 py-1 bg-orange-100 rounded-full text-xs text-orange-700 hover:bg-orange-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Professional Experience & Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 space-y-6"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/90">
          Professional Experience & Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Experience Level */}
          <div className="border-l-2 border-cyan-500/30 pl-4 space-y-3">
            <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Experience Level
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-foreground/70">
                  React/Next.js
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground/80">
                  Expert
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-foreground/70">
                  TypeScript
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground/80">
                  Advanced
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-foreground/70">
                  Node.js
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground/80">
                  Advanced
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-foreground/70">
                  Java/Spring
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground/80">
                  Intermediate
                </span>
              </div>
            </div>
          </div>

          {/* Recent Certifications */}
          <div className="border-l-2 border-indigo-500/30 pl-4 space-y-3">
            <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Recent Certifications
            </h4>
            <div className="space-y-2">
              <div className="text-xs sm:text-sm">
                <div className="font-medium text-foreground/80">
                  AWS Certified Developer
                </div>
                <div className="text-foreground/60">
                  Amazon Web Services • 2024
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-medium text-foreground/80">
                  React Developer Certification
                </div>
                <div className="text-foreground/60">Meta • 2023</div>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-medium text-foreground/80">
                  JavaScript Algorithms
                </div>
                <div className="text-foreground/60">freeCodeCamp • 2023</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notable Projects */}
        <div className="border-l-2 border-pink-500/30 pl-4 space-y-3">
          <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            Notable Project Experience
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="text-xs sm:text-sm">
              <div className="font-medium text-foreground/80">
                E-commerce Platform
              </div>
              <div className="text-foreground/60">
                Built with React, Node.js, and MongoDB
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-medium text-foreground/80">
                Real-time Chat Application
              </div>
              <div className="text-foreground/60">
                Socket.io, Express.js, and PostgreSQL
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-medium text-foreground/80">
                Portfolio Website
              </div>
              <div className="text-foreground/60">
                Next.js, TypeScript, and Framer Motion
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-medium text-foreground/80">
                Task Management System
              </div>
              <div className="text-foreground/60">
                Java Spring Boot and MySQL
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
