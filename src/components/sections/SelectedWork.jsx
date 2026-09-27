"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

export default function SelectedWork() {
  const rootRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
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
    if (!isDesktop || !rootRef.current || !stackRef.current) {
      return undefined;
    }

    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0, x: 0, rotateX: 0, rotateY: 0 });
        return;
      }

      gsap.set(cards, {
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        transformPerspective: 1200,
        transformOrigin: "center center",
        opacity: 0,
        scale: 0.9,
      });

      gsap.set(cards[0], { opacity: 1, scale: 1, y: 0 });
      gsap.set(cards.slice(1), {
        y: 120,
        scale: 0.92,
        opacity: 0.15,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: stackRef.current,
          scrub: 0.7,
          start: "top top",
          end: "+=" + cards.length * 600,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              cards.length - 1,
              Math.round(self.progress * (cards.length - 1)),
            );
            setActiveIndex(nextIndex);
          },
        },
      });

      let offset = 0;

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        tl.to(
          card,
          {
            y: -36,
            scale: 0.94,
            opacity: 0.52,
            duration: 1,
            ease: "none",
          },
          offset,
        );

        tl.to(
          cards[index + 1],
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          offset + 0.2,
        );

        offset += 1;
      });
    }, rootRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const handlePointerMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1200,
      overwrite: true,
    });
  };

  const handlePointerLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: "power3.out",
      transformPerspective: 1200,
      overwrite: true,
    });
  };

  return (
    <section
      id="work"
      ref={rootRef}
      className="relative overflow-hidden border-t border-[#1B1714]/10 bg-[#FAF7F2] text-[#1A1613]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(26,22,19,0.04) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Selected Work"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div data-project-eyebrow className="portfolio-kicker mb-5 text-[#EB5002]">
          SELECTED WORK
        </div>

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="portfolio-display max-w-[13ch] text-[2.6rem] font-bold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem]">
            Things I&apos;ve <span className="text-[#EB5002]">Built.</span>
          </h2>

          <p className="portfolio-copy max-w-[34rem] text-[#6B625D]">
            A selection of digital products, web experiences, and software
            systems I&apos;ve worked on.
          </p>
        </div>

        {isDesktop ? (
          <div className="relative hidden lg:block">
            <div
              ref={stackRef}
              className="relative h-[760px] w-full"
              aria-label="Project stack"
            >
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={[
                    "group absolute w-full max-w-[1080px] overflow-hidden rounded-[30px] border border-[#1B1714]/10 bg-[#FFFDFB] p-4 shadow-[0_24px_60px_rgba(16,14,12,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    activeIndex === index ? "border-[#EB5002]/20" : "border-[#1B1714]/10",
                  ].join(" ")}
                  onMouseMove={handlePointerMove}
                  onMouseLeave={handlePointerLeave}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" style={{ background: "radial-gradient(circle at 30% 28%, rgba(235, 80, 2, 0.15), transparent 32%)" }} />

                  <div className="relative z-10">
                    <div className="project-visual relative aspect-[16/9] overflow-hidden rounded-[24px] border border-[#1B1714]/8 bg-[#EDE7E0]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          filter: "contrast(1.05) saturate(0.9) brightness(0.8)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#1B1714]/0 via-[#1B1714]/10 to-[#1B1714]/50" />

                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="portfolio-meta text-[#F2F0EE]">
                          {project.category}
                        </span>
                        <span className="portfolio-meta text-[#EB5002]">
                          {project.number}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-4 px-1 pb-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="portfolio-meta text-[#6B625D]">
                          {project.category}
                        </span>
                        <span className="portfolio-meta text-[#EB5002]">
                          {project.number}
                        </span>
                      </div>

                      <h3 className="portfolio-display text-[2rem] leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[2.6rem]">
                        {project.title}
                      </h3>

                      <p className="portfolio-copy max-w-[34rem] text-[0.96rem] text-[#5D5652]">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1B1714]/8 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="portfolio-tag rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.href}
                          className="portfolio-button-label inline-flex items-center gap-2 text-[#EB5002] transition-transform duration-300 ease-out group-hover:translate-x-[-3px]"
                        >
                          <span>View Case Study</span>
                          <span aria-hidden="true" className="text-base leading-none">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pointer-events-none absolute left-[-30px] top-1/2 hidden -translate-y-1/2 lg:flex">
              <div className="flex flex-col items-center gap-3">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={[
                      "h-2.5 w-2.5 rounded-full border transition-all duration-300",
                      activeIndex === index
                        ? "scale-125 border-[#EB5002] bg-[#EB5002]"
                        : "border-[#1B1714]/30 bg-transparent",
                    ].join(" ")}
                    aria-label={`Project ${index + 1} active`}
                  />
                ))}
                <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#6B625D]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:hidden">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[28px] border border-[#1B1714]/10 bg-[#FFFDFB] p-4 shadow-[0_16px_40px_rgba(17,17,17,0.05)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" style={{ background: "radial-gradient(circle at 30% 30%, rgba(235, 80, 2, 0.12), transparent 38%)" }} />

                <div className="relative z-10">
                  <div className="project-visual relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#1B1714]/8 bg-[#EDE7E0]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        filter: "contrast(1.05) saturate(0.9) brightness(0.8)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1B1714]/0 via-[#1B1714]/10 to-[#1B1714]/50" />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                      <span className="portfolio-meta text-[#F2F0EE]">
                        {project.category}
                      </span>
                      <span className="portfolio-meta text-[#EB5002]">
                        {project.number}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 px-1 pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="portfolio-meta text-[#6B625D]">
                        {project.category}
                      </span>
                      <span className="portfolio-meta text-[#EB5002]">
                        {project.number}
                      </span>
                    </div>

                    <h3 className="portfolio-display text-[1.6rem] leading-[1] tracking-[-0.06em] text-[#111111]">
                      {project.title}
                    </h3>

                    <p className="portfolio-copy text-[0.94rem] text-[#5D5652]">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="portfolio-tag rounded-full border border-[#1B1714]/10 bg-[#F5F0EB] px-3 py-1.5 text-[0.68rem] font-medium text-[#5C5753]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end pt-2">
                      <a
                        href={project.href}
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
