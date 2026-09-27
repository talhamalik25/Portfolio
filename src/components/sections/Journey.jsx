"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2023",
    label: "Started the Journey",
    title: "Started the Journey",
    description:
      "Began learning web development — HTML, CSS, and JavaScript fundamentals, building my first static projects.",
  },
  {
    year: "2023",
    label: "CS Student",
    title: "CS Student at Iqra University",
    description:
      "Enrolled in Computer Science, building a formal foundation alongside self-taught frontend skills.",
  },
  {
    year: "2024",
    label: "Frontend Mastery",
    title: "Frontend Mastery",
    description:
      "Leveled up with React, Next.js, and Tailwind CSS — started building full production-ready UIs with AI-assisted workflows.",
  },
  {
    year: "2024",
    label: "Paid Projects",
    title: "First Paid Client Projects",
    description:
      "Delivered 2 paid freelance projects, taking real client requirements from brief to deployed product.",
  },
  {
    year: "2025",
    label: "Founded CoreCraft",
    title: "Founded CoreCraft",
    description:
      "Launched CoreCraft, a web development and AI automation agency, to serve small and medium businesses with modern digital products.",
  },
  {
    year: "Now",
    label: "Learning Backend + AI",
    title: "Learning Backend + AI Automation",
    description:
      "Currently deepening backend development skills, with n8n-based AI automation workflows, heading toward DevOps next.",
  },
  {
    year: "Next",
    label: "What’s Ahead",
    title: "What’s Ahead",
    description:
      "Expanding CoreCraft, building SaaS products, and moving deeper into AI engineering and automation systems.",
  },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const nodes = nodeRefs.current.filter(Boolean);
      if (!path || nodes.length === 0) return undefined;

      const updatePath = () => {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const width = sectionRect.width;
        const height = sectionRect.height;

        const svg = path.ownerSVGElement;
        if (svg) {
          svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        const points = nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            x: rect.left - sectionRect.left + rect.width / 2,
            y: rect.top - sectionRect.top + rect.height / 2,
          };
        });

        if (!points.length) return;

        const isMobile = window.innerWidth < 1024;
        const railX = isMobile ? 28 : 500;

        let d = isMobile
          ? `M ${railX} ${points[0].y}`
          : `M ${points[0].x} ${points[0].y}`;

        points.forEach((point, index) => {
          if (index === 0) return;
          const prev = points[index - 1];

          if (isMobile) {
            d += ` L ${railX} ${point.y}`;
            return;
          }

          const spread = Math.max(20, Math.abs(point.x - prev.x) * 0.28);
          const midpointX = (prev.x + point.x) / 2;
          const controlY = prev.y + (point.y - prev.y) / 2 - spread;
          d += ` Q ${midpointX} ${controlY}, ${point.x} ${point.y}`;
        });

        path.setAttribute("d", d);
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      };

      updatePath();

      let resizeTimer;
      const handleResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => updatePath(), 80);
      };

      window.addEventListener("resize", handleResize);

      gsap.utils.toArray(".timeline-card").forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        gsap.from(card, {
          x: window.innerWidth >= 1024 ? (fromLeft ? -60 : 60) : 0,
          y: window.innerWidth < 1024 ? 28 : 18,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray(".timeline-node").forEach((node) => {
        gsap.set(node, { scale: 1, opacity: 0.35, boxShadow: "0 0 0 rgba(255,107,0,0)" });
        gsap.to(node, {
          scale: 1.28,
          opacity: 1,
          boxShadow: "0 0 20px rgba(255,107,0,0.6)",
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        window.clearTimeout(resizeTimer);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-label="Journey timeline"
      className="relative overflow-hidden bg-[#FAF7F2] py-24 text-[#111111] sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-[760px] text-center lg:mb-20">
          <div className="portfolio-kicker mb-5 text-[#EB5002]">06 — JOURNEY</div>

          <h2 className="portfolio-display mb-5 text-[2.5rem] font-bold leading-[0.9] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem] lg:text-[4.3rem]">
            How I <span className="text-[#EB5002]">Got Here.</span>
          </h2>

          <p className="portfolio-copy mx-auto max-w-[42rem] text-[1.05rem] text-[#5B564F]">
            A timeline of the skills I&apos;ve built, the projects I&apos;ve shipped,
            and where I&apos;m headed next.
          </p>
        </div>

        <div className="relative mx-auto max-w-[1040px]">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M 500 0"
              stroke="#FF6B00"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="space-y-8 md:space-y-10">
            <div className="md:hidden">
              <div className="relative ml-3 pl-7">
                <div className="absolute left-[18px] top-0 h-full w-px bg-[#FF6B00]/35" aria-hidden="true" />

                {milestones.map((item, index) => (
                  <div key={item.year + item.title} className="relative grid grid-cols-[32px_1fr] gap-4 pb-6 last:pb-0">
                    <div className="relative flex items-center justify-center py-4">
                      <div
                        ref={(el) => {
                          nodeRefs.current[index] = el;
                        }}
                        className="timeline-node relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#FAF7F2] bg-[#FF6B00] opacity-35 shadow-[0_0_0_rgba(255,107,0,0)]"
                      >
                        <span className="block h-2.5 w-2.5 rounded-full bg-[#FAF7F2]" aria-hidden="true" />
                      </div>
                    </div>

                    <div
                      className="timeline-card rounded-[1.5rem] border border-[#1B1714]/8 bg-white p-5 shadow-[0_18px_40px_rgba(17,17,17,0.05)]"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full border border-[#EB5002]/15 bg-[#EB5002]/10 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#EB5002]">
                          {item.year}
                        </span>
                        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#8A817B]">
                          {item.label}
                        </span>
                      </div>

                      <h3 className="mb-3 text-[1.2rem] font-bold leading-tight tracking-[-0.04em] text-[#111111]">
                        {item.title}
                      </h3>

                      <p className="text-[0.96rem] leading-relaxed text-[#5E5852]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              {milestones.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.year + item.title}
                    className="relative grid grid-cols-[1fr_80px_1fr] items-center gap-0"
                  >
                    <div
                      className={[
                        "timeline-card relative rounded-[1.5rem] border border-[#1B1714]/8 bg-white p-5 shadow-[0_18px_40px_rgba(17,17,17,0.05)] sm:p-6",
                        isLeft ? "col-start-1 mr-10 justify-self-end" : "col-start-3 ml-10",
                      ].join(" ")}
                      style={{ maxWidth: "420px" }}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full border border-[#EB5002]/15 bg-[#EB5002]/10 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#EB5002]">
                          {item.year}
                        </span>
                        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#8A817B]">
                          {item.label}
                        </span>
                      </div>

                      <h3 className="mb-3 text-[1.35rem] font-bold leading-tight tracking-[-0.04em] text-[#111111] sm:text-[1.55rem]">
                        {item.title}
                      </h3>

                      <p className="text-[0.98rem] leading-relaxed text-[#5E5852]">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative flex items-center justify-center py-4">
                      <div
                        ref={(el) => {
                          nodeRefs.current[index] = el;
                        }}
                        className="timeline-node relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#FAF7F2] bg-[#FF6B00] opacity-35 shadow-[0_0_0_rgba(255,107,0,0)] md:h-6 md:w-6"
                      >
                        <span className="block h-2.5 w-2.5 rounded-full bg-[#FAF7F2]" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="hidden md:block" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
