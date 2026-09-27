"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Bot, Code2, Layers, Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "MERN Development",
    description:
      "Modern full-stack web applications built with scalable and maintainable architecture using MongoDB, Express, React, and Node.js.",
    tags: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    icon: Code2,
  },
  {
    number: "02",
    title: "AI Automation",
    description:
      "Intelligent workflows that automate repetitive processes and help businesses save time using tools like n8n and custom AI integrations.",
    tags: ["AI Agents", "n8n", "APIs", "Automation", "LLMs"],
    icon: Bot,
  },
  {
    number: "03",
    title: "Creative Web Experiences",
    description:
      "High-end interactive interfaces designed with motion, thoughtful UX, and attention to detail that make products memorable.",
    tags: ["GSAP", "Three.js", "WebGL", "Motion", "Interaction"],
    icon: Palette,
  },
];

export default function Capabilities() {
  const rootRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-svc-animate]", { opacity: 1, y: 0 });
        gsap.set("[data-svc-divider]", { scaleX: 1 });
        return;
      }

      // Header animations
      gsap.fromTo(
        "[data-svc-eyebrow]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        "[data-svc-heading]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        "[data-svc-copy]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );

      // Card stagger — plays once on scroll
      gsap.fromTo(
        "[data-svc-card]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "[data-svc-grid]",
            start: "top 82%",
            once: true,
          },
        },
      );

      // Divider line expansion — plays once on scroll
      gsap.fromTo(
        "[data-svc-divider]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "[data-svc-grid]",
            start: "top 82%",
            once: true,
          },
        },
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

  const tiltCard = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = (0.5 - py) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const resetTilt = (event) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative overflow-hidden bg-[#0A0A0A] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Services"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        {/* Header */}
        <div className="mb-6 max-w-[760px]">
          <div
            data-svc-eyebrow
            data-svc-animate
            className="portfolio-kicker mb-5 flex items-center gap-3 text-[#EB5002]"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.16)]"
              aria-hidden="true"
            />
            WHAT I DO
          </div>

          <h2
            data-svc-heading
            data-svc-animate
            className="portfolio-display text-[2.5rem] font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-[3.2rem] md:text-[4rem] lg:text-[4.6rem]"
          >
            Building Digital Experiences That{" "}
            <span className="text-[#EB5002]">Actually Work.</span>
          </h2>
        </div>

        <p
          data-svc-copy
          data-svc-animate
          className="portfolio-copy mb-16 max-w-[38rem] text-[1.05rem] text-[#8A8A8A]"
        >
          I build modern web applications and intelligent digital systems
          focused on performance, usability, and real business impact.
        </p>

        {/* Cards Grid */}
        <div
          data-svc-grid
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                data-svc-card
                data-svc-animate
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#161616_0%,#0D0D0D_100%)] p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#EB5002]/40 hover:shadow-[0_0_40px_rgba(255,107,0,0.15)] md:p-7"
                onMouseMove={(event) => {
                  handlePointerMove(event);
                  tiltCard(event);
                }}
                onMouseLeave={(event) => {
                  setPointer({ x: 0, y: 0, active: false });
                  resetTilt(event);
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(235, 80, 2, 0.14), transparent 40%)`,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    data-svc-divider
                    className="mb-6 h-px w-full origin-left bg-white/10"
                    aria-hidden="true"
                  />

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#EB5002]/20 bg-[#EB5002]/10 text-[#EB5002] transition-all duration-300 ease-out group-hover:bg-[#EB5002]/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <span className="portfolio-meta mb-6 block text-sm font-semibold text-[#EB5002] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:origin-left">
                    {item.number}
                  </span>

                  <h3 className="portfolio-display mb-4 text-[1.4rem] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[1.65rem]">
                    {item.title}
                  </h3>

                  <p className="portfolio-copy max-w-[34ch] text-[0.95rem] leading-relaxed text-[#777]">
                    {item.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2 pb-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="portfolio-tag rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.7rem] font-medium text-[#A3A3A3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#D9D9D9] opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      Explore
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
