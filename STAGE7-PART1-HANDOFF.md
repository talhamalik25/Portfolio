# Stage 7 — Part 1 review

Only Part 1 is implemented. Stop here for review before changing the work routes, Process or project-brief/footer flow.

## Files created

- `data/about.js`: all About text, four learning placeholders, draft personal principles, timeline periods and the empty optional experience list.
- `src/components/ui/LineReveal.jsx`: reusable version of the original About per-line orange wipe. It waits for fonts, re-splits on width changes, cleans up generated markup and responds to live reduced-motion changes.
- `scripts/verify-stage7-part1.cjs`: browser checks for the new structure, reveal lifecycle, timeline and responsive behavior.
- `artifacts/stage7-part1/`: viewport screenshots and test results.
- `STAGE7-PART1-HANDOFF.md`: this guide.

## Files changed

- `src/components/sections/About.jsx`: replaces the single long paragraph and empty workspace-image blocks with Who I am, What I do, Currently learning and How I think, inside one off-white section. All 11 content paragraphs use LineReveal.
- `src/components/sections/Experience.jsx`: replaces the standalone employment card with a vertical Experience & Education timeline. Company and university names still come from data/sections.js; periods come from data/about.js.
- `app/page.js`: places About directly after Work, then the combined timeline, then Services. Removes the separate Education section from the page; the existing Education component file is retained. Other later sections stay as they were for this review step.
- `data/navigation.js`: reorders the existing six menu links to Work, About, Experience, Services, Process and FAQ. Contact remains the existing Let's Talk button, for seven destinations. The education anchor now targets the university timeline entry.

The pre-existing CTA edit from Stage 6 is not part of this work. Hero, project data and 3D Work logic were not edited. No dependencies or TypeScript were added.

## Editing the content

Edit `about.who`, `about.work`, `about.learning` and `about.principles` in data/about.js. The three principles are draft copy for your review, not claims about previous results. Keep four learning topics if you want the same four-card layout.

Edit `timeline.employmentPeriod` and `timeline.educationPeriod` to confirm dates. The university start year is explicitly marked for confirmation. Optional internships/freelance work are not shown unless you add real entries to `timeline.additionalEntries`.

Each optional entry needs `id`, `title`, `organization`, `period` and `description`, with an optional `url`. Use a unique ID; the timeline renders entries in array order. The list is empty so no invented employment appears.

LineReveal owns only its paragraph's generated lines and overlays; no global animation state is changed. Reduced-motion mode shows orange text immediately. Experience reuses the existing RevealSection and useMotionEffect components for scroll entrances and cleanup.

## Every Part 1 placeholder

- `[FILL: real learning topic 1]`
- `[FILL: real learning topic 2]`
- `[FILL: real learning topic 3]`
- `[FILL: real learning topic 4]`
- `[FILL: start]` — AKTech start month/year.
- `[FILL: confirm start year]` — confirm or correct the displayed 2026 university start.
- `[FILL: any internships/freelance — only if real]` — a data-file instruction, not a visible fake timeline entry. Leave the list empty if none.

Earlier sections retain their existing placeholders; Parts 2–4 have not been implemented.

## How to review

1. Run `npm run dev`. Confirm Hero → Work → About → Experience & Education → Services.
2. Read each About sub-part and the three proposed principles. Scroll slowly to inspect the orange wipe in every sub-part.
3. Review at 375, 768 and 1440px. Resize with About visible; lines should reflow without duplicate overlays or horizontal scrolling.
4. Toggle reduced motion while the page is open: About should immediately show orange text and timeline cards should remain visible. Toggle it back to restore animations.
5. Follow About and Experience from desktop/mobile navigation; confirm the AKTech link and the `#education` anchor work.
6. Fill confirmed learning topics and dates. Add optional employment only if real.

Automated checks: run `npm run build`, start with `npm run start -- --port 3100`, then run `node scripts/verify-stage7-part1.cjs`. The script uses installed Edge through the existing Playwright dependency.

## Validation

Production build and ESLint pass. At 375/768/1440: correct section order, four About sub-parts, 11 reveal paragraphs, two real timeline entries, no horizontal overflow and no JavaScript page errors. Live reduced-motion toggling and resizing from desktop to mobile pass without nested/duplicate reveal wrappers. Mobile and desktop screenshots were visually inspected.
