"use client";
import { readyEntries } from "@/src/lib/content";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function FAQ() {
  const items = readyEntries(faqs, "FAQ");
  if (!items.length) return null;
  return <RevealSection id="faq">
    <header className="mb-10"><p className="portfolio-kicker mb-4 text-accent-ink">A FEW ANSWERS</p><h2 id="faq-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">Before We <span className="text-accent-ink">Start.</span></h2></header>
    <div data-reveal-group className="max-w-4xl space-y-3">{items.map((faq) => <details data-reveal name="portfolio-faq" key={faq.question} onToggle={() => ScrollTrigger.refresh()} className="group rounded-2xl border border-outline bg-card open:border-[#EB5002]/40">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-5 text-base font-medium hover:text-accent-ink sm:px-7 sm:text-lg [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="shrink-0 text-xl text-accent-ink transition-transform group-open:rotate-45">+</span></summary>
      <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-7 sm:text-base">{faq.answer}</p>
    </details>)}</div>
  </RevealSection>;
}
