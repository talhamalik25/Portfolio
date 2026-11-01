import { readyEntries } from "@/src/lib/content";
import { education } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function Education() {
  if (!readyEntries([education], "Education").length) return null;
  return <RevealSection id="education" light compact>
    <div data-reveal-group className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div><p data-reveal className="portfolio-kicker mb-4 text-[#EB5002]">EDUCATION</p>
        <h2 data-reveal id="education-heading" className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{education.degree}</h2>
        <p data-reveal className="mt-2 text-[#5D5652]">{education.university}, {education.location}</p>
      </div>
      <p data-reveal className="w-fit rounded-full border border-[#EB5002]/20 bg-[#EB5002]/5 px-4 py-2 text-sm">{education.status}</p>
    </div>
  </RevealSection>;
}
