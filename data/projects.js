// One source for published projects. Unfinished fields are filtered at render time.
export const projects = [
  {
    slug: "jewellery-store",
    number: "01",
    title: "Jewellery Store",
    summary:
      "Full-stack jewellery e-commerce (Atelier & Co.) with catalog, cart, checkout and protected admin routes.",
    role: "[FILL: Jewellery Store role]",
    stack: ["Next.js App Router", "MongoDB Atlas", "Mongoose"],
    liveUrl: "https://jewellery-store-eight-theta.vercel.app/",
    githubUrl: "[FILL: Jewellery Store GitHub URL]",
    image: "/images/projects/jewellery-store.jpg",
    alt: "Jewellery Store website screenshot",
    screenshots: [
      {
        src: "/images/projects/jewellery-store.jpg",
        alt: "Jewellery Store desktop homepage",
      },
      {
        src: "/images/projects/jewellery-store-mobile.jpg",
        alt: "Jewellery Store mobile homepage",
      },
    ],
    palette: {
      deep: "#1C1410",
      mid: "#9A3F12",
      accent: "#EB5002",
      wash: "#3E7C86",
    },
    category: "E-commerce",
    status: "live",
    details: {
      overview:
        "A live jewellery storefront titled Atelier & Co., with product listings, collections, cart, checkout, orders and protected admin routes.",
      whatIBuilt: [
        "Product CRUD, login and registration, cart, checkout, orders, and protected admin routes.",
      ],
      challenges: ["[FILL: Jewellery Store challenges]"],
    },
  },
  {
    slug: "sooti-mehal",
    number: "02",
    title: "Sooti Mehal",
    summary:
      "Live fashion brand website for men's and women's Pakistani clothing, with collections and WhatsApp ordering.",
    role: "[FILL: Sooti Mehal role]",
    stack: ["[FILL: Sooti Mehal stack]"],
    liveUrl: "https://sootimehal.com",
    githubUrl: "[FILL: Sooti Mehal GitHub URL]",
    image: "/images/projects/sooti-mehal.jpg",
    alt: "Sooti Mehal website screenshot",
    screenshots: [
      {
        src: "/images/projects/sooti-mehal.jpg",
        alt: "Sooti Mehal desktop homepage",
      },
      {
        src: "/images/projects/sooti-mehal-mobile.jpg",
        alt: "Sooti Mehal mobile homepage",
      },
    ],
    palette: {
      deep: "#1C1410",
      mid: "#9A3F12",
      accent: "#EB5002",
      wash: "#3E7C86",
    },
    category: "Website",
    status: "live",
    details: {
      overview:
        "A live clothing brand site covering men's and women's collections, including lawn, wash-and-wear and seasonal pieces, with product browsing and WhatsApp ordering on the public site.",
      whatIBuilt: ["[FILL: Sooti Mehal what I built]"],
      challenges: ["[FILL: Sooti Mehal challenges]"],
    },
  },
  {
    slug: "malik-enterprices",
    number: "03",
    title: "Malik Enterprices",
    summary:
      "Industrial products website for Malik Enterprices, covering uniforms, protective workwear and quote requests.",
    role: "[FILL: Malik Enterprices role]",
    stack: ["[FILL: Malik Enterprices stack]"],
    liveUrl: "https://malikenterprices.com",
    githubUrl: "[FILL: Malik Enterprices GitHub URL]",
    image: "/images/projects/malik-enterprices.jpg",
    alt: "Malik Enterprices website screenshot",
    screenshots: [
      {
        src: "/images/projects/malik-enterprices.jpg",
        alt: "Malik Enterprices desktop homepage",
      },
      {
        src: "/images/projects/malik-enterprices-mobile.jpg",
        alt: "Malik Enterprices mobile homepage",
      },
    ],
    palette: {
      deep: "#1C1410",
      mid: "#9A3F12",
      accent: "#EB5002",
      wash: "#3E7C86",
    },
    category: "Website",
    status: "live",
    details: {
      overview:
        "A company website for industrial products such as protective coveralls, safety vests and uniforms, with product and quote paths on the live site.",
      whatIBuilt: ["[FILL: Malik Enterprices what I built]"],
      challenges: ["[FILL: Malik Enterprices challenges]"],
    },
  },
  {
    slug: "fitivo",
    number: "04",
    title: "Fitivo",
    category: "CRM",
    summary:
      "Gym management workspace in progress — memberships, attendance and operations in one place.",
    role: "[FILL: Fitivo role]",
    stack: ["Next.js", "JavaScript"],
    liveUrl: "",
    githubUrl: "[FILL: Fitivo GitHub URL]",
    image: "[FILL: Fitivo image]",
    alt: "Fitivo gym management workspace",
    status: "in-progress",
    details: {
      overview:
        "Fitivo is a gym management product I am building. It is in progress, so this page will grow as the interface and features land.",
      whatIBuilt: ["[FILL: Fitivo what I built]"],
      challenges: ["[FILL: Fitivo challenges]"],
    },
    screenshots: [],
    palette: {
      deep: "#1C1410",
      mid: "#9A3F12",
      accent: "#EB5002",
      wash: "#3E7C86",
    },
  },
];

// Preserved draft; not used by public cards or routes.
export const unpublishedProjects = [
  {
    slug: "aktech-product-work",
    number: "04",
    title: "AKTech product work",
    summary: "[FILL: which AKTech projects I can show publicly]",
    role: "Frontend Developer",
    stack: ["[FILL: AKTech product work stack]"],
    liveUrl: "",
    githubUrl: "",
    image: "",
    alt: "AKTech product work website screenshot",
    overview: "[FILL: AKTech product work overview]",
    built: ["[FILL: AKTech product work what I built]"],
    screenshots: [],
    palette: {
      deep: "#1C1410",
      mid: "#9A3F12",
      accent: "#EB5002",
      wash: "#3E7C86",
    },
  },
];
