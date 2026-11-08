"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import SectionHeader from "@/src/components/ui/SectionHeader";

import { useCallback, useRef } from "react";
import ProjectCard from "@/src/components/ui/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { homeProjects as projects } from "@/src/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef(null);

  useMotionEffect(
    useCallback(() => {
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
    }, []),
  );

  if (!projects.length) return null;

  const [featured, ...rest] = projects;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="border-t border-white/10 bg-section py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          kicker="Selected work"
          title="Projects I've"
          accent="Built."
          headingId="work-heading"
          lede="Live websites and a product in progress, with working demos and the implementation notes I can share so far."
        >
          <Link
            href="/work"
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm hover:border-accent"
          >
            View all works →
          </Link>
        </SectionHeader>

        <div className="grid gap-6">
          {featured ? <ProjectCard project={featured} featured /> : null}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
