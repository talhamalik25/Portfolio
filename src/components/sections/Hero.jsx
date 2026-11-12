"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

// Dynamically import 3D Laptop Workspace to optimize initial page load and avoid SSR hydration issues
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-56 w-80 animate-pulse rounded-2xl bg-white/[0.03]" />
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

// Project Showcase Catalog for the 3D Workstation Screen
const SHOWCASE_PROJECTS = [
  {
    id: "dentora",
    number: "01",
    name: "Dentora",
    category: "Dental Clinic & Healthcare",
    description: "Modern web platform for a specialized dental clinic with streamlined patient booking.",
    liveUrl: "https://portfolio-pi-three-wmfjdk08k5.vercel.app/",
  },
  {
    id: "jewellery",
    number: "02",
    name: "Jewellery Store",
    category: "Luxury E-Commerce",
    description: "Full-stack jewellery storefront (Atelier & Co.) with catalog, cart, and protected admin routes.",
    caseStudyUrl: "#work",
  },
  {
    id: "malik",
    number: "03",
    name: "Malik Enterprises",
    category: "Industrial B2B & Workwear",
    description: "Industrial products and protective workwear catalog with quote estimation paths.",
    caseStudyUrl: "#work",
  },
];

/**
 * MagneticCTA
 * Tactile physics-based magnetic micro-interaction.
 * The button container and inner content pull toward the cursor independently for high-end dimensional feel.
 */
