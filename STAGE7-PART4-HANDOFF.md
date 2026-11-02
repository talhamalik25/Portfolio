# Stage 7 — Part 4

The contact section now contains a three-step project brief. Footer availability comes from one config value. No dependencies were added, and the hero, Work cards, fonts and colors were preserved.

## Files created / changed

- `data/contact.js` (new): project types, budget ranges and availability.
- `src/components/sections/ProjectBrief.jsx` (new): progress indicator, step state, inputs, focus management, validation, Back/Continue controls and submission states.
- `src/components/sections/Contact.jsx`: mounts ProjectBrief inside the existing section and retains its GSAP reveal and contact sidebar.
- `src/lib/contact.js`: shared client/server validation, including project type and optional budget; exports the fields belonging to each step.
- `app/api/contact/route.js`: passes the complete validated brief to the delivery adapter.
- `src/components/sections/Footer.jsx`: uses configured availability, retains AKTech role/socials/Karachi, makes homepage anchors route-safe and wraps the email on narrow layouts.
- `scripts/verify-stage7-part4.cjs` (new): production browser and route checks.
- `artifacts/stage7-part4/`: screenshots and test results.
- `REMAINING-PLACEHOLDERS.md`: adds the new budget placeholder.
- `STAGE7-PART4-HANDOFF.md`: this guide.

## Email status

You explicitly chose to leave delivery unconfigured. The existing `src/lib/contactDelivery.js` stub remains unchanged. Valid requests return HTTP 503, and the form shows a truthful error with a direct-email fallback while retaining the entered brief. No email was sent during verification.

The success UI was tested with a simulated API response. Live delivery still needs a chosen provider and server-side credentials. The adapter will receive `{ name, email, projectType, budget, message }`; it must resolve only after the provider accepts the message. The browser requires both a successful HTTP response and `{ ok: true }` before showing success.

## Editing

- Change `availability` in `data/contact.js` to either `Available for select projects` or `Currently busy`.
- Edit `projectTypes` to change the select options. Client and server share this list.
- Replace the budget placeholder with approved range strings including currency. Until then it is hidden, and an optional free-text budget field is shown. Once real ranges exist, the field automatically becomes a select with an optional undecided choice.
- All config entries use the existing placeholder filter and dev-only warnings. Existing FILL values are unchanged.
- `ProjectBrief.jsx` owns the step number and retains values between steps. Each Continue checks that step; final submission and the route validate the complete brief. Back preserves values. Invalid fields receive focus, and successful submission clears the brief.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed.
- Production browser tests at 375/768/1440px with reduced motion: passed.
- Tested missing/invalid fields, Back navigation, retained values, disabled sending controls, actual unconfigured delivery error, simulated success and reset.
- Server rejected malformed field types, missing fields, invalid email and unsupported project type with HTTP 400.
- No horizontal overflow, visible FILL text or page errors detected. Screenshots reviewed.

Repeat: run a production build, start with `npm run start -- --port 3100`, then run `node scripts/verify-stage7-part4.cjs` in another terminal. This script intentionally expects delivery to remain unconfigured.

## Manual review

1. At 375, 768 and 1440px, navigate to Contact and complete all three steps.
2. Try blank fields and an invalid email; check that focus reaches the first invalid input.
3. Go Back and confirm values remain. Try keyboard-only navigation.
4. Submit: expect an error while delivery is unconfigured. Confirm the message stays and the email link works.
5. Check the footer availability, homepage navigation, social links and Karachi location.
6. Enable reduced motion and confirm the form remains fully usable.

## FILL list

- New: `[FILL: budget range options and currency]` in `data/contact.js`.
- Still deferred by your choice: `[FILL: email service I choose]` in `src/lib/contactDelivery.js`.
- All earlier content placeholders are unchanged; the complete inventory remains in `REMAINING-PLACEHOLDERS.md`.

Stopped after Part 4 for review.
