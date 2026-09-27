"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return undefined;

      gsap.fromTo(
        content,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      return undefined;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact"
      className="relative overflow-hidden bg-[#0A0A0A] py-24 text-white sm:py-28 lg:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.14),transparent_44%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="mx-auto max-w-[760px] text-center">
          <div className="portfolio-kicker mb-5 inline-flex items-center gap-3 rounded-full border border-[#EB5002]/20 bg-[#EB5002]/10 px-3 py-2 text-[#EB5002]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#EB5002]" aria-hidden="true" />
            Let&apos;s Build Together
          </div>

          <h2 className="portfolio-display mb-6 text-[2.4rem] font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-[3rem] lg:text-[4rem]">
            Ready to build something <span className="text-[#FF6B00]">impactful?</span>
          </h2>

          <p className="portfolio-copy mx-auto max-w-[38rem] text-[1.02rem] text-[#B3ACA4] sm:text-[1.08rem]">
            Have an idea, a roadmap, or a business problem that needs thoughtful execution? I&apos;d love to hear about it.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:talhamalik.dev@gmail.com"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#FF6B00] bg-[#FF6B00] px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#0b0b0b] shadow-[0_0_22px_rgba(255,107,0,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">
                Start a Project
              </span>
              <span aria-hidden="true" className="relative text-base leading-none text-[#0b0b0b] transition-transform duration-400 ease-out group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </a>

            <a
              href="mailto:talhamalik.dev@gmail.com"
              className="portfolio-button-label inline-flex items-center gap-2 text-[#FF6B00] transition-colors duration-200 hover:text-white"
            >
              <span>talhamalik.dev@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
