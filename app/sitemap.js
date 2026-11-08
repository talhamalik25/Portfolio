import { publicProjects } from "@/src/lib/projects";

const base = "https://portfolio-pi-three-wmfjdk08k5.vercel.app";

export default function sitemap() {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    ...publicProjects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
