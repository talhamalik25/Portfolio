# Portfolio stages — handoff

Local implementation in the existing JavaScript App Router checkout. No application dependencies added. General Sans, the hero composition and existing color system are preserved. No deployment performed.

## Stage 1 — content fixes

Files: `app/layout.js`, `src/components/sections/Journey.jsx`, `src/components/sections/SelectedWork.jsx`, `src/components/sections/workData.js`.

Removed the two anonymous Coming Soon cards and visible TODO copy. First Projects has the requested year placeholder, Computer Science uses 2026, and unknown years have no badge. Existing Journey entries remain, with a new Now entry for AKTech. Metadata title, description, Open Graph and Twitter copy reflect the current role and AI automation. Broken social image reference now uses the existing portrait; metadataBase resolves absolute share URLs.

Manual checks: inspect Journey on mobile and desktop; confirm the 2026 education date; inspect page/social metadata; verify no TODO or Coming Soon text appears.

Placeholder: `[FILL: year]` for First Projects.

## Stage 2 — AKTech positioning

Files: `src/components/sections/Hero.jsx`, `src/components/sections/About.jsx`, `src/components/sections/Footer.jsx`.

Updated supporting copy with AKTech, Iqra University Karachi and the requested stack. Added the linked Currently at AKTech pill. About adds three sentences about the frontend role and web interfaces. The original orange line reveal remains. Footer availability now fits the current role.

Manual checks: read the copy aloud, open the AKTech link, scroll About slowly and resize to verify its line reveal. Hero font, portrait and watermark composition remain intact.

Placeholders: none introduced by this stage.

## Stage 3 — case studies

Files: `data/projects.js`, `app/work/[slug]/page.js`, `src/components/sections/SelectedWork.jsx`, `src/components/sections/WorkStageCanvas.jsx`, `src/components/sections/workData.js`.

One data file now drives cards, fan selection and statically generated case-study routes. The old workData module re-exports it. Fan hover/click and accessible selection buttons choose a project; summary, stack and available links are displayed below. Normal cards retain their information for touch and keyboard users. Missing GitHub URLs do not produce dead buttons. Detail pages expose missing link information explicitly. Unknown project slugs return 404. Add another complete project object and rebuild to add a project without changing components.

Manual checks: select each fan item using pointer and keyboard; open each case study, live URL and Back to work link; add a sample entry locally if testing extensibility. Verify the existing Jewellery Store stack and feature copy, which were retained from the previous workData file.

Complete these exact placeholders:

- `[FILL: Sooti Mehal role]`
- `[FILL: Sooti Mehal stack]`
- `[FILL: Sooti Mehal overview]`
- `[FILL: Sooti Mehal what I built]`
- `[FILL: Sooti Mehal GitHub URL or confirm private]`
- `[FILL: Malik Enterprices one-line summary]`
- `[FILL: Malik Enterprices role]`
- `[FILL: Malik Enterprices stack]`
- `[FILL: Malik Enterprices overview]`
- `[FILL: Malik Enterprices what I built]`
- `[FILL: Malik Enterprices GitHub URL or confirm private]`
- `[FILL: Jewellery Store role]`
- `[FILL: Jewellery Store overview]`
- `[FILL: Jewellery Store approved screenshots]`
- `[FILL: Jewellery Store GitHub URL or confirm private]`
- `[FILL: which AKTech projects I can show publicly]`
- `[FILL: AKTech product work stack]`
- `[FILL: AKTech product work overview]`
- `[FILL: AKTech product work what I built]`
- `[FILL: AKTech product work approved screenshots]`
- `[FILL: AKTech product work public live URL]`
- `[FILL: AKTech product work GitHub URL or confirm private]`

Supply Jewellery Store and approved AKTech card images through each object's `image` property as well. The AKTech entry contains no invented product details or screenshots. Replace its placeholder only with work you can show publicly.

## Stage 4 — restrained polish

Files: `app/globals.css`, `app/page.js`, `src/hooks/useMotionEffect.js`, `src/components/ui/ScrollProgress.jsx`, `src/components/ui/GlobalLoader.jsx`, `src/components/ui/ResumeLink.jsx`, `src/components/sections/Hero.jsx`, `src/components/sections/HeroScene.jsx`, `src/components/sections/About.jsx`, `src/components/sections/Journey.jsx`, `src/components/sections/Footer.jsx`, `src/components/sections/Capabilities.jsx`, `src/components/sections/SelectedWork.jsx`, `src/components/sections/Contact.jsx`.

Extended the existing GSAP scroll progress with subtle heading entrances. A shared effect hook cleans up animations and responds to live reduced-motion preference changes. Three.js is disabled under reduced motion. Focus indicators are available globally. About re-splits after font loading and width changes. Resume availability is checked during rendering: until the supplied PDF exists, the control is explicitly unavailable instead of linking to a 404. Add the PDF and rebuild to activate the download.

Manual checks: Tab through links and project controls; toggle reduced motion with the page open; resize while viewing About; check resume download after supplying the file.

Placeholder: `[FILL: resume.pdf]` — place the actual resume at `public/resume.pdf`.

## Stage 5 — contact and quality

Files: `app/api/contact/route.js`, `src/lib/contact.js`, `src/lib/contactDelivery.js`, `src/components/sections/Contact.jsx`, `src/components/sections/Journey.jsx`, `src/components/sections/WorkStageCanvas.jsx`, `scripts/verify-portfolio.cjs`; QA outputs in `artifacts/qa/`.

The form now POSTs to a route handler with shared validation, input length limits, bounded request bodies, loading state, duplicate-submit protection, timeout and honest error handling. It only displays success after the server accepts delivery. **Live delivery is not implemented yet:** your email provider choice and credentials are still required. The explicit adapter in contactDelivery.js currently returns a service-unavailable error. Existing direct email links remain usable. Do not put secret keys in the browser or commit them.

Visual QA caught a canvas with an indefinite parent height and misaligned desktop timeline nodes. The fan now fills its existing 460px desktop area; timeline nodes use the center grid column and the SVG measures its own coordinate space. Empty year badges are hidden.

Manual checks: submit empty/invalid fields, submit while the service is unavailable, then verify real inbox delivery once the chosen adapter is implemented and configured. Test provider failure, timeout, success and retry. Review screenshots at 375px, 768px and 1440px. Run Lighthouse once tooling downloads work.

Placeholder: `[FILL: email service I choose]`. Confirm the provider, recipient and verified sender; configure credentials server-side after integration. No message has been sent by these tests.

## Verification

- Production `npm run build`: passes, including four static case studies and the dynamic contact route.
- ESLint: passes.
- Playwright with installed Edge: no horizontal overflow, no visible TODO copy and no JavaScript page errors at 375px, 768px and 1440px.
- All four project routes return 200; an unknown slug returns 404.
- Client validation and unavailable-provider error states pass. Invalid API payloads return 400.
- Reduced motion removes the canvas and leaves About readable. Keyboard project selection passes.
- Lighthouse scores: unavailable. The CLI is not installed; sandbox download failed, then two network-enabled attempts failed with ERR_SSL_CIPHER_OPERATION_FAILED. No scores are claimed.
- QA evidence: `artifacts/qa/results.json`, the three full-page viewport screenshots, and focused desktop Work/Journey screenshots.

The remaining delivery dependencies are project details/approved assets, the resume PDF, and email-provider integration. Lighthouse remains an environment verification limitation.
