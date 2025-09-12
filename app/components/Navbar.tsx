"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import cn from "clsx";
import ThemeToggle from "./ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

export default function Navbar({ links, className }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [activeId, setActiveId] = useState<string>(
    links[0]?.href.replace("#", "") || ""
  );
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Precompute section ids from links like #home → home
  const sectionIds = useMemo(
    () =>
      links
        .filter((l) => l.href.startsWith("#"))
        .map((l) => l.href.replace("#", "")),
    [links]
  );
  const [pathname, setPathname] = useState<string>("/");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    let observer: IntersectionObserver | null = null;
    const elements: Element[] = [];

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 0.5, 1],
      };

      const handler: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      };

      observer = new IntersectionObserver(handler, options);

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          elements.push(el);
          observer!.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        elements.forEach((el) => observer!.unobserve(el));
        observer.disconnect();
      }
    };
  }, [sectionIds]);

  useEffect(() => {
    const onRoute = () => setMobileOpen(false);
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, []);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname || "/");
    updatePath();
    window.addEventListener("popstate", updatePath);
    window.addEventListener("hashchange", updatePath);
    return () => {
      window.removeEventListener("popstate", updatePath);
      window.removeEventListener("hashchange", updatePath);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  // Animated active-link indicator under desktop nav
  useEffect(() => {
    const updateIndicator = () => {
      const nav = desktopNavRef.current;
      if (!nav || !activeId) return;
      const linkEl = nav.querySelector<HTMLAnchorElement>(
        `a[data-id="${activeId}"]`
      );
      if (!linkEl) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = linkEl.getBoundingClientRect();
      const horizontalPadding = 12; // px-3

      // Add smooth transition with requestAnimationFrame
      requestAnimationFrame(() => {
        setIndicator({
          left: linkRect.left - navRect.left + horizontalPadding,
          width: Math.max(0, linkRect.width - horizontalPadding * 2),
        });
      });
    };

    // Small delay to ensure smooth animation
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeId, links]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 transition-colors duration-300 relative",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 h-14 sm:h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-base sm:text-lg font-bold transition-all duration-300 ease-out hover:scale-105 text-white drop-shadow-lg"
          style={{
            fontFamily: "var(--font-elegant)",
            textShadow:
              "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(120, 119, 198, 0.3)",
            letterSpacing: "0.1em",
            fontWeight: "400",
            transform: "rotate(-2deg)",
            transformOrigin: "center",
          }}
        >
          AH
        </a>
        <nav
          ref={desktopNavRef}
          className="hidden md:flex items-center gap-2 text-sm relative"
        >
          <span
            className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out shadow-lg shadow-purple-500/30"
            style={{
              left: indicator.left,
              width: indicator.width,
              transform: indicator.width > 0 ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "center",
            }}
          />
          {links.map((link) => {
            const isSection = link.href.startsWith("#");
            const id = isSection ? link.href.replace("#", "") : "";
            const isActive = isSection
              ? activeId === id
              : pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-2 rounded-md transition-all duration-300 ease-out",
                  isActive
                    ? "text-foreground transform scale-105"
                    : "text-foreground/70 hover:text-foreground hover:scale-105"
                )}
                {...(isSection ? { "data-id": id } : {})}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-md transition-all duration-300 ease-out",
                    isActive
                      ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-100 shadow-sm shadow-purple-500/20"
                      : "bg-foreground/5 opacity-0 group-hover:opacity-100 group-hover:shadow-sm group-hover:shadow-foreground/10"
                  )}
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-foreground/15 text-foreground/80 hover:bg-foreground/5 transition-all duration-300 hover:scale-105 hover:shadow-sm hover:shadow-foreground/10"
            onClick={() => {
              console.log("Menu button clicked, current state:", mobileOpen);
              setMobileOpen((s) => !s);
            }}
          >
            <span className="sr-only">Menu</span>
            <div className="relative w-4 h-4 sm:w-5 sm:h-5">
              <span
                className={cn(
                  "absolute left-0 top-1 w-4 h-0.5 sm:w-5 sm:h-0.5 bg-current transition-all duration-300 ease-out",
                  mobileOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 w-4 h-0.5 sm:w-5 sm:h-0.5 bg-current transition-all duration-300 ease-out",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-5 w-4 h-0.5 sm:w-5 sm:h-0.5 bg-current transition-all duration-300 ease-out",
                  mobileOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
                )}
              />
            </div>
          </button>
        </div>
      </div>
      {/* Mobile sidebar overlay/backdrop */}
      {mounted && mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 opacity-100 pointer-events-auto"
            onClick={() => setMobileOpen(false)}
          />

          {/* Mobile sidebar */}
          <div
            className={cn(
              "md:hidden fixed top-0 left-0 h-full w-[85vw] max-w-[85vw] bg-gradient-to-br from-background/98 via-background/95 to-background/90 backdrop-blur-xl border-r border-foreground/15 shadow-2xl shadow-foreground/10 transition-all duration-500 ease-out z-50 relative overflow-y-auto",
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            )}
            style={{
              transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
            }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
              <div className="absolute top-1/4 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl" />
            </div>

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Sidebar content */}
            <div className="relative z-10 min-h-full flex flex-col">
              {/* Sidebar header */}
              <div className="flex items-center justify-between p-6 border-b border-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 bg-gradient-to-r from-foreground/5 via-transparent to-foreground/5">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/50 overflow-hidden group-hover:w-36 group-hover:rounded-2xl transform hover:scale-105 hover:rotate-1">
                      <span className="relative transition-all duration-500">
                        <span className="inline-block transition-all duration-500 group-hover:opacity-0 group-hover:scale-75 group-hover:-rotate-12">
                          AH
                        </span>
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap text-sm font-bold tracking-wider">
                          AHSAN
                        </span>
                      </span>
                    </div>
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-600/20 animate-pulse transition-all duration-500 group-hover:scale-110 group-hover:animate-spin"></div>
                    <div className="absolute -inset-1 rounded-2xl border-2 border-gradient-to-r from-purple-500/40 via-blue-500/40 to-indigo-600/40 animate-ping transition-all duration-500 group-hover:scale-125"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground tracking-wide">
                      Ahsan Habib
                    </span>
                    <span className="text-sm text-foreground/60 font-medium">
                      Portfolio
                    </span>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 flex-shrink-0 ml-4 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-current text-white transition-colors duration-300"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Sidebar navigation */}
              <nav className="p-6 flex flex-col gap-3">
                {links.map((link, index) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeId === id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "group flex items-center px-5 py-4 rounded-xl transition-all duration-500 ease-out transform text-base font-medium relative overflow-hidden",
                        isActive
                          ? "text-foreground bg-gradient-to-r from-purple-500/15 via-blue-500/10 to-indigo-500/15 scale-105 shadow-lg shadow-purple-500/25 border border-purple-500/30"
                          : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-foreground/8 hover:via-foreground/5 hover:to-foreground/8 hover:scale-105 hover:shadow-md hover:shadow-foreground/15 hover:border hover:border-foreground/20"
                      )}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Left accent line */}
                      <div
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-500",
                          isActive
                            ? "bg-gradient-to-b from-purple-500 to-blue-500 scale-y-100"
                            : "bg-gradient-to-b from-foreground/20 to-foreground/10 scale-y-0 group-hover:scale-y-100"
                        )}
                      />

                      <span className="relative z-10 flex-1 flex items-center gap-3">
                        {/* Icon placeholder */}
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500",
                            isActive
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 scale-100"
                              : "bg-foreground/30 scale-75 group-hover:scale-100 group-hover:bg-gradient-to-r group-hover:from-purple-500/60 group-hover:to-blue-500/60"
                          )}
                        />
                        <span
                          className="tracking-wide"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          {link.label}
                        </span>
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="relative z-10 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-ping" />
                        </div>
                      )}

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                  );
                })}
              </nav>

              {/* Sidebar footer */}
              <div className="mt-auto p-6 border-t border-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 bg-gradient-to-t from-foreground/5 via-transparent to-transparent">
                <div className="space-y-6">
                  {/* Contact Credentials */}
                  <div className="space-y-2">
                    <h3
                      className="text-xl font-bold text-foreground tracking-wide"
                      style={{
                        fontFamily: "var(--font-elegant)",
                        textShadow:
                          "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(120, 119, 198, 0.2)",
                        letterSpacing: "0.05em",
                        fontWeight: "400",
                        transform: "rotate(-1deg)",
                        transformOrigin: "left center",
                      }}
                    >
                      Grab a coffee ☕
                    </h3>

                    {/* Email */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-foreground/10 hover:to-foreground/15 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-blue-500"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="22,6 12,13 2,6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-medium text-foreground/80"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          Email
                        </span>
                        <span
                          className="text-sm text-foreground/60"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          ahsan.habib@example.com
                        </span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-foreground/10 hover:to-foreground/15 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-green-500"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-medium text-foreground/80"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          Phone
                        </span>
                        <span
                          className="text-sm text-foreground/60"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          +1 (555) 123-4567
                        </span>
                      </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-foreground/10 hover:to-foreground/15 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-foreground/20 to-foreground/30 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-foreground"
                        >
                          <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-medium text-foreground/80"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          GitHub
                        </span>
                        <span
                          className="text-sm text-foreground/60"
                          style={{
                            fontFamily:
                              "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                          }}
                        >
                          github.com/ahsanhabib
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <div
                      className="text-sm text-foreground/60 font-medium"
                      style={{
                        fontFamily:
                          "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                      }}
                    >
                      © 2025 Ahsan Habib
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-foreground/40">
                      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span
                        style={{
                          fontFamily:
                            "var(--font-roboto), var(--font-inter), 'Roboto', 'Inter', sans-serif",
                        }}
                      >
                        Portfolio
                      </span>
                      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
