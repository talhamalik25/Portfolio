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
        gsap.set("[data-hero-word]", { opacity: 0.35 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-position]",
        { opacity: 0, filter: "blur(4px)", y: 15 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6 },
        0.2
      )
        .fromTo(
          "[data-hero-word]",
          { opacity: 0, filter: "blur(10px)", scale: 0.98 },
          { opacity: 0.35, filter: "blur(0px)", scale: 1, duration: 1.4, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.94, filter: "contrast(0.8)" },
          { opacity: 1, scale: 1, filter: "contrast(1)", duration: 1.2 },
          "-=1.1"
        )
        .fromTo(
          "[data-hero-statement]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-copy]",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.2"
        );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const offset = self.progress * 150;
          gsap.to("[data-hero-word]", { y: offset * 0.4, ease: "power1.out", overwrite: "auto" });
          gsap.to("[data-hero-visual]", { y: offset * 0.2, ease: "power1.out", overwrite: "auto" });
          gsap.to("[data-hero-position]", { y: offset * 0.1, ease: "power1.out", overwrite: "auto" });
        },
      });
      
      gsap.to("[data-scroll-dot]", {
        y: 8,
        yoyo: true,
        repeat: -1,
        duration: 1.2,
        ease: "power2.inOut"
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
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.06),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-dvh max-w-[1240px] flex-col items-center justify-center px-4 py-20 pb-16 sm:px-6 lg:px-8">
        <div
          className="relative flex w-full max-w-[1180px] flex-col items-center text-center mt-8 md:mt-2"
          style={{ isolation: "isolate" }}
        >
          {/* Status + Eyebrow */}
          <div
            data-hero-position
            data-hero-animate
            className="portfolio-kicker relative z-30 mb-6 flex flex-col items-center gap-3.5 text-center text-[0.55rem] sm:text-[0.6rem] tracking-[0.15em] uppercase font-bold"
          >
            <div className="flex items-center gap-2 text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EB5002]" />
              <span>HI, I&apos;M TALHA</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 text-[#EB5002]">
              <span>FULL-STACK DEVELOPER</span>
              <span className="hidden md:inline text-white/30">•</span>
              <span>AI AUTOMATION</span>
            </div>
          </div>

          {/* ── Main Visual Block (TALHA text + Photo overlap) ── */}
<div
  className="relative z-10 mb-8 flex w-full items-center justify-center
             sm:mb-10
             md:mb-12"
  style={{
    height: "clamp(360px, 58vw, 520px)",
    minHeight: "360px",
  }}
>
  {/* Background TALHA text */}
  <div
    data-hero-word
    data-hero-animate
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none overflow-hidden"
  >
    <span
      className="
        portfolio-display whitespace-nowrap font-bold leading-[0.8]
        tracking-[-0.04em] text-[#EB5002]
        text-[clamp(4rem,22vw,16rem)]
        sm:text-[clamp(6rem,17vw,17rem)]
        md:text-[clamp(6rem,17vw,15rem)]
        lg:text-[clamp(8rem,15vw,16rem)]
      "
    >
      TALHA
    </span>
  </div>

  {/* Portrait */}
  <div
    data-hero-visual
    data-hero-animate
    className="
      pointer-events-none absolute left-1/2 top-0 z-20
      aspect-[4/5] -translate-x-1/2
      w-[min(76vw,340px)]
      sm:w-[min(68vw,360px)]
      md:w-[min(52vw,390px)]
      lg:w-[min(42vw,420px)]
      xl:w-[420px]
    "
  >
    <div
      className="h-full w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 48%, transparent 100%), linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 48%, transparent 100%), linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
        WebkitMaskComposite: "source-in",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/profile/heroimg.png"
        alt="Talha Portrait"
        className="h-full w-full object-cover object-top"
      />
    </div>
  </div>
</div>
```


          {/* ── Bottom Content Group ── */}
          <div className="relative z-30 flex w-full max-w-[800px] flex-col items-center">
            <h1
              data-hero-statement
              data-hero-animate
              className="portfolio-display w-full text-[1.9rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.6rem] md:text-[3.2rem] lg:text-[4rem]"
            >
              BUILDING <span className="text-[#EB5002]">IMPACTFUL</span> DIGITAL
              EXPERIENCES.
            </h1>

            <p
              data-hero-copy
              data-hero-animate
              className="portfolio-copy mt-4 md:mt-5 w-full max-w-[34rem] text-center text-[0.95rem] md:text-[1.15rem] leading-relaxed text-white/75"
            >
              I build modern web applications, SaaS products and AI-powered
              automation systems that deliver results.
            </p>

            <div className="mt-8 md:mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#work"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold border border-[#EB5002] bg-[#EB5002] px-8 py-3.5 text-[0.8rem] md:text-[0.85rem] text-[#0b0b0b] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="absolute inset-0 -translate-x-[100%] bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-[#ffffff] whitespace-nowrap">
                  VIEW MY WORK
                </span>
              </a>

              <a
                href="#contact"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold border border-white/10 bg-white/[0.02] px-8 py-3.5 text-[0.8rem] md:text-[0.85rem] text-white backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="relative whitespace-nowrap">
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
