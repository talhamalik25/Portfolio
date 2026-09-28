"use client";

import { useMemo, useState, useEffect, useRef } from "react";

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

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const orderedCards = useMemo(() => {
    if (projects.length <= 1) return projects;

    const left = projects[(activeIndex + projects.length - 1) % projects.length];
    const center = projects[activeIndex];
    const right = projects[(activeIndex + 1) % projects.length];

    return [left, center, right];
  }, [activeIndex]);

  const activeProject = projects[activeIndex];

  // IntersectionObserver equivalent for mobile scroll snapping
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Quick check to avoid conflict on desktop
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    if (!mediaQuery.matches) return;

    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const containerCenter = container.offsetWidth / 2;
        const scrollLeft = container.scrollLeft;
        
        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child, index) => {
          const childCenter = child.offsetLeft - container.offsetLeft + child.offsetWidth / 2;
          const distance = Math.abs(childCenter - (scrollLeft + containerCenter));
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const handleMobileClick = (index, target) => {
    setActiveIndex(index);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

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

        /* Tablet / mid-width (sm–lg): reduced-angle fan */
        .fan-card.is-center {
          transform: translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1) !important;
          z-index: 30;
          opacity: 1;
          filter: none;
          width: min(62vw, 480px);
          height: 300px;
        }
        .fan-card.is-left {
          transform: translate(-50%, -50%) translateX(-210px) rotateY(14deg) scale(0.88) !important;
          z-index: 20;
          opacity: 0.8;
          filter: saturate(0.85);
          width: min(52vw, 380px);
          height: 250px;
        }
        .fan-card.is-right {
          transform: translate(-50%, -50%) translateX(210px) rotateY(-14deg) scale(0.88) !important;
          z-index: 20;
          opacity: 0.8;
          filter: saturate(0.85);
          width: min(52vw, 380px);
          height: 250px;
        }

        /* Desktop (lg+): full 20deg fan */
        @media (min-width: 1024px) {
          .fan-card.is-center {
            width: min(70vw, 700px);
            height: 420px;
            transform: translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1) !important;
          }
          .fan-card.is-left {
            transform: translate(-50%, -50%) translateX(-320px) rotateY(20deg) scale(0.9) !important;
            width: min(58vw, 560px);
            height: 350px;
          }
          .fan-card.is-right {
            transform: translate(-50%, -50%) translateX(320px) rotateY(-20deg) scale(0.9) !important;
            width: min(58vw, 560px);
            height: 350px;
          }
        }
      `}</style>
      
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-[100px]">
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

        {/* Desktop and Tablet 3D Fan */}
        <div className="hidden sm:block overflow-x-clip">
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
                  style={{
                    transformOrigin: "center center",
                    transformStyle: "preserve-3d",
                  }}
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
              <span className="portfolio-meta text-[#6B625D]">
                {activeProject.category}
              </span>
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
              {/* TODO: link to real case study page */}
              <a
                href={activeProject.href}
                className="portfolio-button-label inline-flex items-center gap-2 text-[#EB5002]"
              >
                <span>View Case Study</span>
                <span aria-hidden="true" className="text-base leading-none">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="sm:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={(e) => handleMobileClick(index, e.currentTarget)}
                  className="group relative w-[85%] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#1B1714]/10 bg-[#FFFDFB] p-3 text-left shadow-[0_16px_40px_rgba(17,17,17,0.05)] transition-all duration-300 ease-out"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(0.96)",
                    opacity: isActive ? 1 : 0.8,
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#EDE7E0]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        filter: "contrast(1.05) saturate(0.9) brightness(0.8)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-[#0B0B0B]/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-3">
                      <div className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#F4F1EE]/80">
                        {project.category}
                      </div>
                      <h3 className="portfolio-display text-[1.35rem] font-bold leading-[0.98] tracking-[-0.04em] text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <span className="portfolio-meta text-[0.8rem] text-[#111111] font-semibold transition-all duration-300">
              <span className="text-[#EB5002]">{activeProject.number}</span> / 0{projects.length}
            </span>
          </div>

          <div className="mt-4 rounded-[24px] border border-[#1B1714]/10 bg-[#FFFDFB] p-5 shadow-[0_18px_40px_rgba(16,14,12,0.04)] transition-all duration-400 ease-out">
            <div className="mb-3 flex items-center justify-start gap-3">
              <span className="portfolio-meta text-[#6B625D]">
                {activeProject.category}
              </span>
            </div>

            <h3 className="portfolio-display text-[1.7rem] leading-[0.98] tracking-[-0.06em] text-[#111111]">
              {activeProject.title}
            </h3>

            <p className="portfolio-copy mt-3 text-[0.94rem] text-[#5D5652]">
              {activeProject.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="portfolio-tag rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5">
              {/* TODO: link to real case study page */}
              <a
                href={activeProject.href}
                className="portfolio-button-label inline-flex items-center gap-2 text-[#EB5002]"
              >
                <span>View Case Study</span>
                <span aria-hidden="true" className="text-base leading-none">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 flex justify-center">
          {/* TODO: link to real case study page */}
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1B1714]/10 bg-[#111111] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#EB5002]/40 hover:bg-[#EB5002] hover:text-[#111111]"
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
