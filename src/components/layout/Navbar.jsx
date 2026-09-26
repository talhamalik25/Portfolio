"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Work", href: "#work", number: "01" },
  { label: "Services", href: "#services", number: "02" },
  { label: "About", href: "#about", number: "03" },
  { label: "Stack", href: "#stack", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = window.setTimeout(() => setIsMounted(true), 80);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timer);
    };
  }, []);

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
          "fixed left-1/2 top-5 z-50 w-[calc(100%-1.5rem)] max-w-[1180px] -translate-x-1/2 transition-all duration-300 ease-out",
          isMounted ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Main navigation"
          className={[
            "relative flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#111111]/60 px-3 py-2.5 backdrop-blur-xl transition-all duration-300 ease-out sm:px-4 lg:px-5",
            isScrolled ? "border-white/12 bg-[#111111]/82" : "",
          ].join(" ")}
        >
          <a
            href="#top"
            aria-label="Talha home"
            className="relative z-10 flex shrink-0 items-center text-[0.82rem] font-black uppercase tracking-[0.42em] text-white transition-colors duration-200 hover:text-[#EB5002] sm:text-[0.9rem]"
          >
            TALHA
          </a>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-7 xl:gap-10">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group relative inline-flex h-[1.2em] items-center overflow-hidden text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 hover:text-[#EB5002]"
                  >
                    <span className="block transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1) group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%]">{item.label}</span>
                    <span className="absolute inset-0 block translate-y-[110%] text-[#EB5002] opacity-0 transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#contact"
              className="group relative hidden items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-[#111111] px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002] focus:ring-offset-2 focus:ring-offset-[#0b0b0b] md:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-[105%] bg-[#EB5002] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" />
              <span className="relative text-white transition-colors duration-400 ease-out group-hover:text-[#0b0b0b] group-focus-visible:text-[#0b0b0b]">Let&apos;s Talk</span>
              <span aria-hidden="true" className="relative text-base leading-none text-white transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-[#0b0b0b] group-focus-visible:translate-x-1 group-focus-visible:text-[#0b0b0b]">↗</span>
            </a>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111111]/70 text-white transition-all duration-200 ease-out hover:border-[#EB5002] hover:text-[#EB5002] focus:outline-none focus:ring-2 focus:ring-[#EB5002] focus:ring-offset-2 focus:ring-offset-[#0b0b0b] lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={[
                    "absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : "translate-y-0 rotate-0",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-navigation"
        aria-hidden={!isMobileMenuOpen}
        className={[
          "fixed inset-x-0 top-[84px] z-40 px-4 lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1180px]">
          <div
            className={[
              "rounded-[28px] border border-white/10 bg-[#111111]/80 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur-xl opacity-0 translate-y-[-12px] scale-[0.98] transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
                      href={item.href}
                      onClick={handleNavClick}
                      className="group flex items-center justify-between border-b border-white/8 py-3 text-[1.7rem] font-semibold uppercase tracking-[0.12em] text-white/90 transition-colors duration-200 hover:text-[#EB5002]"
                    >
                      <span>{item.label}</span>
                      <span className="text-[0.7rem] font-medium tracking-[0.2em] text-[#EB5002]">{item.number}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={handleNavClick}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-[#111111] px-5 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white opacity-0 translate-y-[16px] transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-[#EB5002] focus:ring-offset-2 focus:ring-offset-[#0b0b0b]"
                style={{ transitionDelay: "160ms" }}
              >
                <span className={[
                  "absolute inset-0 -translate-x-[105%] bg-[#EB5002] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
                  isMobileMenuOpen ? "translate-x-0" : "",
                ].join(" ")}
                />
                <span className={[
                  "relative text-white transition-colors duration-400 ease-out group-hover:text-[#0b0b0b]",
                  isMobileMenuOpen ? "text-[#0b0b0b]" : "",
                ].join(" ")}
                >Let&apos;s Talk</span>
                <span aria-hidden="true" className="relative text-base leading-none text-white transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-[#0b0b0b]">↗</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
