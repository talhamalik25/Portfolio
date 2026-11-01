import { processSteps } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function Process() {
  return <RevealSection id="process">
    <header className="mb-12"><p className="portfolio-kicker mb-4 text-[#EB5002]">THE PROCESS</p><h2 id="process-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">How I <span className="text-[#EB5002]">Work.</span></h2></header>
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-5 top-5 w-px bg-white/15 md:bottom-auto md:left-5 md:right-5 md:h-px md:w-auto" />
      <div data-process-line aria-hidden="true" className="absolute bottom-0 left-5 top-5 w-px bg-[#EB5002] md:bottom-auto md:left-5 md:right-5 md:h-px md:w-auto" />
      <ol data-reveal-group className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {processSteps.map((step, index) => <li data-reveal key={step.title} className="grid grid-cols-[40px_1fr] items-start gap-5 md:block">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#EB5002]/50 bg-[#0A0A0A] text-xs text-[#EB5002]">{String(index + 1).padStart(2, "0")}</span>
          <div><h3 className="mb-3 text-xl font-semibold md:mt-7">{step.title}</h3><p className="text-sm leading-relaxed text-white/65">{step.description}</p></div>
        </li>)}
      </ol>
    </div>
  </RevealSection>;
}
