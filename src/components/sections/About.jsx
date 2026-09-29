"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "I'm not just writing code — I'm building systems that solve real problems. As a full-stack developer and AI automation specialist, I turn ideas into scalable digital products, blending clean engineering with intelligent automation to deliver outcomes that matter.";

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const splitInstance = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (textRef.current) gsap.set(textRef.current, { color: "#EB5002" });
      return;
    }

    const ctx = gsap.context(() => {
      if (!textRef.current) return;
      
      // Use SplitType-based runtime line detection
      const splitText = new SplitType(textRef.current, { types: "lines" });
      splitInstance.current = splitText;
      
      // Ensure there are no pins, correctly revealing one line after the other.
      gsap.set(splitText.lines, { color: "#5D5652" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "center center",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      splitText.lines.forEach((line) => {
        tl.to(line, {
          color: "#EB5002",
          ease: "none",
          duration: 1, // timeline staggers automatically with standard durations
        });
      });
      
      // Handle resize without breaking split-type lines
      const handleResize = () => {
         splitText.split();
         gsap.set(splitText.lines, { color: "#5D5652" });
         ScrollTrigger.refresh();
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);

    }, sectionRef);

    return () => {
      ctx.revert();
      if (splitInstance.current) splitInstance.current.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#FAF7F2] py-24 text-[#1A1613] sm:py-28 lg:py-36"
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

        {/* Large Intro Paragraph with per-line cascading reveal */}
        <div className="mb-20 md:mb-32">
          <h2 
            ref={textRef} 
            className="portfolio-display text-[2rem] font-bold leading-[1.3] text-[#5D5652] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.2rem] tracking-[-0.03em]"
          >
            {INTRO_TEXT}
          </h2>
        </div>

        {/* Note: The capabilityHighlights numbered icon-feature list and the large standalone header 
            have been completely removed from this layout per the new core structure goals. */}
        
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
