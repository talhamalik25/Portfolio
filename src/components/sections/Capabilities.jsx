"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Bot, Code2, Palette } from "lucide-react";
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
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const panelRefs = useRef([]);
  const numberRefs = useRef([]);
  const ghostIconRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set("[data-svc-animate]", { opacity: 1, y: 0 });
        gsap.set("[data-svc-row]", { opacity: 1, y: 0 });
        return;
      }

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

      gsap.fromTo(
        "[data-svc-row]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean);
    if (panels.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      panels.forEach((panel, i) => {
        const content = panel.querySelector("[data-svc-panel-inner]");
        if (!content) return;

        const isActive = i === activeIndex;
        const targetHeight = isActive && content ? content.scrollHeight : 0;

        if (prefersReducedMotion) {
          panel.style.height = `${targetHeight}px`;
          const innerEls = panel.querySelectorAll("[data-svc-fade]");
          innerEls.forEach((el) => {
            el.style.opacity = isActive ? "1" : "0";
            el.style.transform = "translateY(0)";
          });
          return;
        }

        gsap.to(panel, {
          height: targetHeight,
          duration: 0.42,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          overwrite: true,
        });

        const fadeTargets = panel.querySelectorAll("[data-svc-fade]");
        gsap.to(fadeTargets, {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 8,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: true,
          delay: isActive ? 0.12 : 0,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleRowEnter = (index) => {
    if (isDesktop) {
      setActiveIndex(index);
    }
  };

  const handleRowTap = (index) => {
    if (!isDesktop) {
      setActiveIndex((prev) => (prev === index ? -1 : index));
    }
  };

  // Subtle hover micro-interactions: the index drifts and the ghost
  // visual fades up behind the row. All GSAP, nothing structural.
  const handleRowHover = (index, isEntering) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const number = numberRefs.current[index];
    const ghost = ghostIconRefs.current[index];

    if (number) {
      gsap.to(number, {
        x: isEntering ? 6 : 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (ghost) {
      gsap.to(ghost, {
        y: isEntering ? -8 : 0,
        scale: isEntering ? 1.06 : 1,
        opacity: isEntering ? 0.09 : 0.04,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative overflow-hidden bg-[#0A0A0A] pt-32 text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Services"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 pb-24 sm:px-6 lg:px-8 lg:pb-36">
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

        <div ref={listRef} className="border-t border-white/10">
          {services.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={item.title}
                data-svc-row
                ref={(element) => {
                  rowRefs.current[index] = element;
                }}
                className={[
                  "group relative border-b border-white/10 overflow-hidden transition-colors duration-300 ease-out",
                  isActive ? "bg-[#EB5002]/[0.06]" : "bg-transparent",
                ].join(" ")}
                onMouseEnter={() => {
                  handleRowEnter(index);
                  handleRowHover(index, true);
                }}
                onMouseLeave={() => handleRowHover(index, false)}
                onClick={() => handleRowTap(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleRowTap(index);
                  }
                }}
              >
                <div
                  ref={(element) => {
                    ghostIconRefs.current[index] = element;
                  }}
                  className="pointer-events-none absolute right-4 top-4 opacity-[0.04] text-[#EB5002] select-none lg:right-8 lg:top-6"
                >
                  <Icon
                    className="h-24 w-24 lg:h-36 lg:w-36"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative flex items-center gap-4 px-2 py-5 sm:px-4 sm:py-7 lg:gap-6 lg:px-6 lg:py-8">
                  <div
                    ref={(element) => {
                      numberRefs.current[index] = element;
                    }}
                    className="shrink-0 text-[0.7rem] font-semibold tracking-[0.18em] text-[#EB5002] sm:text-[0.78rem]"
                  >
                    {item.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="portfolio-display truncate text-[1.35rem] font-bold leading-[1] tracking-[-0.04em] text-white sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.8rem]">
                        {item.title.toUpperCase()}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-3 shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ease-out group-hover:border-[#EB5002]/40 group-hover:bg-[#EB5002]/10 lg:h-11 lg:w-11">
                    <span
                      className={[
                        "inline-block text-lg leading-none text-white/70 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center lg:text-xl",
                        isActive ? "rotate-45 text-[#EB5002]" : "rotate-0 group-hover:rotate-45 group-hover:text-[#EB5002]",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>

                <div
                  ref={(element) => {
                    panelRefs.current[index] = element;
                  }}
                  className="overflow-hidden h-0"
                >
                  <div data-svc-panel-inner className="px-2 pb-7 sm:px-4 sm:pb-9 lg:gap-10 lg:px-6 lg:pb-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div data-svc-fade className="lg:max-w-[58%]">
                        <p className="portfolio-copy text-[0.98rem] leading-relaxed text-[#A9A39E] sm:text-[1.04rem]">
                          {item.description}
                        </p>
                      </div>

                      <div
                        data-svc-fade
                        className="flex flex-col items-start gap-5 lg:items-end"
                      >
                        <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              data-svc-fade
                              className="portfolio-tag rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.68rem] font-medium text-[#BEB8B3]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          data-svc-fade
                          className="portfolio-button-label group/cta inline-flex items-center gap-2 text-[#EB5002] transition-transform duration-300 ease-out hover:translate-x-[-2px]"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <span>Let&apos;s Talk</span>
                          <span aria-hidden="true" className="text-base leading-none">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
