"use client";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import SectionHeader from "@/src/components/ui/SectionHeader";

import { useCallback, useRef } from "react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBrief from "./ProjectBrief";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "mtmaliktalha2005@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-talha-malik-465957307";
const GITHUB_URL = "https://github.com/talhamalik25";

export default function Contact({ resumeLink }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  useMotionEffect(
    useCallback(() => {
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

      return () => context.revert();
    }, []),
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-section py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.1),transparent_44%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="07"
          kicker="Get in touch"
          title="Have a project or an opportunity?"
          accent="Let's talk."
          headingId="contact-heading"
          align="center"
        />

        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <ProjectBrief />

          <aside className="border-t border-white/10 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {resumeLink}
            <h3 className="portfolio-display mt-6 text-xl font-semibold text-white">Contact details</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent-soft"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent-soft"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent-soft"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              Karachi, Pakistan
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
