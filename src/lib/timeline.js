import { experience, education } from "@/data/sections";
import { timeline } from "@/data/about";
import { readyEntries } from "./content";
export const timelineEntries = readyEntries([
  { id: "aktech", title: experience.role, organization: experience.companyName, period: timeline.employmentPeriod, description: "I build web interfaces at AKTech.", url: experience.url },
  { id: "education", title: education.degree, organization: education.university + ", " + education.location, period: timeline.educationPeriod, description: education.status },
  ...timeline.additionalEntries,
], "Experience timeline");
