# Stage 7 — Part 2 handoff

Part 2 is complete. Stop here for review before implementing the pinned Process section or the project-brief/footer changes. No deployment was performed and no dependencies were added.

## What changed

The published project list is Sooti Mehal, Malik Enterprices, Jewellery Store and Gym CRM. Gym CRM is marked In progress and has no live link. The original AKTech draft and its placeholder values remain in `unpublishedProjects` in data/projects.js, outside the public list and route generation.

`/work` displays four projects with All, Website, E-commerce and CRM filters. Categories derive from the data; adding a new category adds its chip automatically. Filtering supports keyboard input, reports the result count and uses the existing GSAP/reduced-motion patterns.

Each `/work/[slug]` page has project-specific metadata, a real hero image when supplied, available case-study sections, valid links, screenshots and a next-project link. Unknown and unpublished slugs return a 404 page. Missing images and unfinished fields are omitted rather than fabricated. Only Sooti Mehal and Malik Enterprices currently have supplied images.

The homepage previews the first four published projects and links to /work. The 3D animation implementation in WorkStageCanvas.jsx is byte-for-byte unchanged, verified by its SHA-256 hash. Its data adapter and the surrounding project card renderer use the shared published data.

## Files created

- `app/work/page.js`: index page and metadata.
- `app/work/layout.js`: shared navigation and skip link for Work routes.
- `app/work/[slug]/not-found.js`: unknown-project state.
- `src/components/work/WorkGrid.jsx`: category filters and GSAP grid entrance.
- `src/components/ui/ProjectCard.jsx`: reusable homepage/index card markup.
- `src/lib/content.js`: placeholder detection, immutable filtering and development-only warnings.
- `src/lib/projects.js`: published project view; hides incomplete fields and supplies a default 3D palette.
- `src/lib/timeline.js`: shared filtered timeline used by Experience and navigation.
- `scripts/verify-content.cjs`: filtering, warning, placeholder preservation and 3D source checks.
- `scripts/verify-stage7-part2.cjs`: browser checks across routes, filters and viewport sizes.
- `REMAINING-PLACEHOLDERS.md`: complete current placeholder inventory.
- `STAGE7-PART2-HANDOFF.md`: this guide.
- `artifacts/stage7-part2/`: results, screenshots and the original fan source hash.

## Files changed

- `data/projects.js`: required project schema, Gym CRM, preserved unpublished AKTech draft.
- `app/work/[slug]/page.js`: complete conditional case-study renderer, static parameters, metadata and next-project navigation.
- `src/components/layout/Navbar.jsx`: route-aware Work highlighting, home anchor destinations from /work routes, mobile accessible labels, and omission of the empty Experience link.
- `src/components/sections/SelectedWork.jsx`: filtered project feed, shared normal card markup and View all works link.
- `src/components/sections/workData.js`: data adapter for the unchanged 3D fan.
- `src/components/sections/About.jsx`: filters unfinished sub-part entries and omits empty sub-parts.
- `src/components/sections/Experience.jsx`: uses filtered timeline entries and hides the section when none remain.
- `src/components/sections/FAQ.jsx`, `GitHub.jsx`, `Testimonials.jsx`, `Process.jsx`, `Education.jsx`, `CTA.jsx`, `Journey.jsx`, `Capabilities.jsx`, `Stack.jsx`, `Footer.jsx`: filter data entries before rendering.
- `src/components/ui/ResumeLink.jsx`: hides the missing-resume control instead of rendering its placeholder.

## Placeholder behavior

Source data is not mutated. `readyEntries` skips any entry containing `[FILL` anywhere in its nested text. `readyText` hides an unfinished scalar field. Empty strings and whitespace-only list items are also omitted. Development warnings identify skipped entries and are deduplicated; production emits none. Server-component warnings appear in the development terminal; client-component warnings appear in the browser console.

For list content, the whole unfinished entry is skipped. Consequently the two dated timeline entries, all four About learning cards, all five GitHub cards, three FAQ entries and the First Projects Journey entry are currently hidden. The Experience and GitHub sections disappear when empty; Experience returns to navigation automatically when a complete timeline entry is available. Existing complete About copy and two FAQ answers remain visible.

For the explicitly requested four real projects, confirmed identities/statuses remain visible. Unfinished summary, role, image, stack items and detail fields are skipped individually. Empty case-study sections and missing Live/GitHub buttons are not rendered. This allows the four real projects to remain browsable without displaying placeholder copy.

All original `[FILL]` strings were retained. The complete remaining list is in REMAINING-PLACEHOLDERS.md, including the unpublished AKTech draft, earlier About/Experience/FAQ fields, resume and email-service setup.

## Adding a project yourself

Add one object to the `projects` array in data/projects.js with:

- `slug`: a unique URL-safe slug.
- `title`, `category`, `summary`, `role`.
- `stack`: array of confirmed technology names.
- `liveUrl`, `githubUrl`: valid URLs or empty strings when unavailable.
- `image`: a real local image path such as `/images/projects/example.jpg`, or an empty string until supplied.
- `status`: `live` or `in-progress`.
- `details`: `{ overview, whatIBuilt: [], challenges: [] }`.

Optional existing fields are `alt`, `screenshots` (`{ src, alt }` entries), `number` and `palette`. A default palette is supplied if absent. No component changes are needed. Rebuild to generate the new static route; /work categories and next-project links update automatically. Array order controls next-project navigation and the first-four homepage preview. Never add fake content to avoid an empty section: `[FILL: ...]` remains safe to keep in the data until confirmed.

## How to test

1. Run `npm run dev`. Visit `/`, `/work` and each of the four case-study URLs. Check that no visible text contains `[FILL`.
2. On `/work`, test All, Website, E-commerce and CRM chips with mouse and keyboard. Expected counts: 4, 2, 1 and 1.
3. Confirm Gym CRM says In progress, has no Live link and loops its Next project link back to Sooti Mehal.
4. Visit `/work/missing` and `/work/aktech-product-work`: both should show the 404 state.
5. Inspect title, description and Open Graph tags. On every Work route, Work is highlighted in navigation and links to `/#work`. Other menu links also target their homepage anchors. Both menus stay below seven destinations while Experience is empty.
6. Test 375/768/1440px, reduced motion, homepage fan selection and the View all works link.
7. In development, inspect the console/terminal for skipped-entry warnings; production should have none. Confirming a data entry and rebuilding makes it appear automatically.

Repeatable checks:

- `npm run lint`
- `npm run build`
- `node scripts/verify-content.cjs`
- Start `npm run start -- --port 3100`, then run `node scripts/verify-stage7-part2.cjs` in another terminal.

## Results

Lint and production build passed. Browser checks at 375, 768 and 1440px passed: no visible placeholders, no horizontal overflow, no JavaScript page errors, no production content warnings, working filters, four valid case-study routes, correct 404s, metadata, next-project links, Work navigation and reduced-motion behavior. Screenshots were visually inspected. Unit checks confirm nested placeholder filtering, source-data preservation, whitespace-item removal, development-only warnings and unchanged 3D source.
