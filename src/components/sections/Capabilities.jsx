"use client";
import { readyEntries } from "@/src/lib/content";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

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
      "Full-stack web apps built with Next.js, React, Node.js, Express and MongoDB, with REST APIs and authentication.",
    tags: ["Next.js", "React", "Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
    icon: Code2,
  },
  {
    number: "02",
    title: "Interactive Frontend",
    description:
      "Responsive, animated interfaces made with Tailwind CSS, GSAP and Three.js.",
    tags: ["Tailwind CSS", "GSAP", "Three.js"],
    icon: Palette,
  },
  {
    number: "03",
    title: "AI Automation",
    description: "Workflows and integrations using n8n and LLM APIs.",
    tags: ["n8n", "LLM APIs"],
    icon: Bot,
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);

  useMotionEffect(useCallback(() => {
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
  }, []));
  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-surface-a py-20 text-content sm:py-24 lg:py-28"
      aria-labelledby="capabilities-heading"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--text) 6%, transparent) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl sm:mb-12">
          <p className="portfolio-kicker mb-4 text-accent-ink">WHAT I DO</p>
          <h2
            id="capabilities-heading"
            className="portfolio-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl"
          >
            How I <span className="text-accent-ink">Build.</span>
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {readyEntries(capabilities, "capabilities").map(({ number, title, description, tags, icon: Icon }) => (
            <article
              key={title}
              data-capability-card
              className="rounded-3xl border border-outline bg-card p-6 transition-colors duration-300 hover:border-[#EB5002]/40 sm:p-7"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted">{number}</span>
                <Icon className="h-5 w-5 text-accent-ink" aria-hidden="true" />
              </div>
              <h3 className="portfolio-display mb-3 text-2xl font-bold leading-tight tracking-[-0.04em] text-content">
                {title}
              </h3>
              <p className="portfolio-copy min-h-[5rem] text-base leading-relaxed text-muted">
                {description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
                {tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-outline px-3 py-1.5 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
