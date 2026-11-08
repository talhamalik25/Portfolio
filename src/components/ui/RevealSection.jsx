"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

gsap.registerPlugin(ScrollTrigger);

export default function RevealSection({ id, light = false, compact = false, children, className = "" }) {
  const sectionRef = useRef(null);
  useMotionEffect(useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-reveal]"), {
          y: 16, opacity: 0, duration: 0.55, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, ({ conditions }) => {
      const line = sectionRef.current?.querySelector("[data-process-line]");
      if (!line) return;
      gsap.from(line, {
        [conditions.desktop ? "scaleX" : "scaleY"]: 0,
        transformOrigin: "top left", ease: "none",
        scrollTrigger: { trigger: line.parentElement, start: "top 85%", end: "bottom 55%", scrub: 0.5 },
      });
    });
    return () => { media.revert(); context.revert(); };
  }, []));

  return <section id={id} ref={sectionRef} aria-labelledby={id + "-heading"}
    className={[
      "border-t", light ? "border-ink/10 bg-cream text-ink" : "border-white/10 bg-section text-white",
      compact ? "py-14 sm:py-16" : "py-20 sm:py-24 lg:py-28", className,
    ].join(" ")}>
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">{children}</div>
  </section>;
}
