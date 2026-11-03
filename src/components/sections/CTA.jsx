import { readyEntries } from "@/src/lib/content";
import { cta } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function CTA() {
  if (!readyEntries([cta], "CTA").length) return null;
  return <RevealSection id="cta" light>
    <div data-reveal-group className="mx-auto max-w-3xl text-center">
      <p data-reveal className="portfolio-kicker mb-5 text-accent-ink">LET&apos;S BUILD SOMETHING</p>
      <h2 data-reveal id="cta-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{cta.heading}</h2>
      <p data-reveal className="portfolio-copy mx-auto mb-8 mt-6 max-w-xl text-muted">{cta.description}</p>
      <a data-reveal href={cta.href} className="inline-flex min-h-12 items-center rounded-full bg-[#EB5002] px-7 py-3 text-sm font-semibold text-content transition-colors hover:bg-[#1A1613]">{cta.label} <span aria-hidden="true" className="ml-3">↗</span></a>
    </div>
  </RevealSection>;
}
