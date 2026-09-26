"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set("[data-hero-animate]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-word]",
        { opacity: 0, y: 32 },
        { opacity: 0.76, y: 0, duration: 1.1 },
        0
      )
        .fromTo(
          "[data-hero-kicker]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "<0.1"
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "<0.25"
        )
        .fromTo(
          "[data-hero-position]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "<0.2"
        )
        .fromTo(
          "[data-hero-statement]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "<0.15"
        )
        .fromTo(
          "[data-hero-copy]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "<0.1"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "<0.15"
        )
        .fromTo(
          "[data-hero-float]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "<0.12"
        );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const offset = self.progress * 38;
          gsap.to("[data-hero-word]", { y: offset * 0.75, ease: "none" });
          gsap.to("[data-hero-visual]", { y: offset * 0.38, ease: "none" });
          gsap.to("[data-hero-float]", { y: offset * 0.42, ease: "none" });
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.12),transparent_38%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 0.8px, transparent 0.8px)", backgroundSize: "6px 6px", maskImage: "radial-gradient(circle at center, black 28%, transparent 92%)" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-12 lg:pt-28">
        <div className="relative mx-auto min-h-[680px] max-w-[1180px] md:min-h-[720px]" style={{ isolation: "isolate" }}>
          <div
            data-hero-kicker
            data-hero-animate
            className="portfolio-kicker relative z-30 flex items-center gap-3 text-white sm:text-[0.64rem]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.16)]" aria-hidden="true" />
            <span>Hi, I&apos;m</span>
            <span className="text-[#EB5002]">TALHA</span>
          </div>

          <div
            data-hero-word
            data-hero-animate
            className="portfolio-display pointer-events-none absolute left-1/2 top-9 z-0 -translate-x-1/2 text-[4.1rem] font-semibold leading-[0.8] tracking-[-0.09em] text-[#EB5002]/80 sm:text-[5.8rem] md:text-[7.8rem] lg:text-[10.6rem] xl:text-[12.2rem]"
          >
            TALHA
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[9.5rem] z-10 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#EB5002]/8 blur-[120px] sm:top-[10rem] sm:h-[28rem] sm:w-[28rem] md:top-[11rem] md:h-[30rem] md:w-[30rem]" aria-hidden="true" />

          <div data-hero-visual data-hero-animate className="relative z-20 mx-auto flex w-full max-w-[540px] justify-center pt-[4.8rem] sm:pt-[5.4rem] md:pt-[6rem]">
            <HeroScene />
          </div>

          <div className="relative z-30 mt-[-2.4rem] max-w-[530px] md:mt-[-3.2rem] lg:max-w-[560px]">
            <div
              data-hero-position
              data-hero-animate
              className="portfolio-kicker mb-4 text-[#EB5002] sm:text-[0.58rem]"
            >
              FULL-STACK DEVELOPER × AI AUTOMATION
            </div>

            <h2
              data-hero-statement
              data-hero-animate
              className="portfolio-display max-w-[9.2ch] text-[2.4rem] font-semibold leading-[0.9] tracking-[-0.065em] text-white sm:text-[3.1rem] md:text-[4.1rem] lg:text-[4.8rem]"
            >
              Websites that turn ideas into digital experiences.
            </h2>

            <p
              data-hero-copy
              data-hero-animate
              className="portfolio-copy mt-4 max-w-[28.5rem] text-[#8A8A8A]"
            >
              I build modern web applications, SaaS products and AI-powered automation systems.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#work"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#EB5002] bg-[#EB5002] px-5 py-2.5 font-medium text-[#0b0b0b] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002] focus:ring-offset-2 focus:ring-offset-[#050302]"
              >
                <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">VIEW MY WORK</span>
                <span aria-hidden="true" className="relative text-base leading-none text-[#0b0b0b] transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-white">↗</span>
              </a>

              <a
                href="#contact"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-[#0b0908]/80 px-5 py-2.5 font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002] focus:ring-offset-2 focus:ring-offset-[#050302]"
              >
                <span className="absolute inset-0 -translate-x-[105%] bg-[#EB5002] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-white transition-colors duration-400 ease-out group-hover:text-black">LET&apos;S TALK</span>
                <span aria-hidden="true" className="relative text-base leading-none text-white transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:text-black">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