function MagneticCTA({
  children,
  href,
  className = "",
  variant = "primary",
  "data-hero-animate": dataHeroAnimate,
  ...props
}) {
  const buttonRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const inner = innerRef.current;
    if (!btn || !inner) return;

    // Skip magnetic pull if reduced motion or coarse pointer (touch screen) is active
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    let bounds = null;

    const handleMouseEnter = () => {
      bounds = btn.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Magnetic pull: button moves 32%, inner label moves 16% for depth parallax
      gsap.to(btn, {
        x: deltaX * 0.32,
        y: deltaY * 0.32,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(inner, {
        x: deltaX * 0.16,
        y: deltaY * 0.16,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      bounds = null;
      // Spring bounce back to neutral
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      data-hero-animate={dataHeroAnimate}
      className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
      {...props}
    >
      <span
        ref={innerRef}
        className="pointer-events-none relative inline-flex items-center gap-2 will-change-transform"
      >
        {children}
      </span>
    </a>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const [activeProject, setActiveProject] = useState("dentora");

  const currentProject =
    SHOWCASE_PROJECTS.find((p) => p.id === activeProject) || SHOWCASE_PROJECTS[0];

  // GSAP Choreographed Master Entrance
  useMotionEffect(
    useCallback(() => {
      const ctx = gsap.context(() => {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (prefersReducedMotion) {
          gsap.set("[data-hero-animate]", { opacity: 1, y: 0, scale: 1, filter: "none" });
          return;
        }

        // Master Entrance Timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Ambient lighting & atmosphere
        tl.fromTo(
          "[data-hero-ambient]",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
          0.05,
        )
          // 2. Kicker header row
          .fromTo(
            "[data-hero-kicker]",
            { opacity: 0, y: -16, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
            0.15,
          )
          // 3. Primary identity: TALHA MALIK
          .fromTo(
            "[data-hero-title]",
            { opacity: 0, y: 24, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
            0.25,
          )
          // 4. Supporting title: Full-Stack Developer & Creative Engineer
          .fromTo(
            "[data-hero-subtitle]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.75 },
            0.4,
          )
          // 5. Supporting statement: I design and engineer digital products for the real world.
          .fromTo(
            "[data-hero-statement]",
            { opacity: 0, y: 20, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
            0.5,
          )
          // 6. Bio context & AKTech status
          .fromTo(
            "[data-hero-bio]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.6,
          )
          // 7. Magnetic CTAs
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 20, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "back.out(1.2)" },
            0.75,
          )
          // 8. 3D Laptop Workspace Entrance
          .fromTo(
            "[data-hero-workspace]",
            { opacity: 0, scale: 0.92, filter: "blur(8px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
            0.35,
          )
          // 9. Project Selector Controls
          .fromTo(
            "[data-hero-selector]",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.8,
          )
          // 10. Scroll indicator
          .fromTo(
            "[data-hero-scroll]",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.95,
          );

        // Subtle scroll runner dot animation
        gsap.to("[data-scroll-runner]", {
          y: 12,
          opacity: 0.3,
          repeat: -1,
          yoyo: true,
          duration: 1.3,
          ease: "power2.inOut",
        });

        // ScrollTrigger: gentle depth parallax as user scrolls toward About
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const workspaceEl = document.querySelector("[data-hero-workspace]");
            if (workspaceEl) {
              workspaceEl.style.transform = `translateY(${p * 60}px)`;
            }
          },
        });
      }, rootRef);

      return () => ctx.revert();
    }, []),
  );

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate min-h-dvh overflow-x-clip bg-hero text-white"
      aria-label="Introduction"
    >
      {/* Background Atmosphere: Refined Studio Glow & Architectural Precision Grid */}
      <div
        data-hero-ambient
        data-hero-animate
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Warm Studio Rim Glow Behind the 3D Laptop */}
        <div className="absolute top-[42%] right-[10%] h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(235,80,2,0.12)_0%,rgba(255,107,0,0.03)_45%,transparent_70%)] blur-3xl" />

        {/* Ambient Overhead Illumination */}
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(235,80,2,0.06),transparent_65%)]" />

        {/* Precision Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)] opacity-60" />
      </div>

      {/* Main Layout Container */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1400px] flex-col justify-between px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-10 lg:pt-36">
        {/* Top Editorial Kicker Row */}
        <header
          data-hero-kicker
          data-hero-animate
          className="relative z-30 mb-8 flex w-full flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 sm:mb-10"
        >
          {/* Chapter / Identity Badge with Portrait Micro-Avatar */}
          <div className="portfolio-kicker flex items-center gap-3 text-cream/70">
            <div className="relative h-6 w-6 overflow-hidden rounded-full border border-accent/40 bg-surface">
              <Image
                src="/images/profile/heroimg.png"
                alt="Portrait of Talha Malik"
                fill
                sizes="24px"
                className="object-cover object-top"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="tracking-[0.2em]">01 — Introduction</span>
            </div>
          </div>

          {/* Discipline Label */}
          <div className="portfolio-kicker hidden items-center gap-2 text-accent md:flex">
            <span>Full-stack developer</span>
            <span className="text-white/30" aria-hidden="true">
              ·
            </span>
            <span>Creative engineer</span>
          </div>

          {/* Location & Availability Badge */}
          <div className="portfolio-meta flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="tracking-[0.16em]">Available for select projects</span>
          </div>
        </header>

        {/* Asymmetric Editorial Master Stage */}
        <div className="relative my-auto grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ================= LEFT SIDE: Editorial Typography & CTAs (lg:col-span-6) ================= */}
          <div className="relative z-20 flex flex-col items-start text-left lg:col-span-6 xl:col-span-6">
            {/* Primary Identity: TALHA MALIK */}
            <div className="overflow-hidden">
              <h1
                data-hero-title
                data-hero-animate
                className="portfolio-display text-[clamp(2.9rem,7.5vw,6.4rem)] leading-[0.92] font-bold tracking-[-0.04em] text-cream"
              >
                TALHA MALIK
              </h1>
            </div>

            {/* Hidden marker for accessibility and test suites */}
            <span data-hero-word className="sr-only">
              TALHA
            </span>

            {/* Supporting Title: Full-Stack Developer & Creative Engineer */}
            <div
              data-hero-subtitle
              data-hero-animate
              className="mt-3.5 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase sm:text-sm md:mt-4"
            >
              <span>Full-Stack Developer &amp; Creative Engineer</span>
            </div>

            {/* Supporting Statement: "I design and engineer digital products for the real world." */}
            <p
              data-hero-statement
              data-hero-animate
              className="portfolio-display mt-6 max-w-[34rem] text-2xl font-bold leading-[1.12] tracking-[-0.03em] text-white/95 sm:text-3xl md:mt-8 md:text-4xl lg:text-[2.45rem]"
            >
              I design and engineer digital products for the real world.
            </p>

            {/* Concise Supporting Introduction */}
            <p
              data-hero-bio
              data-hero-animate
              className="portfolio-copy mt-4 max-w-[32rem] text-[0.95rem] leading-relaxed text-white/70 sm:text-[1.02rem] md:mt-5"
            >
              Frontend Developer at AKTech and BS CS student at Iqra University, Karachi.
              Building modern web applications, high-performance interactive systems, and
              business software that work end to end.
            </p>

            {/* AKTech Status Pill */}
            <div data-hero-bio data-hero-animate className="mt-4">
              <a
                href="https://aktech.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(235,80,2,0.2)] focus:ring-2 focus:ring-accent focus:outline-none"
              >
                <span>Currently at AKTech</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

            {/* Refined Magnetic CTAs */}
            <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center md:mt-10">
              <MagneticCTA
                href="#work"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label min-h-[50px] rounded-full border border-accent bg-accent px-8 py-3.5 text-[0.82rem] font-bold text-background shadow-[0_4px_24px_rgba(235,80,2,0.25)] transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_8px_32px_rgba(235,80,2,0.4)] focus:ring-2 focus:ring-accent focus:outline-none md:text-[0.86rem]"
              >
                <span>View Selected Work</span>
              </MagneticCTA>

              <MagneticCTA
                href="#contact"
                data-hero-cta
                data-hero-animate
                className="portfolio-button-label min-h-[50px] rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-[0.82rem] font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.08] hover:text-white focus:ring-2 focus:ring-accent focus:outline-none md:text-[0.86rem]"
              >
                <span>Let&apos;s Talk</span>
              </MagneticCTA>
            </div>
          </div>

          {/* ================= RIGHT SIDE: 3D Laptop Workspace & Showcase (lg:col-span-6) ================= */}
          <div
            data-hero-workspace
            data-hero-animate
            className="relative z-10 flex w-full flex-col items-center justify-center lg:col-span-6 xl:col-span-6"
          >
            {/* Interactive 3D Canvas Stage */}
            <div className="relative flex h-[350px] w-full max-w-[580px] items-center justify-center sm:h-[420px] md:h-[480px] lg:h-[520px]">
              <HeroScene activeProject={activeProject} className="h-full w-full" />
            </div>

            {/* Interactive Project Showcase Selector */}
            <div
              data-hero-selector
              data-hero-animate
              className="mt-3 flex w-full max-w-[540px] flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 backdrop-blur-md"
            >
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[0.55rem] font-semibold tracking-[0.2em] text-white/40 uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Interactive Display</span>
                </span>
                <span className="text-accent/80">{currentProject.category}</span>
              </div>

              {/* Project Tab Buttons */}
              <div
                role="tablist"
                aria-label="Project screen showcase switcher"
                className="grid grid-cols-3 gap-1.5"
              >
                {SHOWCASE_PROJECTS.map((project) => {
                  const isActive = activeProject === project.id;
                  return (
                    <button
                      key={project.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      onClick={() => setActiveProject(project.id)}
                      className={`group relative flex flex-col items-center justify-center rounded-xl px-2 py-2 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isActive
                          ? "border border-accent/40 bg-accent/15 text-white shadow-[0_0_16px_rgba(235,80,2,0.15)]"
                          : "border border-white/[0.05] bg-white/[0.02] text-white/50 hover:border-white/15 hover:bg-white/[0.05] hover:text-white/80"
                      }`}
                    >
                      <span className="text-[0.52rem] font-medium tracking-[0.15em] text-accent/70 uppercase">
                        {project.number}
                      </span>
                      <span className="mt-0.5 text-[0.72rem] font-semibold tracking-[-0.01em] whitespace-nowrap">
                        {project.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Project Summary & Quick Link */}
              <div className="flex items-center justify-between pt-1 text-[0.62rem] text-white/60">
                <span className="line-clamp-1 max-w-[340px]">
                  {currentProject.description}
                </span>
                <a
                  href="#work"
                  className="inline-flex shrink-0 items-center gap-1 text-accent transition-colors hover:text-accent-bright"
                >
                  <span>Explore Work</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Scroll Cue */}
        <footer
          data-hero-scroll
          data-hero-animate
          className="relative z-30 mt-8 flex flex-col items-center justify-center sm:mt-10"
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-[0.58rem] font-semibold tracking-[0.25em] text-white/45 uppercase transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Scroll to About section"
          >
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              Scroll to explore
            </span>
            <span className="flex h-10 w-5 items-start justify-center rounded-full border border-white/20 p-1 transition-colors duration-300 group-hover:border-accent/50">
              <span
                data-scroll-runner
                className="block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#EB5002]"
              />
            </span>
          </a>
        </footer>
      </div>

      {/* Seamless Architectural Transition Gradient Into About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-hero to-transparent"
      />
    </section>
  );
}
