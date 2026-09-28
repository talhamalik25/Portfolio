"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    // Only run if user prefers motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Small timeout to allow DOM to settle and scroll height to adjust correctly
      setTimeout(() => {
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
      }, 100);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-[#FF6B00]/10 z-50 pointer-events-none">
      <div
        ref={progressRef}
        className="h-full w-full bg-[#FF6B00] origin-left scale-x-0"
      ></div>
    </div>
  );
}
