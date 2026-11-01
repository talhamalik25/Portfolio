import { timelineEntries } from "@/src/lib/timeline";
import RevealSection from "@/src/components/ui/RevealSection";

export default function Experience() {
  const entries = timelineEntries;
  if (!entries.length) return null;

  return (
    <RevealSection id="experience">
      <header className="mb-12 max-w-4xl">
        <p className="portfolio-kicker mb-4 text-[#EB5002]">WORK & STUDY</p>
        <h2 id="experience-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
          Experience <span className="text-[#EB5002]">& Education.</span>
        </h2>
      </header>
      <ol className="relative max-w-4xl space-y-8 border-l border-[#EB5002]/30 pl-6 sm:ml-2 sm:pl-10">
        {entries.map((entry) => (
          <li id={entry.id === "education" ? "education" : undefined} data-timeline-entry data-reveal-group key={entry.id} className="relative scroll-mt-28">
            <span aria-hidden="true" className="absolute -left-[30px] top-8 h-3 w-3 rounded-full border-2 border-[#0A0A0A] bg-[#EB5002] sm:-left-[46px]" />
            <article data-reveal className="rounded-3xl border border-white/10 bg-[#11100F] p-6 sm:p-8">
              <p className="mb-4 text-sm text-white/65">{entry.period}</p>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">{entry.title}</h3>
              <p className="mt-2 text-base text-white/80">{entry.organization}</p>
              <p className="mt-5 text-base leading-relaxed text-white/65">{entry.description}</p>
              {entry.url && <a href={entry.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#EB5002]/50 px-5 py-2 text-sm hover:bg-[#EB5002]/10">Visit {entry.organization} ↗</a>}
            </article>
          </li>
        ))}
      </ol>
    </RevealSection>
  );
}
