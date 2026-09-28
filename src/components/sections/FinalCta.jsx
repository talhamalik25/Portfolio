"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeText = "LET'S CONNECT • LET'S CONNECT • LET'S CONNECT • ";

const scatterPills = [
  { label: "MERN Development", left: "2%", top: "18%", rotate: -12 },
  { label: "AI Automation", left: "16%", top: "8%", rotate: 8 },
  { label: "UI/UX Design", left: "30%", top: "38%", rotate: -6 },
  { label: "Landing Pages", left: "44%", top: "12%", rotate: 15 },
  { label: "Dashboards", left: "56%", top: "32%", rotate: -18 },
  { label: "API Integration", left: "68%", top: "8%", rotate: 10 },
  { label: "Workflow Automation", left: "80%", top: "25%", rotate: -8 },
  { label: "Chatbots", left: "90%", top: "6%", rotate: 14 },
];

export default function FinalCta() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scatterRef = useRef(null);
  const badgeTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return undefined;

      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.from(".scatter-pill", {
        scale: 0,
        opacity: 0,
        rotation: (index) => (index % 2 === 0 ? 45 : -45),
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: scatterRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (badgeTextRef.current) {
        const badgeTween = gsap.to(badgeTextRef.current, {
          rotation: 360,
          duration: 18,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });

        const badgeWrap = badgeTextRef.current.closest(".spinning-badge");
        if (badgeWrap) {
          badgeWrap.addEventListener("mouseenter", () => badgeTween.timeScale(2.5));
          badgeWrap.addEventListener("mouseleave", () => badgeTween.timeScale(1));
        }
      }

      return undefined;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      aria-label="Final call to action"
      className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-28 lg:py-36"
    >
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.18),transparent_45%)]" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 z-10 w-[130vw] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] overflow-hidden bg-[#FF6B00] py-4 sm:py-5">
          <div
            className="flex min-w-[200%] items-center gap-10 whitespace-nowrap text-[0.9rem] font-black uppercase tracking-[0.25em] text-[#0A0A0A] sm:text-[1.05rem] lg:text-[1.2rem]"
            style={{ animation: "marqueeLeft 20s linear infinite" }}
          >
            {[...Array(4)].map((_, index) => (
              <span key={`left-${index}`} className="inline-block">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 w-[130vw] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] overflow-hidden bg-[#FF6B00] py-4 sm:py-5">
          <div
            className="flex min-w-[200%] items-center gap-10 whitespace-nowrap text-[0.9rem] font-black uppercase tracking-[0.25em] text-[#0A0A0A] sm:text-[1.05rem] lg:text-[1.2rem]"
            style={{ animation: "marqueeRight 20s linear infinite" }}
          >
            {[...Array(4)].map((_, index) => (
              <span key={`right-${index}`} className="inline-block">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-30 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[920px] rounded-[30px] border border-white/10 bg-[#0b0b0b]/60 px-5 py-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-8 sm:py-16 lg:px-12">
          <div ref={contentRef} className="relative z-40">
            <div className="portfolio-kicker mb-5 inline-flex items-center gap-3 rounded-full border border-[#EB5002]/20 bg-[#EB5002]/10 px-3 py-2 text-[#EB5002]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#EB5002]" aria-hidden="true" />
              LET&apos;S BUILD SOMETHING
            </div>

            <h2 className="portfolio-display mx-auto max-w-[860px] text-[2.35rem] font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[4.2rem]">
              Let&apos;s Create an <span className="text-[#FF6B00]">Amazing</span> Project Together.
            </h2>

            <p className="portfolio-copy mx-auto mt-6 max-w-[42rem] text-[1.02rem] text-[#B3ACA4] sm:text-[1.1rem]">
              Have an idea, a business problem, or a product to build? Let&apos;s talk about how I can help bring it to life.
            </p>

            <div ref={scatterRef} className="scatter-pill-container relative mx-auto mt-8 hidden h-[180px] w-full max-w-[980px] sm:block">
              {scatterPills.map((pill) => (
                <span
                  key={pill.label}
                  className="scatter-pill absolute inline-flex items-center justify-center rounded-full bg-[#FF6B00] px-4 py-1.5 text-[0.58rem] font-black uppercase tracking-[0.12em] text-[#0A0A0A] shadow-[0_0_16px_rgba(255,107,0,0.3)] transition-transform duration-200 ease-out hover:scale-110 hover:rotate-0 sm:text-[0.64rem]"
                  style={{
                    left: pill.left,
                    top: pill.top,
                    transform: `rotate(${pill.rotate}deg)`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:hidden">
              {scatterPills.map((pill) => (
                <span
                  key={`${pill.label}-mobile`}
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6B00] px-3 py-1.5 text-[0.54rem] font-black uppercase tracking-[0.12em] text-[#0A0A0A] shadow-[0_0_16px_rgba(255,107,0,0.2)]"
                  style={{
                    transform: `rotate(${pill.rotate}deg)`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
              <div className="spinning-badge relative flex h-[92px] w-[92px] items-center justify-center overflow-visible">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Let's talk rotating text badge">
                  <defs>
                    <path id="cta-badge-loop" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <g ref={badgeTextRef} className="origin-center">
                    <text
                      fill="#FF6B00"
                      fontSize="7.2"
                      fontWeight="700"
                      letterSpacing="1.8"
                      textLength="210"
                    >
                      <textPath href="#cta-badge-loop" startOffset="0%" side="left">
                        LET&apos;S TALK • LET&apos;S TALK • LET&apos;S TALK • LET&apos;S TALK • LET&apos;S TALK •
                      </textPath>
                    </text>
                  </g>
                </svg>
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#FF6B00]/30 bg-[#0A0A0A] text-lg font-medium text-[#FF6B00] shadow-[0_0_18px_rgba(255,107,0,0.2)]">
                  →
                </span>
              </div>

              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#FF6B00] bg-[#FF6B00] px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#0b0b0b] shadow-[0_0_20px_rgba(255,107,0,0.32)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              >
                <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">
                  Let&apos;s Talk
                </span>
                <span aria-hidden="true" className="relative text-base leading-none text-[#0b0b0b] transition-transform duration-400 ease-out group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
