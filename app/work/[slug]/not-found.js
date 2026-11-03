import Link from "next/link";
export default function ProjectNotFound() {
  return <main id="main-content" tabIndex={-1} className="mx-auto min-h-screen max-w-4xl px-5 py-40"><h1 className="portfolio-display text-4xl">Project not found.</h1><p className="mt-5 text-muted">This project is not in the published collection.</p><Link href="/work" className="mt-8 inline-flex min-h-11 items-center text-accent-ink">Browse all works →</Link></main>;
}
