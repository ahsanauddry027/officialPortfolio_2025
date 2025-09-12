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
            Let's build something great
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
            I'm open to freelance and full-time opportunities. Tell me about
            your goals and timeline, and I'll reply within 24–48 hours.
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
