"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    desc: "A modern dashboard built with Next.js.",
    img: "https://picsum.photos/800/600?random=1",
    github: "https://github.com/ahsanauddry027/project-alpha",
    live: "https://project-alpha-demo.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Project Beta",
    desc: "Marketing site with delightful animations.",
    img: "https://picsum.photos/800/600?random=2",
    github: "https://github.com/ahsanauddry027/project-beta",
    live: "https://project-beta-demo.vercel.app",
    tech: ["React", "Framer Motion", "CSS"],
  },
  {
    id: 3,
    title: "Project Gamma",
    desc: "Ecommerce prototype with clean UX.",
    img: "https://picsum.photos/800/600?random=3",
    github: "https://github.com/ahsanauddry027/project-gamma",
    live: "https://project-gamma-demo.vercel.app",
    tech: ["Vue.js", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Portfolio Website",
    desc: "Personal portfolio built with Next.js and modern design.",
    img: "https://picsum.photos/800/600?random=4",
    github: "https://github.com/ahsanauddry027/portfolio",
    live: "https://ahsanauddry027.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 5,
    title: "Task Management App",
    desc: "Full-stack task management application with real-time updates.",
    img: "https://picsum.photos/800/600?random=5",
    github: "https://github.com/ahsanauddry027/task-manager",
    live: "https://task-manager-demo.vercel.app",
    tech: ["React", "Express.js", "Socket.io", "PostgreSQL"],
  },
  {
    id: 6,
    title: "Weather Dashboard",
    desc: "Beautiful weather app with location-based forecasts.",
    img: "https://picsum.photos/800/600?random=6",
    github: "https://github.com/ahsanauddry027/weather-app",
    live: "https://weather-dashboard-demo.vercel.app",
    tech: ["React", "OpenWeather API", "Chart.js"],
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const remainingCount = projects.length - 3;

  const handleViewMore = async () => {
    if (showAll) {
      // If showing all, scroll to top of projects section
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setShowAll(false);
    } else {
      // If showing limited, load more projects
      setIsLoading(true);
      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowAll(true);
      setIsLoading(false);
    }
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">
          Selected Projects
        </h2>
        <a
          href="#contact"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors self-start sm:self-auto"
        >
          Get in touch →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <AnimatePresence>
          {visibleProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group rounded-2xl border border-foreground/10 overflow-hidden bg-background/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="relative h-36 sm:h-40 md:h-44 bg-foreground/5 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(400px_200px_at_50%_0%,rgba(120,119,198,0.25),transparent)]" />
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background =
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    }
                  }}
                />
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-base sm:text-lg font-medium group-hover:text-foreground transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70">
                  {p.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {p.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-foreground/5 text-foreground/70 rounded-md border border-foreground/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 sm:gap-2 pt-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-7 sm:h-8 px-2 sm:px-3 inline-flex items-center justify-center rounded-md border border-foreground/15 text-xs font-medium hover:bg-foreground/5 transition-all duration-200 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-7 sm:h-8 px-2 sm:px-3 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-xs font-medium hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-200 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={handleViewMore}
          disabled={isLoading}
          className="group h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground/70 rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : showAll ? (
            <div className="flex items-center gap-2">
              <span>Show Less</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>View More ({remainingCount} more)</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </button>
      </motion.div>
    </section>
  );
}
