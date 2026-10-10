import {
  SiCss3,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
} from "react-icons/si";

const groups = [
  {
    title: "Frontend",
    technologies: [
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss3 },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "GSAP", Icon: SiGreensock },
      { name: "Three.js", Icon: SiThreedotjs },
    ],
  },
  {
    title: "Backend",
    technologies: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "REST APIs" },
      { name: "Authentication" },
    ],
  },
  {
    title: "Database",
    technologies: [{ name: "MongoDB", Icon: SiMongodb }, { name: "Mongoose" }],
  },
  {
    title: "Tools",
    technologies: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Vercel", Icon: SiVercel },
      { name: "Figma", Icon: SiFigma },
      { name: "n8n", Icon: SiN8N },
    ],
  },
];

const learning = ["Backend depth", "DevOps basics", "AI integrations"];

function TechnologyList({ technologies, label }) {
  return (
    <ul className="mt-5 space-y-2" aria-label={`${label} technologies`}>
      {technologies.map(({ name, Icon }) => (
        <li
          key={name}
          className="group flex min-h-11 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 transition-colors hover:border-[#EB5002]/35 hover:bg-white/[0.04]"
        >
          {Icon ? (
            <Icon className="h-4 w-4 shrink-0 text-white/55 transition-colors group-hover:text-[#EB5002]" aria-hidden="true" />
          ) : (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35 transition-colors group-hover:bg-[#EB5002]" aria-hidden="true" />
          )}
          <span className="text-sm text-white/80">{name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Stack() {
  return (
    <section
      id="stack"
      className="border-t border-white/5 bg-[#0A0A0A] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="stack-heading"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl sm:mb-12">
          <p className="portfolio-kicker mb-4 text-[#EB5002]">TECH STACK</p>
          <h2
            id="stack-heading"
            className="portfolio-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl"
          >
            Tools I Use to <span className="text-[#EB5002]">Build.</span>
          </h2>
          <p className="portfolio-copy mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Technologies I use across frontend, backend, data and product workflows.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-white/10 bg-[#11100F] p-5 sm:p-6">
              <h3 className="portfolio-display border-b border-white/10 pb-4 text-xl font-semibold tracking-[-0.03em] text-white">
                {group.title}
              </h3>
              <TechnologyList technologies={group.technologies} label={group.title} />
            </article>
          ))}
        </div>

        <aside className="mt-5 rounded-3xl border border-white/10 bg-[#11100F] p-5 sm:p-6">
          <h3 className="portfolio-display text-xl font-semibold tracking-[-0.03em] text-white">
            Currently learning
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Currently learning">
            {learning.map((item) => (
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
