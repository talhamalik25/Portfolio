# Portfolio Website Design System & Architecture

This document establishes the structural, aesthetic, and technical design rules for the developer portfolio website. It serves as a unified reference point for bridging creative execution with clean frontend code implementation.

---

## 1. Visual Identity & Color Palette

The color system uses a strict **High-Contrast Dark Mode** architecture. This layout forces a dominant, aggressive accent to control visual hierarchy while keeping the backdrop highly readable and industrial.

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Primary Background** | `#0B0B0C` | Dominant page background canvas. Deep dark charcoal. |
| **Secondary Background** | `#121214` | Section cards, layout layers, and project containers. |
| **Accent / Primary Brand** | `#EB5002` | High-energy orange. Active links, hover states, 1px blueprint borders, primary buttons. |
| **Text Primary** | `#FFFFFF` | Clear white for headings and high-priority titles. |
| **Text Secondary** | `#8E8E93` | Muted slate for body text, case study metrics, and secondary details. |
| **Borders / Dividers** | `#1E1E22` | Crisp 1px structural framing grids. |

---

## 2. Typography Strategy

The typography uses the **Neo-Grotesque Tech Engine**, relying on clean geometric forms paired with developer-focused monospace elements to ground the developer identity.

### Font Families
*   **Primary Display & UI:** `Geist Sans` or `Inter` (Variable Font System)
*   **Code Elements & Subtitles:** `Geist Mono` or `Space Mono`

### Type Scale (Tailwind Integration)
*   **Display Hero Headings:** `text-5xl md:text-7xl` (`tracking-tighter`, `font-black`, `leading-none`)
*   **Section Headings (H2):** `text-3xl md:text-4xl` (`tracking-tight`, `font-bold`)
*   **Body Text:** `text-base md:text-lg` (`leading-relaxed`, `font-normal`)
*   **Code Snippets & Meta:** `text-sm font-mono` (`tracking-normal`)

---

## 3. UI/UX Architecture & Layout Rules

The core application follows an **Asymmetric Editorial Blueprint** config, removing standard card blocks in favor of high-performance layout systems.

### A. Component Grid Systems
*   **Asymmetric 3-Column Configuration:** The structural layout (e.g., About and Core Principles) utilizes unequal columns separated by crisp, explicit `1px solid #1E1E22` borders.
*   **Horizontal Showcase System:** The Project/Services section leverages a pinned vertical viewport block, handling a smooth horizontal scroll transition via animation drivers (`scrub: 1`).
*   **Mobile Adaptability:** Layouts cleanly collapse from complex horizontal or multi-column grids down to a vertically stacked linear sequence below the `768px` (`md`) breaking threshold.

### B. UI Elements & Accents
*   **Interactive Blueprint Layouts:** Components act as structural wireframes. Interactive hover triggers translate micro-elements or text labels into `#EB5002` while retaining pure layouts.
*   **Bento Grid Alternative:** Standard dashboard bento grids are skipped in favor of clean grid lists with massive, tight typography layouts.

---

## 4. Technical Stack & Deployment Constraints

*   **Framework Architecture:** React.js powered by Next.js (App Router setup).
*   **Styling Base:** Tailwind CSS utilizing pure token variables map.
*   **Animation System:** GSAP (GreenSock Animation Platform) or Three.js for precise viewport scrub controls and timeline orchestration.
*   **Linter Policies:** Strict ESLint guidelines configured to guarantee error-free production compiles on deployment pipelines.
*   **Hosting Pipeline:** Fully integrated Next.js automatic engine deployments managed via the Vercel infrastructure.
