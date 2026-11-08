import { readyEntries, readyText } from "@/src/lib/content";
import { about } from "@/data/about";
import LineReveal from "@/src/components/ui/LineReveal";
import SectionHeader from "@/src/components/ui/SectionHeader";

const partClass =
  "grid gap-7 border-t border-ink/10 py-10 sm:py-14 lg:grid-cols-[240px_1fr] lg:gap-12";
const headingClass = "text-xl font-semibold tracking-[-0.03em] sm:text-2xl";
const copyClass =
  "text-xl font-medium leading-[1.5] tracking-[-0.025em] text-muted sm:text-2xl";

export default function About() {
  const who = readyText(about.who, "About introduction");
  const work = readyEntries(about.work, "About work");
  const learning = readyEntries(about.learning, "Learning topics");
  const principles = readyEntries(about.principles, "About principles");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 bg-cream py-20 text-ink sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          kicker="About"
          title="Who I"
          accent="am."
          headingId="about-heading"
          light
        />

        {who ? (
          <div data-about-part="who" className={partClass}>
            <h3 className={headingClass}>Who I am</h3>
            <LineReveal className="text-2xl leading-[1.4] font-medium tracking-[-0.03em] text-muted sm:text-3xl lg:text-4xl">
              {who}
            </LineReveal>
          </div>
        ) : null}

        {work.length > 0 ? (
          <div data-about-part="work" className={partClass}>
            <h3 className={headingClass}>What I do</h3>
            <ul className="space-y-8">
              {work.map((item) => (
                <li key={item.title}>
                  <h4 className="mb-3 text-sm font-semibold tracking-[0.1em] uppercase">
                    {item.title}
                  </h4>
                  <LineReveal className={copyClass}>{item.description}</LineReveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {learning.length > 0 ? (
          <div data-about-part="learning" className={partClass}>
            <h3 className={headingClass}>Currently learning</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {learning.map((topic) => (
                <li
                  key={topic}
                  className="min-w-0 rounded-2xl border border-ink/10 bg-white/50 p-5 sm:p-6"
                >
                  <LineReveal className="text-lg leading-relaxed font-medium text-muted">
                    {topic}
                  </LineReveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {principles.length > 0 ? (
          <div data-about-part="principles" className={`${partClass} pb-0 sm:pb-0`}>
            <h3 className={headingClass}>How I think</h3>
            <ul className="space-y-6">
              {principles.map((principle) => (
                <li key={principle} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <LineReveal className={copyClass}>{principle}</LineReveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
