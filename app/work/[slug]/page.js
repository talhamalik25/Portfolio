import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title + " — Talha Malik", description: project.summary, openGraph: { title: project.title + " — Talha Malik", description: project.summary } };
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
    <Link href="/#work" className="text-[#EB5002]">← Back to work</Link>
    <h1 className="portfolio-display mt-10 text-4xl sm:text-6xl">{project.title}</h1>
    <p className="portfolio-copy mt-5 text-white/75">{project.summary}</p>
    <div className="mt-12 space-y-10">
      <section><h2 className="text-2xl font-semibold">Overview</h2><p className="mt-3 text-white/75">{project.overview}</p></section>
      <section><h2 className="text-2xl font-semibold">My role</h2><p className="mt-3 text-white/75">{project.role}</p></section>
      <section><h2 className="text-2xl font-semibold">Stack</h2><ul className="mt-3 flex flex-wrap gap-2">{project.stack.map((item) => <li key={item} className="rounded-full border border-white/20 px-4 py-2">{item}</li>)}</ul></section>
      <section><h2 className="text-2xl font-semibold">What I built</h2><ul className="mt-3 space-y-3 text-white/75">{project.built.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2 className="mb-5 text-2xl font-semibold">Screenshots</h2><div className="grid items-start gap-5 sm:grid-cols-2">{project.screenshots.length ? project.screenshots.map((shot) => <Image key={shot.src} src={shot.src} alt={shot.alt} width={1440} height={900} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full rounded-xl" />) : <p>[FILL: {project.title} approved screenshots]</p>}</div></section>
      <section><h2 className="text-2xl font-semibold">Links</h2><div className="mt-4 flex flex-wrap gap-5">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#EB5002]">Live site ↗</a> : <p>[FILL: {project.title} public live URL]</p>}{project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#EB5002]">GitHub ↗</a> : <p>[FILL: {project.title} GitHub URL or confirm private]</p>}</div></section>
    </div>
  </main>;
}
