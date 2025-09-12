// Image can be used within sections; not needed directly here
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ContactInline from "./components/ContactInline";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-background">
      {/* Navbar moved to RootLayout for all pages */}
      <main className="relative px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 md:py-24">
        <Hero />

        <div className="mt-16 sm:mt-20 md:mt-28" id="projects">
          <Projects />
        </div>

        <div className="mt-16 sm:mt-20 md:mt-28" id="about">
          <About />
        </div>

        <div className="mt-16 sm:mt-20 md:mt-28" id="skills">
          <Skills />
        </div>

        <ContactInline />
      </main>
      <footer className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-10 text-sm text-foreground/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 2025 Ahsan Habib</span>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="#about"
              className="hover:text-foreground text-xs sm:text-sm"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-foreground text-xs sm:text-sm"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-foreground text-xs sm:text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
