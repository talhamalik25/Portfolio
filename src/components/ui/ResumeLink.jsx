import { readyText } from "@/src/lib/content";
import { existsSync } from "node:fs";
import path from "node:path";
export default function ResumeLink() {
  const available = existsSync(path.join(process.cwd(), "public/resume.pdf"));
  if (!available) { readyText("[FILL: resume.pdf]", "Resume"); return null; }
  return available ? <a href="/resume.pdf" download className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 py-2 text-sm hover:border-[#EB5002]">Download Resume</a> : null;
}
