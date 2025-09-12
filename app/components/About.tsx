"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-square sm:aspect-[4/3] md:aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 order-2 md:order-1"
      >
        <Image
          src="/IMG_1110.PNG"
          alt="Ahsan Habib"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          style={{
            objectPosition: "center top",
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="space-y-6 order-1 md:order-2"
      >
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">About</h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
            I&apos;m Ahsan Habib, a developer who blends clean aesthetics with
            pragmatic engineering. I enjoy building performant, accessible
            interfaces and end-to-end products with Next.js.
          </p>
        </div>

        {/* Academic Section */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/90">
            Academic Background
          </h3>

          <div className="space-y-4">
            {/* Education */}
            <div className="border-l-2 border-purple-500/30 pl-4 space-y-2">
              <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Bachelor&apos;s Degree in Computer Science
              </h4>
              <p className="text-foreground/70 text-xs sm:text-sm">
                University of Technology • 2020 - 2024
              </p>
              <p className="text-foreground/70 text-xs sm:text-sm">
                Specialized in Software Engineering, Data Structures, and Web
                Development
              </p>
            </div>

            {/* Academic Achievements */}
            <div className="border-l-2 border-blue-500/30 pl-4 space-y-2">
              <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Academic Achievements
              </h4>
              <ul className="space-y-1 text-foreground/70 text-xs sm:text-sm">
                <li>• Dean&apos;s List - Academic Excellence (2022, 2023)</li>
                <li>
                  • Final Year Project: &quot;Modern Web Application
                  Framework&quot;
                </li>
                <li>• GPA: 3.8/4.0</li>
              </ul>
            </div>

            {/* Relevant Coursework */}
            <div className="border-l-2 border-green-500/30 pl-4 space-y-2">
              <h4 className="font-semibold text-foreground/90 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                {[
                  "Data Structures & Algorithms",
                  "Database Systems",
                  "Software Engineering",
                  "Web Development",
                  "Computer Networks",
                  "Operating Systems",
                ].map((course, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-green-500 hover:text-white hover:scale-125 hover:shadow-xl transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 dark:bg-gray-800 dark:text-gray-300 transform origin-center"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CV Download Button */}
          <div className="mt-8">
            <a
              href="https://drive.google.com/uc?export=download&id=13ytLfaOY8kWTgmcBM65mDtd2BkcYP5PK"
              download="Ahsan_Habib_CV.pdf"
              className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-black border-2 border-white rounded-lg text-white font-medium hover:bg-white hover:text-black hover:border-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20 dark:bg-white dark:text-black dark:border-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download My CV</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
