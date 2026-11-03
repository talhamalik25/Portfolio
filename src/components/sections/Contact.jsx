"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useRef } from "react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "mtmaliktalha2005@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-talha-malik-465957307";
const GITHUB_URL = "https://github.com/talhamalik25";
import ProjectBrief from "./ProjectBrief";

export default function Contact({ resumeLink }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  useMotionEffect(useCallback(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
    }, section);

    return () => {
      context.revert();

    };
  }, []));
  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-surface-a py-20 text-content sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.1),transparent_44%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="portfolio-kicker mb-4 text-accent-ink">GET IN TOUCH</p>
          <h2
            id="contact-heading"
            className="portfolio-display text-[2.35rem] font-bold leading-[0.95] tracking-[-0.06em] text-content sm:text-5xl lg:text-6xl"
          >
            Have a project or an opportunity? <span className="text-accent-ink">Let&apos;s talk.</span>
          </h2>
        </header>

        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <ProjectBrief />

          <aside className="border-t border-outline pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {resumeLink}
            <h3 className="portfolio-display mt-6 text-xl font-semibold text-content">Contact details</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a className="text-muted underline decoration-outline underline-offset-4 transition-colors hover:text-accent-ink" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a className="text-muted underline decoration-outline underline-offset-4 transition-colors hover:text-accent-ink" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-muted underline decoration-outline underline-offset-4 transition-colors hover:text-accent-ink" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent-ink" aria-hidden="true" />
              Karachi, Pakistan
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
