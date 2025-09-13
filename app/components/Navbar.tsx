"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import ThemeToggle from "./ThemeToggle";
import { useMobileSidebar } from "../contexts/MobileSidebarContext";

// Helper function for conditional classes
const cn = (...inputs: (string | undefined | null | boolean)[]) => clsx(inputs);

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

export default function Navbar({ links, className }: NavbarProps) {
  const { mobileOpen, setMobileOpen } = useMobileSidebar();
  const [mounted, setMounted] = useState(false);
  const [sidebarScrollPosition, setSidebarScrollPosition] = useState(0);
  const sidebarNavRef = useRef<HTMLElement | null>(null);

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
  }, [setMobileOpen]);

  // Save scroll position when sidebar closes
  useEffect(() => {
    if (!mobileOpen && sidebarNavRef.current) {
      setSidebarScrollPosition(sidebarNavRef.current.scrollTop);
    }
  }, [mobileOpen]);

  // Restore scroll position when sidebar opens
  useEffect(() => {
    if (mobileOpen && sidebarNavRef.current) {
      sidebarNavRef.current.scrollTop = sidebarScrollPosition;
    }
  }, [mobileOpen, sidebarScrollPosition]);

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
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;

      return () => {
        document.body.style.overflow = original;
        document.body.style.position = originalPosition;
        document.body.style.width = "";
        document.body.style.top = originalTop;
        window.scrollTo(0, scrollY);
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
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 relative",
          className
        )}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-16 lg:px-24 xl:px-32 h-14 sm:h-16 flex items-center justify-between navbar-mobile-optimized">
          <a
            href="#home"
            className="text-lg sm:text-xl font-bold transition-all duration-300 hover-lift text-gradient-red"
          >
            AH
          </a>
          <nav
            ref={desktopNavRef}
            className="hidden md:flex items-center gap-2 text-sm relative"
          >
            <span
              className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-primary transition-all duration-500 ease-out"
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
                    "group relative px-3 py-2 rounded-modern transition-all duration-300 ease-out hover-lift",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  {...(isSection ? { "data-id": id } : {})}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-modern transition-all duration-300 ease-out",
                      isActive
                        ? "bg-accent opacity-100"
                        : "bg-accent opacity-0 group-hover:opacity-100"
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
              className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-modern border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-300 hover-lift focus-ring mobile-touch-target"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Menu button clicked, current state:", mobileOpen);
                setMobileOpen(!mobileOpen);
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
          <div>
            <div
              className="md:hidden fixed inset-0 z-[9998] mobile-sidebar-backdrop transition-opacity duration-300 opacity-100 pointer-events-auto"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile sidebar */}
            <div
              className={cn(
                "md:hidden fixed top-0 left-0 h-full w-[90vw] max-w-[320px] mobile-sidebar shadow-modern-lg transition-all duration-500 ease-out z-[9999] mobile-sidebar-375",
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
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-foreground/5 via-transparent to-foreground/3" />
                <div className="absolute top-1/4 right-0 w-32 h-32 bg-gradient-to-br from-foreground/3 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-gradient-to-tr from-foreground/3 to-transparent rounded-full blur-2xl" />
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
              <div className="relative z-10 h-full flex flex-col overflow-hidden">
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/50 flex-shrink-0 min-h-[80px] sm:min-h-[96px]">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-modern gradient-bg text-primary-foreground flex items-center justify-center font-bold text-lg shadow-red hover-lift red-glow">
                      AH
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-foreground tracking-wide">
                        Ahsan Habib
                      </span>
                      <span className="text-sm text-muted-foreground font-medium">
                        Portfolio
                      </span>
                    </div>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMobileOpen(false);
                    }}
                    className="p-2 flex-shrink-0 ml-4 rounded-modern hover:bg-accent transition-all duration-300 hover-lift focus-ring"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-current text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sidebar navigation */}
                <nav
                  ref={sidebarNavRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-2 sm:gap-3 min-h-0 max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-320px)] mobile-nav-height"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(156, 163, 175, 0.3) transparent",
                  }}
                >
                  {links.map((link) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeId === id;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "group flex items-center px-4 py-3 rounded-modern transition-all duration-300 ease-out hover-lift text-base font-medium relative",
                          isActive
                            ? "text-foreground bg-accent shadow-modern"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex-1 flex items-center gap-3">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              isActive
                                ? "gradient-bg scale-100 red-glow"
                                : "bg-muted-foreground scale-75 group-hover:scale-100 group-hover:gradient-bg"
                            )}
                          />
                          <span className="tracking-wide">{link.label}</span>
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="w-2 h-2 rounded-full gradient-bg animate-pulse red-glow" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Sidebar footer */}
                <div className="flex-shrink-0 p-6 border-t border-border bg-muted/30 mobile-sidebar-footer">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Contact Credentials */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground">
                        Contact Me
                      </h3>

                      {/* Email */}
                      <div className="flex items-start gap-3 p-3 rounded-modern bg-accent hover:bg-accent/80 transition-all duration-300 hover-lift">
                        <div className="w-8 h-8 rounded-modern bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
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
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-medium text-foreground">
                            Email
                          </span>
                          <span className="text-sm text-muted-foreground break-all">
                            ahsan.habib@example.com
                          </span>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-3 p-3 rounded-modern bg-accent hover:bg-accent/80 transition-all duration-300 hover-lift">
                        <div className="w-8 h-8 rounded-modern bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
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
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-medium text-foreground">
                            Phone
                          </span>
                          <span className="text-sm text-muted-foreground break-all">
                            +1 (555) 123-4567
                          </span>
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="flex items-start gap-3 p-3 rounded-modern bg-accent hover:bg-accent/80 transition-all duration-300 hover-lift">
                        <div className="w-8 h-8 rounded-modern bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
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
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-medium text-foreground">
                            GitHub
                          </span>
                          <span className="text-sm text-muted-foreground break-all">
                            github.com/ahsanhabib
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <div className="text-sm text-muted-foreground font-medium">
                        © 2025 Ahsan Habib
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full gradient-bg" />
                        <span>Portfolio</span>
                        <div className="w-1 h-1 rounded-full gradient-bg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
