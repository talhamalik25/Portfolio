"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GlobalLoader() {
  const [showLoader, setShowLoader] = useState(true);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    // Only run if user prefers motion, otherwise hide immediately to respect accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setTimeout(() => setShowLoader(false), 0);
      return;
    }

    // Lock scroll behavior while loading
    document.body.style.overflow = "hidden";

    // Small delay to ensure styles apply evenly before animating
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            // Unlock scroll
            document.body.style.overflow = "";
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: "power3.inOut",
              onComplete: () => setShowLoader(false),
            });
          },
        });

        // Fake loading progress
        tl.to(progressRef.current, {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        });

        tl.to(
          { val: 0 },
          {
            val: 100,
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate(thisTween) {
              if (percentRef.current) {
                const value = Math.round(thisTween.targets()[0].val);
                percentRef.current.innerText = `${value}%`;
              }
            },
          },
          "<" // Run parallel to the bar animation
        );
      }, containerRef);
      
      return () => {
        document.body.style.overflow = "";
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!showLoader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0b] text-white"
    >
      <div className="flex flex-col items-center">
        <h1 className="portfolio-display text-5xl md:text-7xl mb-2 text-[#f5f5f5]">TALHA</h1>
        <p className="portfolio-kicker text-[#f5f5f5]/70">
          FULL-STACK DEVELOPER / AI AUTOMATION
        </p>
      </div>

      <div className="absolute bottom-16 md:bottom-24 w-full max-w-[280px] md:max-w-sm px-6 flex flex-col items-center gap-4">
        <div ref={percentRef} className="portfolio-meta text-[#f5f5f5]/50 tabular-nums">
          0%
        </div>
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full bg-[#FF6B00] origin-left scale-x-0"
          ></div>
        </div>
      </div>
    </div>
  );
}
