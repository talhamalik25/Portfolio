"use client";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import ProjectCard from "@/src/components/ui/ProjectCard";
import { publicProjects } from "@/src/lib/projects";

gsap.registerPlugin(ScrollTrigger);
const categories = ["All", ...new Set(publicProjects.map(project => project.category).filter(Boolean))];
export default function WorkGrid() {
  const [category, setCategory] = useState("All");
  const gridRef = useRef(null);
  const visible = publicProjects.filter(project => category === "All" || project.category === category);
  useMotionEffect(useCallback(() => {
    if (!category || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from("[data-project-card]", { opacity: 0, y: 18, duration: 0.5, stagger: 0.06, scrollTrigger: { trigger: gridRef.current, start: "top 95%", once: true } });
    }, gridRef);
    ScrollTrigger.refresh();
    return () => context.revert();
  }, [category]));
  return <>
    <div role="group" aria-label="Filter projects by category" className="mb-6 flex flex-wrap gap-3">
      {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className="min-h-11 rounded-full border border-white/20 px-5 text-sm hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent/10">{item}</button>)}
    </div>
    <p role="status" className="mb-6 text-sm text-white/60">{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
    <div ref={gridRef} className="grid gap-6">
      {visible[0] ? (
        <ProjectCard key={visible[0].slug} project={visible[0]} featured={category === "All"} />
      ) : null}
      <div className="grid gap-6 md:grid-cols-2">
        {visible.slice(1).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  </>;
}
