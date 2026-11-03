"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef(null);

  useMotionEffect(useCallback(() => {
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

      const setHeroWordY = gsap.quickSetter("[data-hero-word]", "y", "px");
      const setHeroVisualY = gsap.quickSetter("[data-hero-visual]", "y", "px");
      const setHeroPositionY = gsap.quickSetter("[data-hero-position]", "y", "px");

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const offset = self.progress * 150;
          setHeroWordY(offset * 0.4);
          setHeroVisualY(offset * 0.2);
          setHeroPositionY(offset * 0.1);
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

    return () => ctx.revert();
  }, []));
  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden bg-surface-a text-content"
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
            <div className="flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EB5002]" />
              <span>HI, I&apos;M TALHA</span>
            </div>

            <div className="flex items-center gap-2 text-accent-ink">
              <span>FULL-STACK DEVELOPER</span>
              <span className="text-muted" aria-hidden="true">·</span>
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
        tracking-[-0.04em] text-accent-ink
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
      <Image
        src="/images/profile/heroimg.png"
        alt="Portrait of Talha Malik"
        fill
        sizes="(max-width: 640px) 76vw, (max-width: 768px) 68vw, (max-width: 1024px) 52vw, 420px"
        preload
        className="object-cover object-top"
      />
    </div>
  </div>
</div>
          {/* ── Bottom Content Group ── */}
          <div className="relative z-30 flex w-full max-w-[800px] flex-col items-center">
            <h1
              data-hero-statement
              data-hero-animate
              className="portfolio-display w-full text-[1.9rem] font-bold leading-[1.05] tracking-[-0.03em] text-content sm:text-[2.6rem] md:text-[3.2rem] lg:text-[4rem]"
            >
              I build full-stack web apps and automations that work end to end.
            </h1>

            <p
              data-hero-copy
              data-hero-animate
              className="portfolio-copy mt-4 md:mt-5 w-full max-w-[34rem] text-center text-[0.95rem] md:text-[1.15rem] leading-relaxed text-muted"
            >
              Frontend Developer at AKTech and BS CS student at Iqra University,
              Karachi. I build with Next.js, Node.js and MongoDB.
            </p>
            <a href="https://aktech.tech" target="_blank" rel="noopener noreferrer" className="mt-4 rounded-full border border-[#EB5002]/20 bg-[#EB5002]/10 px-3 py-1.5 text-xs text-accent-ink">Currently at AKTech ↗</a>

            <div className="mt-8 md:mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold border border-[#EB5002] bg-[#EB5002] px-8 py-3.5 text-[0.8rem] md:text-[0.85rem] text-content transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="absolute inset-0 -translate-x-[100%] bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-content whitespace-nowrap">
                  Contact Me
                </span>
              </a>

              <a
                href="#work"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold border border-outline bg-card px-8 py-3.5 text-[0.8rem] md:text-[0.85rem] text-content backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card hover:border-outline focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
              >
                <span className="relative whitespace-nowrap">
                  View Work
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
