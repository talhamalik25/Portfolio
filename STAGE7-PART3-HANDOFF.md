# Stage 7 — Part 3 handoff

Only Part 3 is implemented. Stop here for review before the project-brief form and footer work.

## Files changed / created

- `src/components/sections/Process.jsx`: replaces the four-column process with a GSAP-pinned desktop story and a static stacked fallback. Contains phase controls, screen-reader copy and animation cleanup.
- `src/components/sections/ProcessVisual.jsx` (new): four original inline SVG sketches drawn using the portfolio colors and inherited typography. No photos, external assets or libraries.
- `data/sections.js`: adds `visual` and three `tags` to each existing `processSteps` entry. Existing descriptions and all FILL values are unchanged.
- `app/page.js`: moves Process after Stack, matching the target order.
- `app/globals.css`: ensures unpinned phases remain visible even if GSAP refresh restores stale inline styles during teardown.
- `scripts/verify-stage7-part3.cjs` (new): checks all four phases, keyboard controls, responsive layout and cleanup.
- `artifacts/stage7-part3/`: screenshots and browser-check output.
- `STAGE7-PART3-HANDOFF.md`: this guide.

## Behavior

At widths of at least 1024px and viewport heights of at least 760px, the stage pins below the navbar. Scrolling crossfades through Understand, Design, Build and Launch. Each phase has its number, title, existing short description, three tags and its own right-hand visual. Buttons can jump to a phase using mouse or keyboard.

Narrow screens, short viewports and reduced-motion mode show all phases in ordinary document flow, with no pin or crossfades. The initial rendered HTML is also stacked, so content remains available before JavaScript runs. If the enhanced panel would not fit the available viewport, it falls back to the stacked layout.

While desktop panels overlap, a complete screen-reader list preserves access to every phase. The controls indicate the current phase. Toggling reduced motion or resizing removes the spacer and restores panel visibility.

The four sketches illustrate scope, a wireframe, UI/API/data connections and launch steps. They are labelled Process sketch and make no claims about client work or results.

## Editing it yourself

Edit `processSteps` in data/sections.js:

- `title` and `description` control the left-side copy.
- `tags` is an array of three short focus areas.
- `visual` chooses `understand`, `design`, `build` or `launch` in ProcessVisual.jsx.

Array order controls the scroll sequence. As before, the content filter skips any phase containing `[FILL` anywhere in its data; no placeholder text is shown publicly. Keep the four existing phases for this design.

Process.jsx uses one GSAP context to own all panel styles and the timeline, so cleanup can restore the original document layout. The viewport travel is controlled by `items.length * window.innerHeight * 0.75`; `scrub: 0.35` controls how quickly the animation follows scrolling. Each phase has a dwell interval before the next crossfade. The SVG drawings are entirely contained in ProcessVisual.jsx.

## Manual review

1. Run `npm run dev`, then scroll to Process after Stack at 1440px wide and approximately 900px tall.
2. Scroll down and back up through all four phases. Confirm the text and visual change together, the panel stays below the navbar and scrolling exits normally into Journey.
3. Tab to the phase buttons and activate each with Enter/Space. Confirm the selected phase changes.
4. Review at 375px and 768px. All four phases should be stacked, readable and free of horizontal overflow.
5. Toggle reduced motion while inside the pinned section. All phases should become visible with no pin spacer. Toggle back and resize to mobile/short desktop to check cleanup.
6. Review the proposed tags in the data file for your preferred wording.

Repeatable browser check: build, start with `npm run start -- --port 3100`, then run `node scripts/verify-stage7-part3.cjs` in another terminal. The script uses the existing Playwright package with installed Edge.

## FILL placeholders

No new FILL placeholders were introduced. All existing values remain unchanged and continue to be filtered from public rendering. See REMAINING-PLACEHOLDERS.md for the existing inventory.

## Validation completed

- `npm run lint` and `npm run build`: passed.
- Production browser checks at 375, 768 and 1440px: passed with no horizontal overflow or JavaScript errors.
- All four phase controls, reverse navigation, pin bounds, reduced-motion toggle, re-enabling motion, mobile resize and short desktop fallback: passed.
- Screenshots and machine-readable results are in `artifacts/stage7-part3/`.
