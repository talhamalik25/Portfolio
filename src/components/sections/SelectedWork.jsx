"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "EduCore OS",
    category: "SaaS / Full-Stack",
    description:
      "AI-powered school management platform designed for private educational institutions.",
    tags: ["MERN", "SaaS", "Multi-Tenant", "AI"],
    image: "/images/profile/profile.jpg",
    href: "#selected-work",
  },
  {
    number: "02",
    title: "Sooti Mehal",
    category: "E-Commerce / Web",
    description:
      "A modern digital experience built for a fashion and clothing brand.",
    tags: ["React", "E-Commerce", "Responsive"],
    image: "/images/profile/profile.jpg",
    href: "#selected-work",
  },
  {
    number: "03",
    title: "CoreCraft Assistant",
    category: "AI / Chatbot Widget",
    description:
      "An embeddable AI lead-capture chatbot with conversation storage and email notifications.",
    tags: ["Next.js", "Gemini API", "MongoDB"],
    image: "/images/profile/profile.jpg",
    href: "#selected-work",
  },
];

/* ─── Desktop / Tablet 3D Fan (≥768px) ────────────────────────────── */
function DesktopFan() {
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedCards = useMemo(() => {
    if (projects.length <= 1) return projects;
    const left = projects[(activeIndex + projects.length - 1) % projects.length];
    const center = projects[activeIndex];
    const right = projects[(activeIndex + 1) % projects.length];
    return [left, center, right];
  }, [activeIndex]);

  const activeProject = projects[activeIndex];

  return (
    <>
      <style>{`
        .fan-stage {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .fan-card {
          transform-origin: center center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, filter 0.5s ease;
        }
        .fan-card.is-center {
          transform: translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1) !important;
          z-index: 30; opacity: 1; filter: none;
          width: min(62vw, 480px); height: 300px;
        }
        .fan-card.is-left {
          transform: translate(-50%, -50%) translateX(-210px) rotateY(14deg) scale(0.88) !important;
          z-index: 20; opacity: 0.8; filter: saturate(0.85);
          width: min(52vw, 380px); height: 250px;
        }
        .fan-card.is-right {
          transform: translate(-50%, -50%) translateX(210px) rotateY(-14deg) scale(0.88) !important;
          z-index: 20; opacity: 0.8; filter: saturate(0.85);
          width: min(52vw, 380px); height: 250px;
        }
        @media (min-width: 1024px) {
          .fan-card.is-center {
            width: min(70vw, 700px); height: 420px;
            transform: translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1) !important;
          }
          .fan-card.is-left {
            transform: translate(-50%, -50%) translateX(-320px) rotateY(20deg) scale(0.9) !important;
            width: min(58vw, 560px); height: 350px;
          }
          .fan-card.is-right {
            transform: translate(-50%, -50%) translateX(320px) rotateY(-20deg) scale(0.9) !important;
            width: min(58vw, 560px); height: 350px;
          }
        }
      `}</style>

      <div className="overflow-x-clip">
        <div
          className="fan-stage relative mx-auto flex h-[480px] lg:h-[560px] max-w-6xl items-center justify-center"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {orderedCards.map((project, index) => {
            const isCenter = index === 1;
            const isLeft = index === 0;
            return (
              <button
                key={`${project.title}-${index}`}
                type="button"
                onClick={() => {
                  const clickedIndex = projects.findIndex(
                    (item) => item.title === project.title,
                  );
                  setActiveIndex(clickedIndex);
                }}
                className={`fan-card group absolute left-1/2 top-1/2 flex cursor-pointer appearance-none overflow-visible border-0 bg-transparent p-0 text-left ${isCenter ? "is-center" : isLeft ? "is-left" : "is-right"}`}
                style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-[#1B1714]/10 bg-[#FFFDFB] shadow-[0_24px_60px_rgba(16,14,12,0.1)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      filter: "contrast(1.05) saturate(0.9) brightness(0.82)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-[#0B0B0B]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#F4F1EE]/80">
                      {project.category}
                    </div>
                    <h3 className="portfolio-display text-[1.7rem] font-bold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2rem]">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center lg:mt-12">
          <span className="portfolio-meta text-[0.8rem] text-[#111111] font-semibold">
            <span className="text-[#EB5002]">{activeProject.number}</span> / 0{projects.length}
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-[760px] rounded-[28px] border border-[#1B1714]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_40px_rgba(16,14,12,0.04)]">
          <div className="mb-3 flex items-center justify-start gap-3">
            <span className="portfolio-meta text-[#6B625D]">{activeProject.category}</span>
          </div>
          <h3 className="portfolio-display text-[2rem] leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[2.4rem]">
            {activeProject.title}
          </h3>
          <p className="portfolio-copy mt-3 text-[0.96rem] text-[#5D5652]">
            {activeProject.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="portfolio-tag rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <a href={activeProject.href} className="portfolio-button-label inline-flex items-center gap-2 text-[#EB5002]">
              <span>View Case Study</span>
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Mobile Swipeable Card Carousel (<768px) ─────────────────────── */
function MobileCarousel() {
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeDot, setActiveDot] = useState(0);

  // Scroll-position tracker → update dot indicator
  const updateActiveDot = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
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

  // GSAP entrance: fade + slide-up when the block scrolls into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div ref={wrapperRef} style={{ opacity: 0 /* GSAP will animate in */ }}>
      {/* Carousel track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.mobile-carousel-track::-webkit-scrollbar{display:none}`}</style>

        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="mobile-carousel-track w-[87vw] flex-shrink-0 rounded-[24px] border border-[#1B1714]/10 bg-[#FFFDFB] shadow-[0_16px_40px_rgba(17,17,17,0.06)] overflow-hidden"
            style={{ scrollSnapAlign: "center" }}
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE7E0]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image})`,
                  filter: "contrast(1.05) saturate(0.9) brightness(0.8)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 p-4">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/70">
                  {project.number} — {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
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

              <div className="mt-5">
                <a
                  href={project.href}
                  className="inline-flex min-h-[44px] items-center gap-2 text-[#EB5002] font-semibold text-[0.88rem]"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true" className="text-base leading-none">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-3">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to project ${i + 1}`}
            onClick={() => scrollToCard(i)}
            className="flex items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeDot ? 10 : 8,
                height: i === activeDot ? 10 : 8,
                backgroundColor: i === activeDot ? "#EB5002" : "transparent",
                border: i === activeDot ? "2px solid #EB5002" : "2px solid #1B1714",
                opacity: i === activeDot ? 1 : 0.25,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section — conditionally renders Desktop or Mobile ──────── */
export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative border-t border-[#1B1714]/10 bg-[#FAF7F2] text-[#1A1613] py-24 lg:py-36"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(26,22,19,0.04) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Selected Work"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-[100px]">
          <div className="portfolio-kicker mb-5 text-[#EB5002]">
            SELECTED WORK
          </div>
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

        {/* Desktop + Tablet (≥768px) */}
        <div className="hidden md:block">
          <DesktopFan />
        </div>

        {/* Mobile (<768px) */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        <div className="mt-10 lg:mt-12 flex justify-center">
          <a
            href="#work"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1B1714]/10 bg-[#111111] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#EB5002]/40 hover:bg-[#EB5002] hover:text-[#111111]"
          >
            <span>View All Work</span>
            <span aria-hidden="true" className="text-base leading-none transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
