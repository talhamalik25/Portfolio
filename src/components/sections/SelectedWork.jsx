"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkStageCanvas = dynamic(() => import("./WorkStageCanvas"), {
  ssr: false,
  loading: () => <div className="h-[460px] rounded-3xl bg-[#0E0C0A]" />,
});

import Link from "next/link";
import { projects } from "@/data/projects";

function ProjectCard({ project, onSelect }) {
  const liveUrl = project.liveUrl || "";
  const githubUrl = project.githubUrl || "";

  return (
    <article onMouseEnter={onSelect} onFocus={onSelect} className="portfolio-project-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#11100F] transition-colors duration-300 hover:border-[#EB5002]/50">
      <div className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${project.image ? "bg-[#0E0C0A]" : "border border-dashed border-white/15 bg-[radial-gradient(ellipse_at_70%_10%,rgba(235,80,2,0.14),transparent_55%),linear-gradient(145deg,#171311,#0B0A09)]"}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt}
            width={1440}
            height={900}
            sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <span className="absolute left-5 top-5 text-xs font-semibold tracking-[0.2em] text-white/55">
          {project.number}
        </span>
        {project.status && (
          <span className="absolute right-4 top-4 rounded-full border border-[#EB5002]/40 bg-[#EB5002]/10 px-3 py-1 text-xs font-semibold text-[#FF7A36]">
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="portfolio-display text-2xl font-bold leading-tight tracking-[-0.04em] text-white">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          {project.category && (
            <span className="shrink-0 text-right text-xs text-white/45">{project.category}</span>
          )}
        </div>
        <p className="portfolio-copy min-h-[3.2rem] text-[0.96rem] leading-relaxed text-white/65">
          {project.summary}
        </p>

        {project.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.stack.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {project.details ? (
          <details className="group mt-5 border-t border-white/10 pt-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold text-white/80 transition-colors hover:text-[#FF7A36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB5002]">
              Details
              <span aria-hidden="true" className="text-[#EB5002] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-2 pt-3 text-sm leading-relaxed text-white/75">{project.details}</p>
          </details>
        ) : null}

        <Link href={`/work/${project.slug}`} className="mt-5 inline-flex min-h-11 items-center text-sm text-[#FF7A36]">View case study →</Link>
        {(liveUrl || githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition-colors hover:border-[#EB5002] hover:text-[#FF7A36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5002]"
              >
                Live Site
              </a>
            ) : null}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition-colors hover:border-[#EB5002] hover:text-[#FF7A36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5002]"
              >
                GitHub
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

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
  return (
    <section id="work" ref={sectionRef} className="border-t border-white/10 bg-[#0A0A0A] py-20 text-white sm:py-24 lg:py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 sm:mb-12">
          <p className="portfolio-kicker mb-4 text-[#EB5002]">SELECTED WORK</p>
          <h2 id="work-heading" className="portfolio-display max-w-[12ch] text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Projects I&apos;ve <span className="text-[#EB5002]">Built.</span>
          </h2>
          <p className="portfolio-copy mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Selected websites and product work, with notes on my role and implementation.
          </p>
        </header>

        <div className="mb-10 hidden overflow-hidden rounded-3xl border border-white/10 lg:block">
          {showCanvas ? (
            <WorkStageCanvas activeIndex={activeIndex} onSelect={setActiveIndex} />
          ) : (
            <div className="h-[460px] bg-[#0E0C0A]" />
          )}
        </div>

        {showCanvas && <div className="mb-10">
          <div className="mb-4 flex flex-wrap gap-3" aria-label="Select a project">
            {projects.map((project, index) => <button type="button" key={project.slug} onClick={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className="min-h-11 rounded-full border border-white/20 px-4 text-sm aria-pressed:border-[#EB5002]">{project.title}</button>)}
          </div>
          <div aria-live="polite"><p className="text-white/75">{projects[activeIndex].summary}</p>
            <ul className="my-3 flex flex-wrap gap-2">{projects[activeIndex].stack.map((item) => <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs">{item}</li>)}</ul>
            <div className="flex gap-5 text-sm text-[#FF7A36]">
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
