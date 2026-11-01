import { experience } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function Experience() {
  return <RevealSection id="experience">
    <header className="mb-10 max-w-3xl">
      <p className="portfolio-kicker mb-4 text-[#EB5002]">EXPERIENCE</p>
      <h2 id="experience-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{experience.heading}</h2>
    </header>
    <article data-reveal-group className="rounded-3xl border border-white/10 bg-[#11100F] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#EB5002]/40 hover:shadow-[0_0_48px_rgba(235,80,2,0.09)] focus-within:border-[#EB5002]/40 sm:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div><p data-reveal className="mb-3 text-sm text-white/60">{experience.companyName}</p>
          <h3 data-reveal className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{experience.role} — {experience.company}</h3></div>
        <p data-reveal className="text-sm text-white/65">{experience.period}</p>
      </div>
      <ul className="my-8 max-w-3xl space-y-4">
        {experience.responsibilities.map((item) => <li data-reveal key={item} className="flex gap-3 text-white/75"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EB5002]" /><span>{item}</span></li>)}
      </ul>
      <ul data-reveal className="mb-8 flex flex-wrap gap-2" aria-label="Tools used at AKTech">{experience.stack.map((tool) => <li key={tool} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">{tool}</li>)}</ul>
      <a data-reveal href={experience.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#EB5002]/50 px-5 py-2 text-sm hover:bg-[#EB5002]/10">Visit aktech.tech ↗</a>
    </article>
  </RevealSection>;
}
