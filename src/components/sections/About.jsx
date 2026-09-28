"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "I'm not just writing code — I'm building systems that solve real problems. As a full-stack developer and AI automation specialist, I turn ideas into scalable digital products, blending clean engineering with intelligent automation to deliver outcomes that matter.";

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const splitInstanceRef = useRef(null);
  const resizeTimerRef = useRef(null);

  const buildReveal = useCallback(() => {
    if (!textRef.current || !sectionRef.current) return;

    // Clean up previous overlays
    textRef.current.querySelectorAll(".reveal-overlay").forEach((el) => el.remove());

    // Kill existing ScrollTriggers scoped to this section
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.trigger && sectionRef.current?.contains(st.vars.trigger)) {
        st.kill();
      }
      if (st.vars?.trigger === sectionRef.current) {
        st.kill();
      }
    });

    // Split text into actual rendered lines
    if (splitInstanceRef.current) {
      splitInstanceRef.current.revert();
    }
    splitInstanceRef.current = new SplitType(textRef.current, {
      types: "lines",
      lineClass: "about-line",
    });

    const lines = splitInstanceRef.current.lines;
    if (!lines || lines.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Build overlay clones for each detected line
    lines.forEach((line) => {
      line.style.position = "relative";

      const overlay = line.cloneNode(true);
      overlay.classList.add("reveal-overlay");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.position = "absolute";
      overlay.style.inset = "0";
      overlay.style.color = "#EB5002";
      overlay.style.clipPath = prefersReducedMotion
        ? "inset(0 0% 0 0)"
        : "inset(0 100% 0 0)";
      overlay.style.pointerEvents = "none";
      line.appendChild(overlay);
    });

    if (prefersReducedMotion) return;

    // Create pinned ScrollTrigger that scrubs through all lines sequentially
    const N = lines.length;
    const totalPinDistance = N * 350;
    const overlays = Array.from(
      textRef.current.querySelectorAll(".about-line > .reveal-overlay"),
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
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
          if (overlays[i]) {
            overlays[i].style.clipPath = `inset(0 ${insetRight}% 0 0)`;
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return undefined;

    let loadHandler;
    let fontsCleanup;

    // Wait for fonts, then build
    const init = () => {
      buildReveal();
    };

    const fontsReady =
      typeof document !== "undefined" && document.fonts && document.fonts.ready;
    if (fontsReady) {
      let cancelled = false;
      fontsReady.then(() => {
        if (!cancelled) init();
      });
      fontsCleanup = () => {
        cancelled = true;
      };
    } else {
      // Fallback: build after a short delay
      const timer = window.setTimeout(init, 200);
      fontsCleanup = () => window.clearTimeout(timer);
    }

    loadHandler = () => {
      buildReveal();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", loadHandler, { once: true });

    // Debounced resize handler to re-split on viewport change
    const handleResize = () => {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = window.setTimeout(() => {
        buildReveal();
        ScrollTrigger.refresh();
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (loadHandler) {
        window.removeEventListener("load", loadHandler);
      }
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
      if (fontsCleanup) {
        fontsCleanup();
      }
      // Clean up SplitType
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert();
        splitInstanceRef.current = null;
      }
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [buildReveal]);

  return (
    <section
      id="about"
      className="relative bg-[#FAF7F2] pt-24 pb-[160px] text-[#1A1613] lg:pt-36 lg:pb-[200px]"
      style={{
        minHeight: "auto",
        height: "auto",
        overflow: "visible"
      }}
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:w-1/4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EB5002]">
              About Me
            </h2>
          </div>

          <div className="lg:w-3/4">
            <p
              ref={textRef}
              className="text-3xl font-medium leading-[1.35] tracking-tight text-[#B8B0A6] sm:text-4xl md:text-5xl"
            >
              {ABOUT_TEXT}
            </p>
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
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
              Full-Stack Development <br className="hidden sm:block" />
              & AI Automation
            </h3>
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
