import WorkGrid from "@/src/components/work/WorkGrid";
const title = "Work — Talha Malik";
const description = "Explore Talha Malik's web projects and work in progress, with implementation notes and available project links.";
export const metadata = {
  title, description, alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work", type: "website", images: ["/images/profile/heroimg.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/profile/heroimg.png"] },
};
export default function WorkPage() {
  return <main id="main-content" tabIndex={-1} className="min-h-screen bg-surface-a px-4 pb-24 pt-36 text-content sm:px-6">
    <div className="mx-auto max-w-[1240px]">
      <header className="mb-12 max-w-3xl"><p className="portfolio-kicker mb-5 text-accent-ink">SELECTED PROJECTS</p><h1 className="portfolio-display text-5xl sm:text-7xl">All <span className="text-accent-ink">Works.</span></h1><p className="portfolio-copy mt-5 text-muted">Websites, applications and work in progress. Explore the projects and the implementation details available so far.</p></header>
      <WorkGrid />
    </div>
  </main>;
}
