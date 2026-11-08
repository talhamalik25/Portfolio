import { readyEntries } from "@/src/lib/content";
import SectionHeader from "@/src/components/ui/SectionHeader";

const groups = [
  {
    number: "01",
    title: "Core frontend",
    outcome: "Interactive pages with a component model I can reuse and change.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    number: "02",
    title: "Interface and motion",
    outcome: "Layouts that hold from phone to desktop, with motion only where it helps.",
    technologies: ["Tailwind CSS", "GSAP", "Three.js", "Figma"],
  },
  {
    number: "03",
    title: "Backend and data",
    outcome: "APIs, auth and MongoDB so the interface has a real data path.",
    technologies: ["Node.js", "Express", "REST APIs", "Authentication", "MongoDB", "Mongoose"],
  },
  {
    number: "04",
    title: "Workflow and delivery",
    outcome: "Versioned work, hosted deploys, and automations that connect the steps.",
    technologies: ["Git", "GitHub", "Vercel", "n8n"],
  },
];

const learning = ["Backend depth", "DevOps basics", "AI integrations"];

export default function Stack() {
  return (
    <section
      id="stack"
      className="border-t border-white/5 bg-section bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[18px_18px] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="stack-heading"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          kicker="Tech stack"
          title="Tools I Use to"
          accent="Build."
          headingId="stack-heading"
          lede="Grouped by what they let me ship — not a wall of repeated icons."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {readyEntries(groups, "groups").map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-white/10 bg-surface-warm p-5 sm:p-7"
            >
              <p className="text-xs tracking-[0.2em] text-accent">{group.number}</p>
              <h3 className="portfolio-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                {group.title}
              </h3>
              <p className="portfolio-copy mt-3 text-white/65">{group.outcome}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                {group.technologies.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/75"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="mt-5 rounded-3xl border border-white/10 bg-surface-warm p-5 sm:p-6">
          <h3 className="portfolio-display text-xl font-semibold tracking-[-0.03em] text-white">
            Currently learning
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Currently learning">
            {readyEntries(learning, "learning").map((item) => (
              <li key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
