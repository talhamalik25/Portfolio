"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutLines = [
  "I'm not just writing code — I'm building systems",
  "that solve real problems. As a full-stack developer",
  "and AI automation specialist, I turn ideas into",
  "scalable digital products, blending clean engineering",
  "with intelligent automation to turn ideas into",
  "outcomes that matter.",
];

export default function About() {
  const paragraphRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    if (!paragraphRef.current) return undefined;

    let rafDelay;
    let loadHandler;
    let fontsCleanup;

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const lines = linesRef.current.filter(Boolean);
      const N = lines.length;

      if (prefersReducedMotion) {
        lines.forEach((line) => {
          line.style.clipPath = "inset(0 0% 0 0)";
        });
        return;
      }

      const totalPinDistance = N * 350;

      ScrollTrigger.create({
        trigger: paragraphRef.current,
        pin: true,
        start: "top top",
        end: "+=" + totalPinDistance,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const globalProgress = self.progress;
          for (let i = 0; i < N; i++) {
            const lineProgress = Math.min(
              Math.max(globalProgress * N - i, 0),
              1,
            );
            const insetRight = (1 - lineProgress) * 100;
            lines[i].style.clipPath = `inset(0 ${insetRight}% 0 0)`;
          }
        },
        onRefresh: (self) => {
          if (typeof window !== "undefined" && window.__DEV_PORTFOLIO_LOG__) {
            console.log("[About ScrollTrigger] range:", {
              start: self.start,
              end: self.end,
            });
          }
        },
      });
    }, paragraphRef);

    const refreshOnce = () => {
      ScrollTrigger.refresh();
    };
    const fontsReady =
      typeof document !== "undefined" && document.fonts && document.fonts.ready;
    if (fontsReady) {
      let cancelled = false;
      fontsReady.then(() => {
        if (!cancelled) refreshOnce();
      });
      fontsCleanup = () => {
        cancelled = true;
      };
    }
    loadHandler = () => refreshOnce();
    window.addEventListener("load", loadHandler, { once: true });
    rafDelay = window.setTimeout(refreshOnce, 400);

    return () => {
      if (loadHandler) {
        window.removeEventListener("load", loadHandler);
      }
      if (rafDelay) {
        window.clearTimeout(rafDelay);
      }
      if (fontsCleanup) {
        fontsCleanup();
      }
      context.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      className="relative bg-[#FAF7F2] py-24 text-[#1A1613] lg:py-36"
      ref={paragraphRef}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:w-1/4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EB5002]">
              About Me
            </h3>
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-col gap-1">
              {aboutLines.map((line, index) => (
                <div key={line} className="relative block">
                  <span className="block text-3xl font-medium leading-[1.35] tracking-tight text-[#B8B0A6] sm:text-4xl md:text-5xl">
                    {line}
                  </span>
                  <span
                    aria-hidden="true"
                    ref={(element) => {
                      linesRef.current[index] = element;
                    }}
                    className="pointer-events-none absolute inset-0 block text-3xl font-medium leading-[1.35] tracking-tight text-[#EB5002] sm:text-4xl md:text-5xl"
                    style={{ clipPath: "inset(0 100% 0 0)" }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-10 lg:mt-32 lg:flex-row lg:items-start lg:gap-16">
          <div className="grid w-full grid-cols-2 gap-4 lg:w-3/5 lg:gap-6">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/workspace-1.jpg"
                alt="Workspace view 1"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="group relative mt-12 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200 lg:mt-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/workspace-2.jpg"
                alt="Workspace view 2"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center lg:w-2/5 lg:pt-24">
            <h4 className="text-2xl font-bold leading-tight tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
              Full-Stack Development <br className="hidden sm:block" />
              & AI Automation
            </h4>
            <div className="mt-8">
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EB5002] px-7 py-3.5 font-semibold text-[#0b0b0b] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">
                  View My Work
                </span>
                <span
                  aria-hidden="true"
                  className="relative text-lg leading-none text-[#0b0b0b] transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-white"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
