"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function ContactInline() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto mt-20 md:mt-28 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="text-sm tracking-widest uppercase text-foreground/60">
            Contact
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-[var(--font-display)]">
            Let&apos;s build something great
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
            I&apos;m open to freelance and full-time opportunities. Tell me
            about your goals and timeline, and I&apos;ll reply within 24–48
            hours.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
            <a
              href="mailto:ahsanauddry.ndc@gmail.com"
              className="h-9 sm:h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-full border border-foreground/15 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/ahsanauddry027"
              target="_blank"
              rel="noreferrer"
              className="h-9 sm:h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-full border border-foreground/15 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ahsanauddry027"
              target="_blank"
              rel="noreferrer"
              className="h-9 sm:h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-full border border-foreground/15 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.com/users/ahsanauddry027"
              target="_blank"
              rel="noreferrer"
              className="h-9 sm:h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-full border border-foreground/15 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              Discord
            </a>
          </div>

          {/* Grab a coffee section */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
              <h3 
                className="text-lg font-bold text-foreground"
                style={{
                  fontFamily: "var(--font-elegant)",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 165, 0, 0.2)",
                  letterSpacing: "0.05em",
                  fontWeight: "400",
                  transform: "rotate(-1deg)",
                  transformOrigin: "left center",
                }}
              >
                Grab a coffee ☕
              </h3>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              Let&apos;s chat about your project over a virtual coffee! I&apos;m always excited to discuss new ideas and opportunities.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="mailto:ahsanauddry.ndc@gmail.com?subject=Let's grab a coffee! ☕"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Schedule a Call
              </a>
              <a
                href="https://calendly.com/ahsanauddry027"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300"
              >
                Book Meeting
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-2xl border border-foreground/10 p-4 sm:p-6 md:p-8 bg-background/60 backdrop-blur relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -inset-24 rounded-[inherit] bg-[radial-gradient(260px_200px_at_10%_120%,rgba(120,119,198,0.18),transparent)]" />
          <ContactForm toEmail="ahsanauddry.ndc@gmail.com" />
        </motion.div>
      </div>
    </section>
  );
}
