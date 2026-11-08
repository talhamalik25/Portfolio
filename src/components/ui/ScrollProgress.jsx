"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useMotionEffect(useCallback(() => {
    // Only run if user prefers motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ctx;
    // Small timeout to allow DOM to settle and scroll height to adjust correctly
    const timeoutId = window.setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray("#main-content section > div > header").forEach((header) => {
          gsap.from(header, { y: 12, opacity: 0.7, duration: 0.5, scrollTrigger: { trigger: header, start: "top 92%", once: true } });
        });
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
      ctx?.revert();
    };
  }, []));

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full bg-accent-bright/10">
      <div
        ref={progressRef}
        className="h-full w-full origin-left scale-x-0 bg-accent-bright"
      ></div>
    </div>
  );
}
