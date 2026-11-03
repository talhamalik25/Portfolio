"use client";
import Link from "next/link";
import { availability } from "@/data/contact";
import { readyEntries, readyText } from "@/src/lib/content";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";

import { useCallback, useRef } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { SiGithub, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/talhamalik25", icon: SiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-talha-malik-465957307", icon: FaLinkedinIn },
  { label: "Email", href: "mailto:mtmaliktalha2005@gmail.com", icon: SiGmail },
];

export default function Footer() {
  const footerRef = useRef(null);
  const watermarkRef = useRef(null);
  const magneticRefs = useRef([]);

  useMotionEffect(useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const removePointerListeners = [];
    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 0.1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      magneticRefs.current.forEach((item) => {
        if (!item) return;

        const targetX = gsap.quickTo(item, "x", { duration: 0.2, ease: "power3.out" });
        const targetY = gsap.quickTo(item, "y", { duration: 0.2, ease: "power3.out" });

        const handleMove = (event) => {
          const rect = item.getBoundingClientRect();
          const offsetX = event.clientX - rect.left - rect.width / 2;
          const offsetY = event.clientY - rect.top - rect.height / 2;
          targetX(offsetX * 0.18);
          targetY(offsetY * 0.18);
        };

        const handleLeave = () => {
          targetX(0);
          targetY(0);
        };

        item.addEventListener("pointermove", handleMove);
        item.addEventListener("pointerleave", handleLeave);

        removePointerListeners.push(() => {
          item.removeEventListener("pointermove", handleMove);
          item.removeEventListener("pointerleave", handleLeave);
        });
      });
    }, footerRef);

    return () => {
      removePointerListeners.forEach((removeListeners) => removeListeners());
      ctx.revert();
    };
  }, []));
  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-outline bg-surface-a py-16 text-content sm:py-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--text) 6%, transparent) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="relative z-20 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <div className="mb-4 text-[0.82rem] font-black uppercase tracking-[0.42em] text-content sm:text-[0.9rem]">
              TALHA
            </div>

            <p className="max-w-[32rem] text-[0.96rem] leading-relaxed text-muted">
              Full-stack developer and AI automation specialist, building digital products that turn ideas into outcomes that matter.
            </p>

            <p className="mt-5 text-sm text-muted">Frontend Developer at AKTech</p>
            {readyText(availability, "Availability") && <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#EB5002]/20 bg-[#EB5002]/10 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent-ink">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00]" aria-hidden="true" />
              {readyText(availability, "Availability")}
            </div>}
          </div>

          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              Navigate
            </h3>

            <ul className="space-y-3 text-[0.92rem] text-muted">
              {readyEntries(navLinks, "navLinks").map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-accent-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              Connect
            </h3>

            <ul className="space-y-3">
              {readyEntries(socialLinks, "socialLinks").map(({ label, href, icon: Icon }, index) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-[0.92rem] text-muted transition-colors duration-200 hover:text-accent-ink"
                  >
                    <span
                      ref={(el) => {
                        magneticRefs.current[index] = el;
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-outline bg-card transition-all duration-200 group-hover:border-[#FF6B00]/40 group-hover:bg-[#FF6B00]/10"
                    >
                      <Icon className="h-3.5 w-3.5 text-current" />
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      {label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              Get in touch
            </h3>

            <a
              href="mailto:mtmaliktalha2005@gmail.com"
              className="inline-block max-w-full break-all text-[1.1rem] font-medium text-accent-ink transition-all duration-200 hover:text-content hover:underline"
            >
              mtmaliktalha2005@gmail.com
            </a>

            <div className="mt-5 flex items-center gap-2 text-[0.9rem] text-muted">
              <MapPin className="h-4 w-4 text-accent-ink" />
              <span>Based in Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex items-center justify-center">
          <div className="h-px w-full bg-card" aria-hidden="true" />
          <div className="absolute h-2.5 w-2.5 rotate-45 bg-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.4)]" aria-hidden="true" />
        </div>

        <div className="relative mt-8 flex flex-col gap-4 text-[0.72rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Talha Malik. All rights reserved.</p>
          <Link href="/#top" className="transition-colors duration-200 hover:text-accent-ink">
            Built with Next.js &amp; GSAP
          </Link>
        </div>
      </div>
      <div ref={watermarkRef} className="pointer-events-none absolute inset-x-0 bottom-10 z-10 select-none text-center text-[clamp(8rem,16vw,20rem)] font-black uppercase leading-none tracking-[-0.08em] text-accent-ink opacity-10">
        TALHA
      </div>
    </footer>
  );
}
