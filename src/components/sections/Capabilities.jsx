"use client";
import { readyEntries } from "@/src/lib/content";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import SectionHeader from "@/src/components/ui/SectionHeader";

import { useCallback, useRef } from "react";
import { Bot, Code2, Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Web apps with a clear path from interface to data: Next.js, React, Node.js, Express and MongoDB, with REST APIs and authentication.",
    builds: ["Product dashboards", "Authenticated app flows", "REST APIs behind a React interface"],
    tags: ["Next.js", "React", "Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
    responsibilities: [
      "Connect screens to the data they need, instead of treating frontend and backend as separate jobs.",
      "Keep routes, models and forms aligned so the product can be changed later.",
    ],
    icon: Code2,
  },
  {
    number: "02",
    title: "Interactive Frontend",
    description:
      "Responsive layouts with motion used where it helps — Tailwind CSS, GSAP and Three.js when the project calls for it.",
    builds: ["Marketing and product interfaces", "Scroll-driven storytelling", "Responsive component systems"],
    tags: ["Tailwind CSS", "GSAP", "Three.js"],
    responsibilities: [
      "Start from what a screen needs to do, then add motion only where it clarifies the story.",
      "Check layouts across phone, tablet and desktop before calling the work done.",
    ],
    icon: Palette,
  },
  {
    number: "03",
    title: "AI Automation",
    description: "Workflows and integrations using n8n and LLM APIs, connecting steps that would otherwise be manual.",
    builds: ["Lead capture and follow-up flows", "Tool-to-tool automations"],
    tags: ["n8n", "LLM APIs"],
    responsibilities: [
      "Map the steps in a process before wiring tools together.",
      "Keep the human-facing interface honest about what the automation actually does.",
    ],
    icon: Bot,
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);

  useMotionEffect(
    useCallback(() => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const context = gsap.context(() => {
        gsap.from("[data-capability-card]", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
      }, section);

      return () => context.revert();
    }, []),
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-section bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[18px_18px] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          kicker="Services"
          title="How I"
          accent="Build."
          headingId="capabilities-heading"
          lede="Three ways I turn a brief into working software — the interface people use, the stack behind it, and the automations that connect the steps."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {readyEntries(capabilities, "capabilities").map(
            ({ number, title, description, builds, tags, responsibilities, icon: Icon }) => (
              <article
                key={title}
                data-capability-card
                className="flex flex-col rounded-3xl border border-white/10 bg-surface-warm p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-white/45">
                    {number}
                  </span>
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="portfolio-display mb-3 text-2xl leading-tight font-bold tracking-[-0.04em] text-white">
                  {title}
                </h3>
                <p className="portfolio-copy text-base leading-relaxed text-white/65">
                  {description}
                </p>
                <ul className="mt-6 space-y-2" aria-label={`${title} outcomes`}>
                  {builds.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <details className="group mt-auto border-t border-white/10 pt-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm text-white/70 hover:text-accent [&::-webkit-details-marker]:hidden">
                    The technical detail
                    <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pt-4">
                    <p className="mb-3 text-xs tracking-[0.16em] text-white/40 uppercase">Technologies</p>
                    <ul className="flex flex-wrap gap-2" aria-label={`${title} technologies`}>
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 mb-3 text-xs tracking-[0.16em] text-white/40 uppercase">
                      How I work
                    </p>
                    <ul className="space-y-2 text-sm leading-relaxed text-white/65">
                      {responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
