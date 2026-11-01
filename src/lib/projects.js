import { projects } from "@/data/projects";
import { readyEntries, readyText } from "./content";

// A project identity is real even when some case-study fields are unfinished.
export const publicProjects = projects.filter((project) => readyText(project.title, "Project title") && readyText(project.slug, "Project slug")).map((project) => ({
  ...project,
  category: readyText(project.category, project.title + " category"),
  summary: readyText(project.summary, project.title + " summary"),
  role: readyText(project.role, project.title + " role"),
  stack: readyEntries(project.stack, project.title + " stack"),
  liveUrl: project.status === "in-progress" ? "" : readyText(project.liveUrl, project.title + " live URL"),
  githubUrl: readyText(project.githubUrl, project.title + " GitHub URL"),
  image: readyText(project.image, project.title + " image"),
  alt: readyText(project.alt, project.title + " image alt") || project.title,
  details: {
    overview: readyText(project.details?.overview, project.title + " overview"),
    whatIBuilt: readyEntries(project.details?.whatIBuilt, project.title + " what I built"),
    challenges: readyEntries(project.details?.challenges, project.title + " challenges"),
  },
  screenshots: readyEntries(project.screenshots, project.title + " screenshots"),
  palette: project.palette || { deep: "#1C1410", mid: "#9A3F12", accent: "#EB5002", wash: "#3E7C86" },
}));
