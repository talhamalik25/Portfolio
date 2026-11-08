import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicProjects } from "@/src/lib/projects";

export function generateStaticParams() {
  return publicProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = publicProjects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  const title = project.title + " — Talha Malik";
  const description =
    project.summary || project.title + " — project details and available links by Talha Malik.";
  const images = [project.image || "/images/profile/heroimg.png"];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/work/" + slug },
    openGraph: { title, description, type: "website", url: "/work/" + slug, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = publicProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = publicProjects[index];
  const next = publicProjects[(index + 1) % publicProjects.length];
  const { overview, whatIBuilt, challenges } = project.details;
  const hasDetails = overview || project.role || project.stack.length || whatIBuilt.length || challenges.length;

  return (
    <main id="main-content" tabIndex={-1} className="bg-section pt-36 text-white">
      <header className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <Link href="/work" className="inline-flex min-h-11 items-center text-accent-link">
          ← All works
        </Link>
        {project.category ? <p className="portfolio-kicker mt-8 text-accent">{project.category}</p> : null}
        <h1 className="portfolio-display mt-4 text-4xl sm:text-6xl">{project.title}</h1>
        {project.status === "in-progress" ? (
          <p className="mt-5 w-fit rounded-full border border-accent/40 px-4 py-1 text-sm text-accent-link">
            In progress
          </p>
        ) : null}
        {project.summary ? <p className="portfolio-copy mt-5 text-white/75">{project.summary}</p> : null}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt}
            width={1440}
            height={900}
            sizes="(max-width: 1024px) 100vw, 960px"
            preload
            className="mt-10 h-auto w-full rounded-2xl"
          />
        ) : null}
        {project.liveUrl || project.githubUrl ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 hover:border-accent"
              >
                Live ↗
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 hover:border-accent"
              >
                GitHub ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </header>
      {hasDetails ? (
        <div className="bg-cream px-5 py-16 text-ink sm:px-8">
          <div className="mx-auto max-w-5xl space-y-10">
            {overview ? (
              <section>
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 leading-relaxed">{overview}</p>
              </section>
            ) : null}
            {project.role ? (
              <section>
                <h2 className="text-2xl font-semibold">My role</h2>
                <p className="mt-3">{project.role}</p>
              </section>
            ) : null}
            {project.stack.length > 0 ? (
              <section>
                <h2 className="text-2xl font-semibold">Stack</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item} className="rounded-full border border-ink/20 px-4 py-2 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {whatIBuilt.length > 0 ? (
              <section>
                <h2 className="text-2xl font-semibold">What I built</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5">
                  {whatIBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {challenges.length > 0 ? (
              <section>
                <h2 className="text-2xl font-semibold">Challenges</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5">
                  {challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      ) : null}
      {project.screenshots.length > 0 ? (
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <h2 className="mb-6 text-2xl font-semibold">Screenshots</h2>
          <div className="grid items-start gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={1440}
                height={900}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full rounded-xl"
              />
            ))}
          </div>
        </section>
      ) : null}
      <nav
        aria-label="Project navigation"
        className="mx-auto flex max-w-5xl flex-wrap justify-between gap-6 px-5 py-16 sm:px-8"
      >
        <Link href="/work" className="text-white/75">
          All works
        </Link>
        {publicProjects.length > 1 ? (
          <Link href={"/work/" + next.slug} className="text-accent-link">
            Next project: {next.title} →
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
