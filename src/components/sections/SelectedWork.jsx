"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./workData";

gsap.registerPlugin(ScrollTrigger);

const WorkStageCanvas = dynamic(() => import("./WorkStageCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[340px] w-full rounded-[28px] bg-[#0E0C0A] lg:min-h-[460px]" />
  ),
});

function DesktopStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const detailsRef = useRef(null);
  const active = projects[activeIndex];

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
      );
    }, detailsRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col justify-between lg:col-span-5">
        <ul className="space-y-1">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={project.title}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group flex w-full min-h-[52px] items-baseline gap-4 border-b border-[#1B1714]/10 py-4 text-left transition-colors duration-300"
                >
                  <span
                    className={`portfolio-kicker shrink-0 transition-colors duration-300 ${
                      isActive ? "text-[#EB5002]" : "text-[#1B1714]/35"
                    }`}
                  >
                    {project.number}
                  </span>
                  <span
                    className={`portfolio-display text-[1.45rem] leading-[0.95] tracking-[-0.05em] transition-colors duration-300 sm:text-[1.7rem] ${
                      isActive ? "text-[#111111]" : "text-[#111111]/40 group-hover:text-[#111111]/70"
                    }`}
                  >
                    {project.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div ref={detailsRef} className="mt-8 lg:mt-10">
          <p className="portfolio-kicker mb-3 text-[#EB5002]">{active.category}</p>
          <p className="portfolio-copy max-w-[34rem] text-[1.02rem] text-[#5D5652]">
            {active.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={active.href}
            className="portfolio-button-label mt-6 inline-flex min-h-[44px] items-center gap-2 text-[#EB5002]"
          >
            <span>View Case Study</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="relative lg:col-span-7">
        <WorkStageCanvas activeIndex={activeIndex} />
        <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
          {active.number} / 0{projects.length}
        </div>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeDot, setActiveDot] = useState(0);

  const updateActiveDot = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveDot(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveDot);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateActiveDot]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      el.style.opacity = "1";
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToCard = (index) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {projects.map((project, i) => (
          <article
            key={project.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="w-[87vw] flex-shrink-0 overflow-hidden rounded-[24px] border border-[#1B1714]/10 bg-[#FFFDFB] shadow-[0_16px_40px_rgba(17,17,17,0.06)]"
            style={{ scrollSnapAlign: "center" }}
          >
            <div
              className="relative aspect-[16/10] overflow-hidden"
              style={{
                background: `linear-gradient(145deg, ${project.palette.deep} 0%, ${project.palette.mid} 48%, ${project.palette.accent} 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-40" style={{
                background: `radial-gradient(circle at 70% 20%, ${project.palette.wash}, transparent 55%)`,
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 p-4">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/75">
                  {project.number} — {project.category}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="portfolio-display text-[1.5rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#111111]">
                {project.title}
              </h3>
              <p className="portfolio-copy mt-3 text-[0.92rem] leading-relaxed text-[#5D5652]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.href}
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[0.88rem] font-semibold text-[#EB5002]"
              >
                <span>View Case Study</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-1">
        {projects.map((project, i) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Go to ${project.title}`}
            onClick={() => scrollToCard(i)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeDot ? 10 : 8,
                height: i === activeDot ? 10 : 8,
                backgroundColor: i === activeDot ? "#EB5002" : "transparent",
                border: `2px solid ${i === activeDot ? "#EB5002" : "#1B1714"}`,
                opacity: i === activeDot ? 1 : 0.25,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-work-animate]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-[#1B1714]/10 bg-[#FAF7F2] text-[#1A1613] py-24 lg:py-36"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(26,22,19,0.04) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Selected Work"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 md:mb-20" data-work-animate>
          <div className="portfolio-kicker mb-5 text-[#EB5002]">SELECTED WORK</div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="portfolio-display max-w-[13ch] text-[2.6rem] font-bold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem]">
              Things I&apos;ve <span className="text-[#EB5002]">Built.</span>
            </h2>
            <p className="portfolio-copy max-w-[34rem] text-[#6B625D]">
              A selection of digital products, web experiences, and software
              systems I&apos;ve worked on.
            </p>
          </div>
        </div>

        <div data-work-animate>
          <div className="hidden md:block">
            {isDesktop ? (
              <DesktopStage />
            ) : (
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="h-48 rounded-[24px] bg-[#111111]/5 lg:col-span-5" />
                <div className="min-h-[340px] rounded-[28px] bg-[#0E0C0A] lg:col-span-7 lg:min-h-[460px]" />
              </div>
            )}
          </div>
          <div className="md:hidden">{!isDesktop ? <MobileCarousel /> : null}</div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <a
            href="#work"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1B1714]/10 bg-[#111111] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#EB5002]/40 hover:bg-[#EB5002] hover:text-[#111111]"
          >
            <span>View All Work</span>
            <span
              aria-hidden="true"
              className="text-base leading-none transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
