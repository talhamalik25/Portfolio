"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

gsap.registerPlugin(ScrollTrigger);

// The original About line wipe, scoped to one paragraph and rebuilt on resize.
export default function LineReveal({ children, className = "" }) {
  const textRef = useRef(null);

  useMotionEffect(useCallback(() => {
    const paragraph = textRef.current;
    if (!paragraph || typeof children !== "string") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paragraph.style.color = "#EB5002";
      return () => { paragraph.style.color = ""; };
    }

    let context;
    let splitText;
    let cancelled = false;
    let frame;
    let fontsReady = false;
    const clear = () => {
      context?.revert();
      paragraph.querySelectorAll(".reveal-overlay").forEach((node) => node.remove());
      splitText?.revert();
    };
    const split = () => {
      clear();
      context = gsap.context(() => {
        splitText = new SplitType(paragraph, { types: "lines", lineClass: "about-line" });
        splitText.lines.forEach((line) => {
          line.style.position = "relative";
          line.style.color = "#B8B0A6";
          const overlay = document.createElement("span");
          overlay.textContent = line.textContent;
          overlay.className = "reveal-overlay";
          overlay.setAttribute("aria-hidden", "true");
          Object.assign(overlay.style, {
            position: "absolute", inset: "0", color: "#EB5002",
            clipPath: "inset(0 100% 0 0)", whiteSpace: "nowrap",
          });
          line.appendChild(overlay);
        });
        gsap.to(paragraph.querySelectorAll(".reveal-overlay"), {
          clipPath: "inset(0 0% 0 0)", ease: "none", duration: 1, stagger: 1,
          scrollTrigger: { trigger: paragraph, start: "top 85%", end: "bottom 55%", scrub: 0.5 },
        });
      }, paragraph);
    };
    document.fonts.ready.then(() => {
      if (cancelled) return;
      fontsReady = true;
      split();
      ScrollTrigger.refresh();
    });
    let width = paragraph.clientWidth;
    const observer = new ResizeObserver(() => {
      if (paragraph.clientWidth === width) return;
      width = paragraph.clientWidth;
      if (!fontsReady) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        split();
        ScrollTrigger.refresh();
      });
    });
    observer.observe(paragraph);
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      clear();
    };
  }, [children]));

  return <p ref={textRef} data-line-reveal className={className}>{children}</p>;
}
