"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/sections";
import { readyEntries } from "@/src/lib/content";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import ProcessVisual from "./ProcessVisual";
import SectionHeader from "@/src/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);
const items = readyEntries(processSteps, "Process");

export default function Process() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionEffect(useCallback(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || items.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = window.matchMedia("(min-width: 1024px) and (min-height: 760px)");
    const setup = () => {
      const panels = Array.from(section.querySelectorAll("[data-process-phase]"));
      const panelList = section.querySelector("[data-process-panels]");
      const controls = section.querySelector("[data-process-controls]");
      const accessibleCopy = section.querySelector("[data-process-accessible]");
      const originalStyles = [...panels, panelList].map(node => [node, node.style.cssText]);
      const restoreStyles = () => originalStyles.forEach(([node, cssText]) => { node.style.cssText = cssText; });
      stage.dataset.processPinned = "true";
      const context = gsap.context(() => {
        // Overlay panels only after enhancement; SSR and no-motion views stay stacked.
        gsap.set(panels, { gridArea: "1 / 1", autoAlpha: 0, y: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(panelList, { gap: 0 });
      }, section);
      controls.hidden = false;
      // Long copy or browser zoom must not force content into a clipped pin.
      if (stage.getBoundingClientRect().height > window.innerHeight - 140) {
        controls.hidden = true;
        context.revert();
        restoreStyles();
        delete stage.dataset.processPinned;
        return;
      }
      stage.dataset.processPinned = "true";
      panelList.setAttribute("aria-hidden", "true");
      accessibleCopy.hidden = false;
      let sequence;
      context.add(() => {
        sequence = gsap.timeline({
          scrollTrigger: {
            id: "process-story", trigger: stage, start: "top 110px",
            end: () => "+=" + items.length * window.innerHeight * 0.75,
            pin: true, scrub: 0.35, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => setActiveIndex(Math.min(items.length - 1, Math.floor(self.progress * items.length))),
          },
        });
        // Each phase has a dwell interval; only the boundary crossfades.
        sequence.to({}, { duration: items.length });
        panels.slice(1).forEach((panel, offset) => {
          const index = offset + 1;
          sequence.to(panels[index - 1], { autoAlpha: 0, y: -12, duration: 0.18 }, index);
          sequence.fromTo(panel, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.24 }, index);
        });
      });
      triggerRef.current = sequence.scrollTrigger;
      let cancelled = false;
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
      return () => {
        cancelled = true;
        triggerRef.current = null;
        sequence.scrollTrigger?.kill();
        context.revert();
        delete stage.dataset.processPinned;
        panelList.removeAttribute("aria-hidden");
        controls.hidden = true;
        accessibleCopy.hidden = true;
        restoreStyles();
      };
    };
    let cleanup;
    const update = () => {
      cleanup?.();
      cleanup = media.matches ? setup() : undefined;
    };
    update();
    media.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); cleanup?.(); };
  }, []));

  const selectPhase = (index) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const progress = (index + 0.5) / items.length;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "instant" });
  };

  if (!items.length) return null;
  return (
    <section id="process" ref={sectionRef} aria-labelledby="process-heading" className="border-t border-white/10 bg-section py-20 text-white sm:py-24 lg:py-28">
      <div ref={stageRef} data-process-stage className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="The process"
          title="How I"
          accent="Work."
          headingId="process-heading"
          lede="A short path from brief to launch. The numbered phases stay readable without pinning on small screens."
        />
        <ol data-process-panels className="grid gap-12">
          {items.map((step, index) => (
            <li data-process-phase={step.visual} key={step.title} className="grid min-w-0 items-center gap-7 md:grid-cols-2 md:gap-10">
              <div>
                <p className="mb-5 text-sm font-medium tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
                <h3 className="mb-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{step.title}</h3>
                <p className="portfolio-copy max-w-md text-white/70">{step.description}</p>
                <ul aria-label={step.title + " focus areas"} className="mt-6 flex flex-wrap gap-2">
                  {step.tags.map(tag => <li key={tag} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75">{tag}</li>)}
                </ul>
              </div>
              <ProcessVisual phase={step.visual} />
            </li>
          ))}
        </ol>
        {/* All phase copy stays available to screen readers while visual panels overlap. */}
        <ol data-process-accessible hidden className="sr-only">
          {items.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p><p>{step.tags.join(", ")}</p></li>)}
        </ol>
        <div data-process-controls hidden className="mt-8">
          <div role="group" aria-label="Choose a process phase" className="flex flex-wrap gap-3">
            {items.map((step, index) => <button key={step.title} type="button" onClick={() => selectPhase(index)} aria-current={activeIndex === index ? "step" : undefined} className="min-h-11 rounded-full border border-white/20 px-4 text-sm transition-colors hover:border-accent aria-[current=step]:border-accent aria-[current=step]:text-accent">{step.title}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
