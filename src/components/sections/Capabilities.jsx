"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "MERN DEVELOPMENT",
    description:
      "Modern full-stack web applications built with scalable and maintainable architecture.",
    tags: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    accent: "from-[#EB5002]/20 via-[#EB5002]/8 to-transparent",
  },
  {
    number: "02",
    title: "AI AUTOMATION",
    description:
      "Intelligent workflows that automate repetitive processes and help businesses operate smarter.",
    tags: ["AI Agents", "n8n", "APIs", "Automation", "LLMs"],
    accent: "from-[#e3b49c]/10 via-[#EB5002]/8 to-transparent",
  },
  {
    number: "03",
    title: "CREATIVE WEB EXPERIENCES",
    description:
      "High-end interactive interfaces designed to feel smooth, modern, and memorable.",
    tags: ["GSAP", "Three.js", "WebGL", "Motion", "Interaction"],
    accent: "from-[#EB5002]/12 via-[#f0c6af]/8 to-transparent",
  },
];

export default function Capabilities() {
  const rootRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set("[data-capability-animate]", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        "[data-capability-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-capability-heading]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-capability-copy]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.08 }
      );

      gsap.fromTo(
        "[data-capability-card]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.18,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setPointer({ x, y, active: true });
  };

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#080606]"
      aria-label="Capabilities"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EB5002]/5 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1200px] px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="mb-10 max-w-[760px]">
          <div
            data-capability-eyebrow
            data-capability-animate
            className="portfolio-kicker mb-4 flex items-center gap-3 text-[#EB5002]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.16)]" aria-hidden="true" />
            WHAT I DO
          </div>

          <h2
            data-capability-heading
            data-capability-animate
            className="portfolio-display max-w-[12ch] text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.065em] text-white sm:text-[3.2rem] md:text-[4rem] lg:text-[4.6rem]"
          >
            Building digital experiences that actually work.
          </h2>
        </div>

        <p
          data-capability-copy
          data-capability-animate
          className="portfolio-copy mb-8 max-w-[38rem] text-[#8A8A8A]"
        >
          I build modern web applications and intelligent digital systems focused on performance, usability, and real business impact.
        </p>

        <div className="grid gap-5 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <article
              key={item.title}
              data-capability-card
              data-capability-animate
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0909]/80 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#EB5002]/40 hover:shadow-[0_20px_50px_rgba(235,80,2,0.08)] md:p-6"
              onMouseMove={handlePointerMove}
              onMouseLeave={() => setPointer({ x: 0, y: 0, active: false })}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(235, 80, 2, 0.18), transparent 38%)`,
                }}
              />
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} aria-hidden="true" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="portfolio-meta font-medium text-[#EB5002]">
                    {item.number}
                  </span>
                  <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
                </div>

                <h3
                  className="portfolio-display mb-4 text-[1.4rem] font-semibold leading-[1.08] tracking-[-0.055em] text-white transition-colors duration-300 ease-out group-hover:text-[#f8d8c7] sm:text-[1.75rem]"
                >
                  {item.title}
                </h3>

                <p className="portfolio-copy max-w-[32ch] text-[0.96rem] text-[#A5A5A5]">
                  {item.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="portfolio-tag rounded-full border border-white/10 bg-[#0f0d0d]/80 px-2.5 py-1 text-[#d7d7d7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
