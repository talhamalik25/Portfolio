// Stage 6 content. Replace only confirmed facts; testimonials stay off until approved.
export const experience = {
  heading: "Where I'm Building Now.",
  role: "Frontend Developer",
  company: "AKTech",
  companyName: "AKTech Digital Solutions",
  url: "https://aktech.tech",
  period: "[FILL: start month/year] — Present",
  responsibilities: [
    "[FILL: AKTech responsibility 1 — web interfaces I build]",
    "[FILL: AKTech responsibility 2 — my implementation work]",
    "[FILL: AKTech responsibility 3 — how I collaborate]",
  ],
  stack: ["[FILL: tools I use at AKTech]"],
};

export const education = {
  degree: "BS Computer Science",
  university: "Iqra University",
  location: "Karachi",
  status: "Currently in my 2nd semester",
};

// Proposed process copy: edit these descriptions to match your working preferences.
export const processSteps = [
  { title: "Understand", description: "Start with the purpose, audience and requirements. Agree on what the project needs to do." },
  { title: "Design", description: "Plan the structure and interface. Work through the key screens before moving into code." },
  { title: "Build", description: "Build the interface and functionality, then review how they work together across screen sizes." },
  { title: "Launch", description: "Check the details, prepare deployment and agree on the handover." },
];

export const github = {
  profileUrl: "https://github.com/talhamalik25",
  // Verified 2026-11-01: the profile labels these Popular repositories, not Pinned.
  source: "Popular repositories",
  repositories: [
    { name: "QR-Code-Generator", language: "JavaScript", description: "[FILL: QR-Code-Generator description]", url: "https://github.com/talhamalik25/QR-Code-Generator" },
    { name: "Amazon-Clone", language: "HTML", description: "[FILL: Amazon-Clone description]", url: "https://github.com/talhamalik25/Amazon-Clone" },
    { name: "Color-Generator", language: "JavaScript", description: "[FILL: Color-Generator description]", url: "https://github.com/talhamalik25/Color-Generator" },
    { name: "Calculator", language: "HTML", description: "[FILL: Calculator description]", url: "https://github.com/talhamalik25/Calculator" },
    { name: "Digital-clock", language: "CSS", description: "[FILL: Digital-clock description]", url: "https://github.com/talhamalik25/Digital-clock" },
  ],
};

export const faqs = [
  { question: "What do you build?", answer: "I build web interfaces and full-stack web apps, and I am exploring AI automation. My Work section shows examples." },
  { question: "How long does a website take?", answer: "It depends on the scope, content and integrations. [FILL: how I estimate timelines after reviewing a brief]" },
  { question: "Do you work with businesses or only full-time roles?", answer: "I work as a Frontend Developer at AKTech and am open to selected projects. [FILL: the types of business projects I can take on]" },
  { question: "What stack do you use?", answer: "I build with Next.js, React, Node.js and MongoDB, with Tailwind CSS for styling. I use GSAP and Three.js for motion when the project calls for it." },
  { question: "How do we start a project?", answer: "Send me a short outline of what you need through the contact section or by email. [FILL: my preferred next step after an enquiry]" },
];

export const testimonials = {
  enabled: false,
  // Add only real, approved entries: { quote, name, attribution }.
  items: [],
};

export const cta = {
  heading: "Have something in mind?",
  description: "Tell me what you want to build. Let's see if it's a good fit.",
  label: "Let's talk",
  href: "#contact",
};
