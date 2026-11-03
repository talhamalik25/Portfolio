import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, onSelect }) {
  return <article data-project-card onMouseEnter={onSelect} onFocus={onSelect} className="portfolio-project-card group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-outline bg-card transition-colors hover:border-[#EB5002]/50">
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-card">
      {project.image && <Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />}
      {!project.image && <span aria-hidden="true" className="px-6 text-center text-xl font-semibold text-muted">{project.title}</span>}
      {project.status === "in-progress" && <span className="absolute right-4 top-4 rounded-full border border-[#EB5002]/40 bg-card px-3 py-1 text-xs text-accent-ink">In progress</span>}
    </div>
    <div className="flex flex-1 flex-col p-6">
      {project.category && <p className="mb-3 text-xs uppercase tracking-widest text-muted">{project.category}</p>}
      <h3 className="portfolio-display text-2xl leading-tight"><Link href={"/work/" + project.slug}>{project.title}</Link></h3>
      {project.summary && <p className="portfolio-copy mt-4 text-muted">{project.summary}</p>}
      {project.stack.length > 0 && <ul className="mt-5 flex flex-wrap gap-2" aria-label={project.title + " stack"}>{project.stack.map(tag => <li key={tag} className="rounded-full border border-outline px-3 py-1 text-xs text-muted">{tag}</li>)}</ul>}
      <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
        <Link href={"/work/" + project.slug} className="inline-flex min-h-11 items-center text-accent-ink">View case study →</Link>
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">Live ↗</a>}
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">GitHub ↗</a>}
      </div>
    </div>
  </article>;
}
