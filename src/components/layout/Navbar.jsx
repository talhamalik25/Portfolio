"use client";

import { useEffect, useState } from "react";

import { navItems as configuredNavItems } from "@/data/navigation";
import { readyEntries } from "@/src/lib/content";
import { usePathname } from "next/navigation";

const navItems = readyEntries(configuredNavItems, "Navigation");

export default function Navbar() {
  const pathname = usePathname();
  const isWorkRoute = pathname === "/work" || pathname.startsWith("/work/");
  const homeHref = (hash) => (pathname === "/" ? hash : "/" + hash);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    const updateActiveSection = () => {
      const activationLine = Math.min(160, window.innerHeight * 0.3);
      const currentSection =
        navItems
          .map((item) => document.getElementById(item.href.slice(1)))
          .filter((section) => {
            if (!section) return false;
            const bounds = section.getBoundingClientRect();
            return bounds.top <= activationLine && bounds.bottom > activationLine;
          })
          .sort(
            (first, second) =>
              second.getBoundingClientRect().top - first.getBoundingClientRect().top,
          )[0]?.id ?? "";

      setActiveSection(currentSection);
    };

    const handleWindowUpdate = () => {
      handleScroll();
      updateActiveSection();
    };

    handleWindowUpdate();
    window.addEventListener("scroll", handleWindowUpdate, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    const timer = window.setTimeout(() => setIsMounted(true), 80);

    return () => {
      window.removeEventListener("scroll", handleWindowUpdate);
      window.removeEventListener("resize", updateActiveSection);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={[
          "fixed left-1/2 top-5 z-50 w-[calc(100%-1.5rem)] max-w-[1180px] -translate-x-1/2 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
          isMounted ? "translate-y-0 opacity-100" : "motion-reduce:translate-y-0 motion-reduce:opacity-100 -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Main navigation"
          className={[
            "relative flex items-center justify-between gap-4 rounded-full border border-white/5 bg-surface/40 px-4 backdrop-blur-md transition-all duration-400 ease-out sm:px-5 lg:px-6",
            isScrolled ? "border-white/10 bg-surface/80 py-2 shadow-lg backdrop-blur-xl" : "py-3",
          ].join(" ")}
        >
          <a
            href={homeHref("#top")}
            aria-label="Talha home"
            className="relative z-10 flex shrink-0 items-center text-[0.82rem] font-black uppercase tracking-[0.42em] text-white transition-colors duration-200 hover:text-accent sm:text-[0.9rem]"
          >
            TALHA
          </a>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-4 xl:gap-7">
              {navItems.map((item) => {
                const isActive = isWorkRoute
                  ? item.href === "#work"
                  : activeSection === item.href.replace("#", "");
                return (
                  <li key={item.label}>
                    <a
                      href={homeHref(item.href)}
                      aria-label={item.label}
                      aria-current={isActive ? (isWorkRoute ? "page" : "location") : undefined}
                      className={`group relative inline-flex items-center gap-2 overflow-hidden text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                        isActive ? "text-white" : "text-white/50 hover:text-accent"
                      }`}
                    >
                      <span className="text-[0.55rem] tracking-[0.16em] text-accent">{item.number}</span>
                      <span className="relative flex overflow-hidden">
                        <span className="flex" aria-hidden="true">
                          {item.label.toUpperCase().split("").map((char, index) => (
                            <span
                              key={`label-${index}`}
                              className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-full motion-safe:group-focus-visible:-translate-y-full"
                              style={{ transitionDelay: `${index * 20}ms` }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </span>
                        <span aria-hidden="true" className="absolute inset-0 flex">
                          {item.label.toUpperCase().split("").map((char, index) => (
                            <span
                              key={`roll-${index}`}
                              className="inline-block translate-y-full transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0"
                              style={{ transitionDelay: `${index * 20}ms` }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={homeHref("#contact")}
              className="group relative hidden items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-surface px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background md:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-[105%] bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" />
              <span className="relative text-white transition-colors duration-400 ease-out group-hover:text-background group-focus-visible:text-background">
                Let&apos;s Talk
              </span>
              <span
                aria-hidden="true"
                className="relative text-base leading-none text-white transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-background group-focus-visible:translate-x-1 group-focus-visible:text-background"
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative flex h-10 items-center justify-center rounded-full border border-white/10 bg-surface/70 px-4 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 ease-out hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background lg:hidden"
            >
              <div className="relative flex h-4 w-12 items-center justify-center overflow-hidden">
                <span
                  aria-hidden={isMobileMenuOpen}
                  className={[
                    "absolute w-full text-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isMobileMenuOpen ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
                  ].join(" ")}
                >
                  MENU
                </span>
                <span
                  aria-hidden={!isMobileMenuOpen}
                  className={[
                    "absolute w-full text-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  ].join(" ")}
                >
                  CLOSE
                </span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-navigation"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={[
          "fixed inset-x-0 top-[84px] z-40 max-h-[calc(100dvh-100px)] overflow-y-auto overscroll-contain px-4 lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1180px]">
          <div
            className={[
              "rounded-[28px] border border-white/10 bg-surface/80 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur-xl opacity-0 translate-y-[-12px] scale-[0.98] transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMobileMenuOpen ? "opacity-100 translate-y-0 scale-100" : "",
            ].join(" ")}
          >
            <nav aria-label="Mobile menu" className="flex flex-col gap-5">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li
                    key={item.label}
                    className={[
                      "translate-y-[18px] opacity-0 transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isMobileMenuOpen ? "translate-y-0 opacity-100" : "",
                    ].join(" ")}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <a
                      href={homeHref(item.href)}
                      aria-label={item.label}
                      onClick={handleNavClick}
                      aria-current={
                        isWorkRoute
                          ? item.href === "#work"
                            ? "page"
                            : undefined
                          : activeSection === item.href.slice(1)
                            ? "location"
                            : undefined
                      }
                      className="group flex items-center justify-between border-b border-white/8 py-3 text-[1.7rem] font-semibold uppercase tracking-[0.12em] text-white/90 transition-colors duration-200 hover:text-accent aria-[current=location]:text-accent aria-[current=page]:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span>{item.label}</span>
                      <span className="text-[0.7rem] font-medium tracking-[0.2em] text-accent">{item.number}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={homeHref("#contact")}
                onClick={handleNavClick}
                className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-surface px-5 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"}`}
                style={{ transitionDelay: "160ms" }}
              >
                <span
                  className={[
                    "absolute inset-0 -translate-x-[105%] bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
                    isMobileMenuOpen ? "translate-x-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "relative text-white transition-colors duration-400 ease-out group-hover:text-background",
                    isMobileMenuOpen ? "text-background" : "",
                  ].join(" ")}
                >
                  Let&apos;s Talk
                </span>
                <span
                  aria-hidden="true"
                  className="relative text-base leading-none text-white transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-background"
                >
                  ↗
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
