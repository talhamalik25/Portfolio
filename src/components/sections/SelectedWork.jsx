"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ProjectCard from "@/src/components/ui/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkStageCanvas = dynamic(() => import("./WorkStageCanvas"), {
  ssr: false,
  loading: () => <div className="h-[460px] rounded-3xl bg-card" />,
});

import Link from "next/link";
import { homeProjects as projects } from "@/src/lib/projects";

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCanvasVisibility = () => {
      setShowCanvas(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    updateCanvasVisibility();
    desktopQuery.addEventListener("change", updateCanvasVisibility);
    reducedMotionQuery.addEventListener("change", updateCanvasVisibility);

    return () => {
      desktopQuery.removeEventListener("change", updateCanvasVisibility);
      reducedMotionQuery.removeEventListener("change", updateCanvasVisibility);
    };
  }, []);

  useMotionEffect(useCallback(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(".portfolio-project-card", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
    }, section);

    return () => context.revert();
  }, []));
  // Filtering unfinished project identities can leave the feed empty.
  // Keep the fan implementation untouched and mount it only with valid data.
  if (!projects.length) return null;

  return (
    <section id="work" ref={sectionRef} className="border-t border-outline bg-surface-a py-20 text-content sm:py-24 lg:py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 sm:mb-12">
          <p className="portfolio-kicker mb-4 text-accent-ink">SELECTED WORK</p>
          <h2 id="work-heading" className="portfolio-display max-w-[12ch] text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Projects I&apos;ve <span className="text-accent-ink">Built.</span>
          </h2>
          <p className="portfolio-copy mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Selected websites and product work, with notes on my role and implementation.
          </p>
          <Link href="/work" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-outline px-5 text-sm hover:border-[#EB5002]">View all works →</Link>
        </header>

        <div className="mb-10 hidden overflow-hidden rounded-3xl border border-outline lg:block">
          {showCanvas ? (
            <WorkStageCanvas activeIndex={activeIndex} onSelect={setActiveIndex} />
          ) : (
            <div className="h-[460px] bg-card" />
          )}
        </div>

        {showCanvas && <div className="mb-10">
          <div className="mb-4 flex flex-wrap gap-3" aria-label="Select a project">
            {projects.map((project, index) => <button type="button" key={project.slug} onClick={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className="min-h-11 rounded-full border border-outline px-4 text-sm aria-pressed:border-[#EB5002]">{project.title}</button>)}
          </div>
          <div aria-live="polite"><p className="text-muted">{projects[activeIndex].summary}</p>
            <ul className="my-3 flex flex-wrap gap-2">{projects[activeIndex].stack.map((item) => <li key={item} className="rounded-full border border-outline px-3 py-1 text-xs">{item}</li>)}</ul>
            <div className="flex gap-5 text-sm text-accent-ink">
              <Link href={`/work/${projects[activeIndex].slug}`}>View case study →</Link>
              {projects[activeIndex].liveUrl && <a href={projects[activeIndex].liveUrl} target="_blank" rel="noopener noreferrer">Live ↗</a>}
              {projects[activeIndex].githubUrl && <a href={projects[activeIndex].githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
            </div>
          </div>
        </div>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} onSelect={() => setActiveIndex(index)} />)}
        </div>
      </div>
    </section>
  );
}
