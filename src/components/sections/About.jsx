"use client";

import { useEffect, useRef } from "react";
import { Bot, Code2, MapPin, Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "I'm Talha — a full-stack developer and AI automation specialist based in Karachi. I build modern web applications, SaaS products and automation systems, blending clean engineering with intelligent automation to deliver outcomes that matter.";

const capabilityHighlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "MERN products end to end — from data model to deployed interface — architected to scale.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "n8n workflows and custom AI integrations that remove repetitive work and give teams hours back.",
  },
  {
    icon: Palette,
    title: "Interactive Web Experiences",
    description:
      "Motion-rich, high-polish interfaces built with GSAP and WebGL that people remember.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-about-reveal]", { opacity: 1, y: 0 });
        gsap.set("[data-about-highlight]", { opacity: 1, y: 0 });
        if (imageFrameRef.current) {
          gsap.set(imageFrameRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
          });
          const image = imageFrameRef.current.querySelector("img");
          if (image) gsap.set(image, { scale: 1 });
        }
        return;
      }

      // Header: kicker, heading and intro rise in softly
      gsap.fromTo(
        "[data-about-reveal]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      // Supporting visual: subtle clip reveal + slow settle of the image
      if (imageFrameRef.current) {
        const image = imageFrameRef.current.querySelector("img");

        gsap.fromTo(
          imageFrameRef.current,
          { clipPath: "inset(8% 7% 10% 7%)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: "top 82%",
            },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageFrameRef.current,
                start: "top 82%",
              },
            },
          );
        }
      }

      // Capability highlights: compact staggered rows
      gsap.fromTo(
        "[data-about-highlight]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "[data-about-highlights]",
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#FAF7F2] py-24 text-[#1A1613] sm:py-28 lg:py-36"
      aria-label="About"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header: small label + large heading + concise introduction */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div data-about-reveal className="lg:max-w-[620px]">
            <p className="portfolio-kicker mb-5 flex items-center gap-3 text-[#EB5002]">
              <span
                className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.14)]"
                aria-hidden="true"
              />
              About Me
            </p>

            <h2 className="portfolio-display text-[2.5rem] font-bold leading-[0.92] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem]">
              Full-Stack Development <span className="text-[#EB5002]">&amp;</span>{" "}
              AI Automation.
            </h2>
          </div>

          <p
            data-about-reveal
            className="portfolio-copy max-w-[26rem] text-[1.02rem] leading-relaxed text-[#5D5652] lg:pb-3"
          >
            {INTRO_TEXT}
          </p>
        </div>

        {/* Body: supporting visual + capability highlights */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <div
            ref={imageFrameRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[#1B1714]/10 bg-[#EDE7E0] shadow-[0_18px_40px_rgba(16,14,12,0.06)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile/profile.jpg"
              alt="Talha Malik, full-stack developer and AI automation specialist"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#0B0B0B]/55 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-[#EB5002]" aria-hidden="true" />
                Karachi, Pakistan
              </span>
            </div>
          </div>

          <div data-about-highlights className="flex flex-col justify-center">
            {capabilityHighlights.map((highlight, index) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  data-about-highlight
                  className="group flex items-start gap-5 border-t border-[#1B1714]/10 py-7 last:border-b sm:gap-6 sm:py-8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1B1714]/10 bg-white text-[#EB5002] transition-colors duration-300 group-hover:border-[#EB5002]/30 group-hover:bg-[#EB5002]/10 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.15rem] font-bold leading-tight tracking-[-0.03em] text-[#111111] sm:text-[1.3rem]">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 max-w-[26rem] text-[0.95rem] leading-relaxed text-[#5D5652]">
                      {highlight.description}
                    </p>
                  </div>

                  <span className="shrink-0 pt-1 text-[0.7rem] font-semibold tracking-[0.18em] text-[#EB5002]">
                    0{index + 1}
                  </span>
                </div>
              );
            })}

            <div data-about-highlight className="mt-9">
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
