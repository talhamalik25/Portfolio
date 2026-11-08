import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, onSelect, featured = false }) {
  return (
    <article
      data-project-card
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className={[
        "portfolio-project-card group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-warm transition-colors hover:border-accent/50",
        featured ? "lg:flex-row" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex items-center justify-center overflow-hidden bg-surface-deep",
          featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:w-[58%]" : "aspect-[16/10]",
        ].join(" ")}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 767px) 100vw, 50vw"}
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <span aria-hidden="true" className="px-6 text-center text-xl font-semibold text-white/30">
            {project.title}
          </span>
        )}
        {project.status === "in-progress" ? (
          <span className="absolute top-4 right-4 rounded-full border border-accent/40 bg-surface-warm px-3 py-1 text-xs text-accent-link">
            In progress
          </span>
        ) : null}
      </div>
      <div className={["flex flex-1 flex-col p-6", featured ? "lg:justify-center lg:p-10" : ""].join(" ")}>
        <div className="mb-3 flex items-center gap-3">
          {project.number ? (
            <span className="text-xs tracking-[0.18em] text-accent">{project.number}</span>
          ) : null}
          {project.category ? (
            <p className="text-xs tracking-widest text-white/60 uppercase">{project.category}</p>
          ) : null}
        </div>
        <h3 className={featured ? "portfolio-display text-3xl leading-tight lg:text-5xl" : "portfolio-display text-2xl leading-tight"}>
          <Link href={"/work/" + project.slug}>{project.title}</Link>
        </h3>
        {project.summary ? (
          <p className="portfolio-copy mt-4 text-white/70">{project.summary}</p>
        ) : null}
        {project.stack.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={project.title + " stack"}>
            {project.stack.map((tag) => (
              <li key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
          <Link href={"/work/" + project.slug} className="inline-flex min-h-11 items-center text-accent-link">
            View case study →
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center"
            >
              Live ↗
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center"
            >
              GitHub ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
