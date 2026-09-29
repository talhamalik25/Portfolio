"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "I'm not just writing code — I'm building systems that solve real problems. As a full-stack developer and AI automation specialist, I turn ideas into scalable digital products, blending clean engineering with intelligent automation to deliver outcomes that matter.";

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const paragraph = textRef.current;
    if (!paragraph) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paragraph.style.color = "#FF6B00";
      return;
    }

    let splitText;
    
    // Minor delay guarantees DOM has fully painted on Next.js client renders
    // avoiding the silent width-calculation issues with SplitType
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        splitText = new SplitType(paragraph, {
          types: "lines",
          lineClass: "about-line",
        });

        splitText.lines.forEach((line) => {
          line.style.position = "relative";
          line.style.color = "#B8B0A6"; // muted gray base color

          const overlay = document.createElement("span");
          overlay.textContent = line.textContent;
          overlay.className = "reveal-overlay";
          overlay.setAttribute("aria-hidden", "true");
          overlay.style.position = "absolute";
          overlay.style.inset = "0";
          overlay.style.color = "#FF6B00"; // orange accent
          overlay.style.clipPath = "inset(0 100% 0 0)";
          // Ensure it doesn't wrap or misalign if padding/margins exist
          overlay.style.whiteSpace = "nowrap"; 
          line.appendChild(overlay);
        });

        const overlays = gsap.utils.toArray(".reveal-overlay");
        if (overlays.length > 0) {
          gsap.to(overlays, {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            duration: 1, // Normalized duration
            stagger: 1,  // Wait for 100% of duration before starting the next line (pure sequential)
            scrollTrigger: {
              trigger: paragraph,
              start: "top 80%",
              end: "bottom 30%", // Completes when the bottom of paragraph is 30% down the screen
              scrub: 0.5,
            },
          });
        }
      }, sectionRef.current);

      // Save ctx to global scope inside useEffect so we can revert it on unmount
      paragraph._gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Remove any artificially appended DOM nodes so SplitType can revert cleanly
      document.querySelectorAll(".reveal-overlay").forEach((el) => el.remove());
      
      if (paragraph._gsapCtx) {
        paragraph._gsapCtx.revert();
      }
      if (splitText) {
        splitText.revert();
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#FAF7F2] pt-28 pb-40 text-[#1A1613] sm:pt-36 lg:pt-36"
      aria-label="About"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Label */}
        <p className="portfolio-kicker mb-8 flex items-center gap-3 text-[#EB5002] text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.2em]">
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#EB5002] shadow-[0_0_0_5px_rgba(235,80,2,0.14)]"
            aria-hidden="true"
          />
          About Me
        </p>

        {/* Intro paragraph with a cascading, per-line color reveal */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <p
            ref={textRef}
            className="max-w-[1120px] text-3xl font-medium leading-[1.35] tracking-[-0.03em] text-[#5D5652] sm:text-4xl md:text-[2.5rem]"
          >
            {INTRO_TEXT}
          </p>
        </div>
        
        {/* Supporting Images and Call To Action */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Two placeholder workspace images */}
          <div className="lg:col-span-7 flex gap-4 md:gap-6">
            <div className="aspect-[4/5] w-1/2 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E8E2DA] to-[#D5CFC6] border border-[#1A1613]/5 flex items-center justify-center transition-transform hover:scale-[1.03] duration-500 shadow-[0_18px_40px_rgba(16,14,12,0.06)]">
              <span className="text-[#1A1613]/30 font-mono text-sm tracking-widest uppercase">workspace-1</span>
            </div>
            <div className="aspect-[4/5] w-1/2 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E8E2DA] to-[#D5CFC6] border border-[#1A1613]/5 flex items-center justify-center transition-transform hover:scale-[1.03] duration-500 shadow-[0_18px_40px_rgba(16,14,12,0.06)] translate-y-6 md:translate-y-12">
              <span className="text-[#1A1613]/30 font-mono text-sm tracking-widest uppercase">workspace-2</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-center max-w-[400px]">
             <h3 className="mb-8 text-3xl md:text-[2.2rem] lg:text-[2.6rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#111111]">
               Full-Stack Development <span className="text-[#EB5002]">&amp;</span> AI Automation
             </h3>
             <div className="flex">
               <a
                 href="#work"
                 className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EB5002] px-8 py-4 font-bold tracking-[0.05em] text-[#0b0b0b] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB5002]"
               >
                 <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                 <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white whitespace-nowrap">
                   View My Work <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-400 ease-out group-hover:translate-x-1">→</span>
                 </span>
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
