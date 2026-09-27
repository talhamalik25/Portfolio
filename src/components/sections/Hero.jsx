"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-hero-animate]", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-kicker]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          "[data-hero-position]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-word]",
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=1",
        )
        .fromTo(
          "[data-hero-statement]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-copy]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-float]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3",
        );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const offset = self.progress * 80;
          gsap.set("[data-hero-word]", { y: offset * 0.5 });
          gsap.set("[data-hero-visual]", { y: offset * 0.3 });
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#050302] text-white"
      aria-label="Introduction"
    >
      {/* Subtle background radial */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.10),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-dvh max-w-[1240px] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative flex w-full max-w-[1180px] flex-col items-center text-center"
          style={{ isolation: "isolate" }}
        >
          {/* Kicker Tag */}
          <div
            data-hero-kicker
            data-hero-animate
            className="portfolio-kicker relative z-30 mb-4 flex items-center justify-center gap-3 text-white sm:text-[0.64rem] mt-8"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.16)]"
              aria-hidden="true"
            />
            <span>Hi, I&apos;m</span>
            <span className="text-[#EB5002]">TALHA</span>
          </div>

          {/* Eyebrow */}
          <div
            data-hero-position
            data-hero-animate
            className="portfolio-kicker relative z-30 mb-10 text-center text-[#EB5002] sm:text-[0.65rem] tracking-[0.2em] uppercase font-bold"
          >
            FULL-STACK DEVELOPER • AI AUTOMATION
          </div>

          {/* ── Main Visual Block (TALHA text + Photo overlap) ── */}
          <div
            className="relative z-10 mb-12 flex w-full flex-col items-center justify-center"
            style={{ height: "clamp(320px, 50vh, 560px)" }}
          >
            {/* Single background TALHA text — one continuous element */}
            <div
              data-hero-word
              data-hero-animate
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
            >
              <span className="portfolio-display whitespace-nowrap text-[clamp(8rem,22vw,20rem)] font-bold leading-[0.8] tracking-[-0.04em] text-[#EB5002] opacity-[0.80]">
                TALHA
              </span>
            </div>

            {/* Photo — sits on top of text, soft edge fade via mask-image */}
            {/* TODO: awaiting updated source photo without badge artifact */}
            <div
              data-hero-visual
              data-hero-animate
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-[4/5] w-[280px] -translate-x-1/2 -translate-y-1/2 sm:w-[340px] lg:w-[400px]"
            >
              <div
                className="h-full w-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile/heroimg.png"
                  alt="Talha Portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── Bottom Content Group ── */}
          <div className="relative z-30 flex w-full max-w-[700px] flex-col items-center">
            <h2
              data-hero-statement
              data-hero-animate
              className="portfolio-display w-full text-[2.2rem] font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem]"
            >
              BUILDING <span className="text-[#EB5002]">IMPACTFUL</span> DIGITAL
              EXPERIENCES.
            </h2>

            <p
              data-hero-copy
              data-hero-animate
              className="portfolio-copy mt-7 w-full max-w-[32rem] text-center text-[1.05rem] text-[#8A8A8A]"
            >
              I build modern web applications, SaaS products and AI-powered
              automation systems.
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#work"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#EB5002] bg-[#EB5002] px-7 py-3.5 font-semibold text-[#0b0b0b] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative font-bold text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">
                  VIEW MY WORK
                </span>
                <span
                  aria-hidden="true"
                  className="relative text-lg leading-none text-[#0b0b0b] transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-white"
                >
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-7 py-3.5 font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="absolute inset-0 translate-y-[105%] bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                <span className="relative font-bold text-white transition-colors duration-400 ease-out">
                  LET&apos;S WORK TOGETHER
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
