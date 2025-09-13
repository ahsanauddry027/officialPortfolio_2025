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
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sidebarScrollPosition, setSidebarScrollPosition] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
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

  // Copy email function
  const copyEmail = async () => {
    const email = "ahsanauddry.ndc@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

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
        // Don't update active section when sidebar is closing
        if (isClosing) return;

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
  }, [sectionIds, isClosing]);

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
          "sticky top-0 z-50 bg-background border-b border-border transition-all duration-300 relative",
          className
        )}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-16 lg:px-24 xl:px-32 h-14 sm:h-16 flex items-center justify-between navbar-mobile-optimized">
          <a
            href="#home"
            className="text-lg sm:text-xl font-bold transition-all duration-300 hover-lift text-gradient-red-dark"
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
        {/* Mobile sidebar */}
        {mounted && (
          <div>
            {/* Mobile sidebar */}
            <div
              className={cn(
                "md:hidden fixed top-0 left-0 h-full w-[88vw] max-w-[320px] mobile-sidebar shadow-modern-lg transition-all duration-700 ease-out z-[9999] mobile-sidebar-375",
                mobileOpen
                  ? "translate-x-0 opacity-100 scale-100"
                  : "-translate-x-full opacity-0 scale-95"
              )}
              style={{
                transform: mobileOpen
                  ? "translateX(0) scale(1)"
                  : "translateX(-100%) scale(0.95)",
                opacity: mobileOpen ? 1 : 0,
                pointerEvents: mobileOpen ? "auto" : "none",
              }}
            >
              {/* Sidebar content */}
              <div className="relative z-10 h-full flex flex-col overflow-hidden">
                {/* Sidebar header */}
                <div
                  className={cn(
                    "flex items-center justify-between p-3 sm:p-6 border-b border-border bg-muted/50 flex-shrink-0 min-h-[70px] sm:min-h-[96px] transition-all duration-500 ease-out",
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileOpen ? "100ms" : "0ms",
                  }}
                >
                  <div
                    className="flex items-center gap-3 flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-modern bg-red-primary text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-red hover-lift-enhanced red-glow-dark transition-all duration-300 hover:scale-105">
                      AH
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-bold text-foreground tracking-wide">
                        Ahsan Habib
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Portfolio
                      </span>
                    </div>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent?.stopImmediatePropagation();

                      // Set closing state to prevent navigation
                      setIsClosing(true);

                      // Close sidebar without triggering navigation
                      setMobileOpen(false);

                      // Reset closing state after animation completes
                      setTimeout(() => {
                        setIsClosing(false);
                        (e.target as HTMLElement)?.blur?.();
                      }, 700); // Match sidebar animation duration
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                    className="group relative p-3 flex-shrink-0 ml-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:border-red-primary/30 transition-all duration-300 hover-lift focus-ring hover:shadow-lg hover:scale-105 active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {/* Animated background glow on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Cross icon with enhanced styling */}
                    <div className="relative">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-current text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-all duration-300 group-hover:rotate-90"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:drop-shadow-sm"
                        />
                      </svg>

                      {/* Subtle inner glow effect */}
                      <div className="absolute inset-0 rounded-full bg-red-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                    </div>

                    {/* Modern shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Sidebar navigation */}
                <nav
                  ref={sidebarNavRef}
                  className={cn(
                    "flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col gap-1.5 sm:gap-3 min-h-0 max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-320px)] mobile-nav-height transition-all duration-500 ease-out",
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(156, 163, 175, 0.3) transparent",
                    transitionDelay: mobileOpen ? "200ms" : "0ms",
                  }}
                >
                  {links.map((link, index) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeId === id;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "group flex items-center px-3 py-2.5 sm:px-4 sm:py-3 rounded-modern transition-all duration-300 ease-out hover-lift text-sm sm:text-base font-medium relative",
                          isActive
                            ? "text-foreground bg-accent shadow-modern"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                        style={{
                          animation: mobileOpen
                            ? `slideInFromLeft 0.4s ease-out ${
                                0.3 + index * 0.1
                              }s both`
                            : "none",
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex-1 flex items-center gap-2.5 sm:gap-3">
                          <div
                            className={cn(
                              "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300",
                              isActive
                                ? "bg-red-primary scale-100 red-glow-dark"
                                : "bg-muted-foreground scale-75 group-hover:scale-100 group-hover:bg-red-primary"
                            )}
                          />
                          <span className="tracking-wide">{link.label}</span>
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-red-primary animate-pulse red-glow-dark" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Sidebar footer */}
                <div
                  className={cn(
                    "flex-shrink-0 p-4 sm:p-6 border-t border-border bg-muted/30 mobile-sidebar-footer transition-all duration-500 ease-out",
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileOpen ? "400ms" : "0ms",
                  }}
                >
                  <div className="space-y-3 sm:space-y-6">
                    {/* Contact Credentials */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        Contact Me
                      </h3>

                      {/* Email */}
                      <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-modern bg-accent hover:bg-accent/80 transition-all duration-300 hover-lift-enhanced">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-modern bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary sm:w-4 sm:h-4"
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
                          <span className="text-xs sm:text-sm font-medium text-foreground">
                            Email
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground break-all">
                            ahsanauddry.ndc@gmail.com
                          </span>
                        </div>
                        <button
                          onClick={copyEmail}
                          className="group relative p-1.5 rounded-md hover:bg-foreground/10 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-primary/50"
                          aria-label="Copy email address"
                        >
                          {emailCopied ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="text-green-600 dark:text-green-400"
                            >
                              <path
                                d="M20 6L9 17l-5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="text-muted-foreground group-hover:text-foreground transition-colors"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            {emailCopied ? "Copied!" : "Copy email"}
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="text-center space-y-1.5">
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                        © 2025 Ahsan Habib
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-red-primary" />
                        <span>Portfolio</span>
                        <div className="w-1 h-1 rounded-full bg-red-primary" />
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
