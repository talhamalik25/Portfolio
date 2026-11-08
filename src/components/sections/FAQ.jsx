"use client";
import { readyEntries } from "@/src/lib/content";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";
import SectionHeader from "@/src/components/ui/SectionHeader";

export default function FAQ() {
  const items = readyEntries(faqs, "FAQ");
  if (!items.length) return null;
  return <RevealSection id="faq">
    <SectionHeader
      kicker="A few answers"
      title="Before We"
      accent="Start."
      headingId="faq-heading"
    />
    <div data-reveal-group className="max-w-4xl space-y-3">{items.map((faq) => <details data-reveal name="portfolio-faq" key={faq.question} onToggle={() => ScrollTrigger.refresh()} className="group rounded-2xl border border-white/10 bg-surface-warm open:border-accent/40">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-5 text-base font-medium hover:text-accent sm:px-7 sm:text-lg [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">+</span></summary>
      <p className="px-5 pb-6 text-sm leading-relaxed text-white/70 sm:px-7 sm:text-base">{faq.answer}</p>
    </details>)}</div>
  </RevealSection>;
}
