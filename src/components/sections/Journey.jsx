"use client";
import { readyEntries } from "@/src/lib/content";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import SectionHeader from "@/src/components/ui/SectionHeader";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestoneData = [
  {
    year: "",
    label: "Foundations",
    title: "Started with HTML, CSS and JavaScript",
    description: "Built my first static projects.",
  },
  {
    year: "2026",
    label: "Computer Science",
    title: "Began BS Computer Science at Iqra University",
    description: "Currently in my 2nd semester (October 2026).",
  },
  {
    year: "",
    label: "Frontend",
    title: "Learned React, Next.js and Tailwind CSS",
    description: "The stack I use for interfaces today.",
  },
  {
    year: "",
    label: "Full-stack projects",
    title: "Built full-stack projects",
    description: "Worked with Node.js, Express and MongoDB.",
  },
  {
    year: "Now",
    label: "AKTech Digital Solutions",
    title: "Frontend Developer at AKTech",
    description:
      "Building web interfaces alongside my BS CS studies at Iqra University, Karachi.",
  },
  {
    year: "Direction",
    label: "Next",
    title: "SaaS products and deeper AI engineering",
    description: "Where I want the work to go — not a role I hold today.",
  },
];

const milestones = readyEntries(milestoneData, "Journey");

export default function Journey() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const nodeRefs = useRef([]);

  useMotionEffect(
    useCallback(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        const path = pathRef.current;
        const nodes = nodeRefs.current.filter(Boolean);
        if (!path || nodes.length === 0) return undefined;

        const updatePath = () => {
          const sectionRect = path.ownerSVGElement.getBoundingClientRect();
          const width = sectionRect.width;
          const height = sectionRect.height;
          const svg = path.ownerSVGElement;
          if (svg) svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

          const points = nodes.map((node) => {
            const rect = node.getBoundingClientRect();
            return {
              x: rect.left - sectionRect.left + rect.width / 2,
              y: rect.top - sectionRect.top + rect.height / 2,
            };
          });
          if (!points.length) return;

          const isDesktop = window.innerWidth >= 768;
          let d = `M ${points[0].x} ${points[0].y}`;
          points.forEach((point, index) => {
            if (index === 0) return;
            const prev = points[index - 1];
            if (!isDesktop) {
              d += ` L ${point.x} ${point.y}`;
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

        gsap.utils.toArray(".timeline-card").forEach((card) => {
          gsap.from(card, {
            y: 28,
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
    }, []),
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-cream py-24 text-ink-strong sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          kicker="Journey"
          title="How I"
          accent="Got Here."
          headingId="journey-heading"
          light
          align="center"
          lede="A timeline of the skills I have built, the work I can show, and where I am headed next."
        />

        <div className="relative mx-auto max-w-[1040px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M 500 0"
              className="stroke-accent-bright"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <ol className="relative space-y-8 md:space-y-10">
            {milestones.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={item.title}
                  className="grid grid-cols-[32px_1fr] items-center gap-4 md:grid-cols-[1fr_80px_1fr] md:gap-0"
                >
                  <article
                    className={[
                      "timeline-card rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_18px_40px_rgba(17,17,17,0.05)] sm:p-6",
                      "col-start-2 md:row-start-1 md:max-w-[420px]",
                      isLeft ? "md:col-start-1 md:mr-10 md:justify-self-end" : "md:col-start-3 md:ml-10",
                    ].join(" ")}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      {item.year ? (
                        <span className="inline-flex rounded-full border border-accent/15 bg-accent/10 px-2.5 py-1 text-[0.64rem] font-bold tracking-[0.18em] text-accent uppercase">
                          {item.year}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-[0.64rem] font-semibold tracking-[0.16em] text-muted-label uppercase">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="mb-3 text-[1.2rem] leading-tight font-bold tracking-[-0.04em] text-ink-strong md:text-[1.45rem]">
                      {item.title}
                    </h3>
                    <p className="text-[0.96rem] leading-relaxed text-muted-body">{item.description}</p>
                  </article>

                  <div className="relative col-start-1 row-start-1 flex items-center justify-center py-4 md:col-start-2">
                    <div
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      className="timeline-node relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cream bg-accent-bright opacity-35 md:h-6 md:w-6"
                    >
                      <span className="block h-2.5 w-2.5 rounded-full bg-cream" aria-hidden="true" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
