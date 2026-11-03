import { readyEntries } from "@/src/lib/content";
import { github } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function GitHub() {
  const items = readyEntries(github.repositories, "GitHub repositories");
  if (!items.length) return null;
  return <RevealSection id="github" light>
    <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div><p className="portfolio-kicker mb-4 text-[#EB5002]">PUBLIC REPOSITORIES</p><h2 id="github-heading" className="portfolio-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">On <span className="text-[#EB5002]">GitHub.</span></h2></div>
      <a href={github.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit items-center rounded-full border border-[#1A1613]/20 px-5 text-sm hover:border-[#EB5002]">View my profile ↗</a>
    </header>
    <div data-reveal-group className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((repo) => <article data-reveal key={repo.url} className="flex min-w-0 flex-col rounded-3xl border border-[#1A1613]/10 bg-white p-6 transition-colors hover:border-[#EB5002]/50 focus-within:border-[#EB5002]/50">
      <h3 className="break-words text-xl font-semibold tracking-[-0.03em]"><a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#EB5002]">{repo.name} <span aria-hidden="true">↗</span></a></h3>
      <p className="mb-7 mt-4 text-sm leading-relaxed text-[#5D5652]">{repo.description}</p>
      <p className="mt-auto flex items-center gap-2 text-xs text-[#5D5652]"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#EB5002]" />{repo.language}</p>
    </article>)}</div>
  </RevealSection>;
}
