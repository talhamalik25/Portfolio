# Stage 6 handoff

Implemented the requested order: Hero → Work → Experience → Services → About → Education → Process → Stack → GitHub → Journey → FAQ → CTA → Contact → Footer.

Testimonials is mounted between FAQ and CTA but renders nothing while disabled, so it does not affect this order. Hero, the fonts/colors and Work's 3D fan logic were not edited in Stage 6. No dependencies were added. Nothing was deployed by this task.

## Files created

- `data/sections.js`: Experience, Education, Process, GitHub, FAQ, CTA and testimonial data.
- `data/navigation.js`: shared desktop/mobile menu entries.
- `src/components/ui/RevealSection.jsx`: shared section spacing/backgrounds, GSAP reveals and responsive Process line animation. Reuses the existing useMotionEffect hook, including live reduced-motion changes and animation cleanup.
- `src/components/sections/Experience.jsx`: one dark AKTech card with responsibility reveals, stack chips, company link and restrained hover glow.
- `src/components/sections/Education.jsx`: compact off-white degree, university/location and semester section.
- `src/components/sections/Process.jsx`: four steps, horizontal from 768px and vertical below it, with a scroll-drawn connecting line.
- `src/components/sections/GitHub.jsx`: five static repository cards with real repository names, languages and links.
- `src/components/sections/FAQ.jsx`: five native details/summary accordion items. Enter/Space works without custom keyboard handling; opening an item refreshes scroll measurements. Only one answer opens at a time.
- `src/components/sections/Testimonials.jsx`: renders only when enabled and at least one real quote exists.
- `src/components/sections/CTA.jsx`: compact off-white invitation linking to Contact. This checkout had no separate CTA component, so this supplies the requested slot.
- `scripts/verify-stage6.cjs`: repeatable browser checks using the existing Playwright dependency and installed Edge.
- `STAGE6-HANDOFF.md`: this guide.
- `artifacts/stage6/`: screenshots, verification results and the public GitHub profile source used to verify repository information.

## Files changed

- `app/page.js`: imports and composes the new sections in the requested order.
- `src/components/layout/Navbar.jsx`: reads menu data, reduces desktop link spacing slightly and makes the mobile menu scrollable on short screens.

## Navigation

Six links: Work, Experience, Services, About, Process, FAQ. The existing Let's Talk button links to Contact, bringing each menu to seven destinations (excluding the home logo).

Removed Stack and Journey from the main menu; both remain on the page. Contact is represented by Let's Talk rather than a duplicate text link. Education follows About, and GitHub follows Stack. The existing footer links still resolve.

## GitHub source and limitation

On 2026-11-01, https://github.com/talhamalik25 displayed **Popular repositories**, not a custom Pinned list. Five real repositories from that list are included: QR-Code-Generator (JavaScript), Amazon-Clone (HTML), Color-Generator (JavaScript), Calculator (HTML), Digital-clock (CSS).

The section says Public repositories rather than claiming these are pinned. Replace `github.repositories` with your chosen pinned selection if desired. There is no runtime GitHub API call or API key requirement. Descriptions intentionally remain placeholders.

## Every new FILL placeholder

All are in `data/sections.js`:

1. `[FILL: start month/year]`
2. `[FILL: AKTech responsibility 1 — web interfaces I build]`
3. `[FILL: AKTech responsibility 2 — my implementation work]`
4. `[FILL: AKTech responsibility 3 — how I collaborate]`
5. `[FILL: tools I use at AKTech]`
6. `[FILL: QR-Code-Generator description]`
7. `[FILL: Amazon-Clone description]`
8. `[FILL: Color-Generator description]`
9. `[FILL: Calculator description]`
10. `[FILL: Digital-clock description]`
11. `[FILL: how I estimate timelines after reviewing a brief]`
12. `[FILL: the types of business projects I can take on]`
13. `[FILL: my preferred next step after an enquiry]`

Testimonials has no sample quote or fabricated attribution. Leave `testimonials.enabled` false until you have real, approved entries. Then add objects with `quote`, `name` and optional `attribution`, and set enabled to true. An empty list remains hidden even if enabled is true.

Process descriptions are proposed working-process copy, not claims about past clients or outcomes. Edit them to match your preferences. Earlier-stage content placeholders and email-service setup remain unchanged; see STAGE-HANDOFF.md.

## Editing the components

Edit text, arrays, repository links and flags in `data/sections.js`; no JSX changes are needed for ordinary content updates. Edit menu entries in `data/navigation.js`, keeping the six-entry limit while the Contact CTA is present.

Each component owns its markup and layout. RevealSection provides the common dark/off-white wrapper. Elements marked `data-reveal` within a `data-reveal-group` animate in sequence. The Process line is marked `data-process-line`; its GSAP animation switches axis at the same 768px breakpoint as the layout. Reduced motion skips all new GSAP effects and leaves the line complete.

The existing Services implementation is a card grid, not an accordion. FAQ therefore reuses its dark surfaces, borders, rounded corners and orange interaction accents without rewriting Services. Adjacent sections sometimes share a background because the requested section order and explicit background choices require it; subtle borders preserve separation.

## How to test

1. Run `npm run dev` and review at widths 375, 768 and 1440px. Confirm the section order, Experience wrapping, compact Education and Process orientation.
2. Use keyboard Tab, Enter and Space to open FAQ answers, follow repository links and activate Contact. Open the mobile menu and select Experience/Process/FAQ; confirm it closes and scrolls to the correct section. Check the menu on a short screen too.
3. Toggle the system's reduced-motion preference with the page open. The new sections remain readable and the Process line is fully drawn.
4. Fill the data placeholders, confirm the Process wording and check all five GitHub links. Supply real testimonials only when approved.
5. To rerun automated checks: `npm run build`, then `npm run start -- --port 3100`, then in another terminal `node scripts/verify-stage6.cjs`. The script uses installed Microsoft Edge via Playwright and saves evidence in artifacts/stage6.

## Verification results

- `npm run build`: passed on the final application code.
- ESLint for all Stage 6 source and test files: passed.
- 375 / 768 / 1440px: section order, no overflow, no JavaScript page errors, FAQ keyboard behavior and reduced-motion visibility passed.
- Mobile menu: seven destinations, correct Experience anchor, and close-on-selection passed at 375 and 768px.
- Five repository cards present; testimonials absent.
- Screenshots visually reviewed for Experience, Process, FAQ and GitHub.
