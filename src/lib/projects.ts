export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  overview: string;
  architecture: string;
  implementation: string;
  stats: ProjectStat[];
  accent: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    "id": 1,
    "role": "Full Stack Developer",
    "stats": [],
    "accent": "#FF6B00",
    "images": [
      "/Projects/talha/sooti-mehal.svg"
    ],
    "hoverImage": "/Projects/talha/sooti-mehal.svg",
    "github": "",
    "liveUrl": "",
    "slug": "sooti-mehal",
    "title": "Sooti Mehal",
    "type": "E-commerce Website",
    "tech": [],
    "description": "An e-commerce website for Sooti Mehal.",
    "overview": "Sooti Mehal is an e-commerce website and part of my web development portfolio.",
    "architecture": "A verified technology breakdown for this project has not yet been provided.",
    "implementation": "Original screenshots and detailed implementation notes will be added when available. The image shown is a labeled placeholder.",
    "myRole": [
      "Web development for Sooti Mehal."
    ]
  },
  {
    "id": 2,
    "role": "Full Stack Developer",
    "stats": [],
    "accent": "#FF6B00",
    "images": [
      "/Projects/talha/malik-enterprises.svg"
    ],
    "hoverImage": "/Projects/talha/malik-enterprises.svg",
    "github": "",
    "liveUrl": "",
    "slug": "malik-enterprises",
    "title": "Malik Enterprises",
    "type": "Business Website",
    "tech": [
      "React"
    ],
    "description": "A responsive business website developed with React.",
    "overview": "Malik Enterprises is a business website built with React, with responsive layouts for desktop, tablet and mobile.",
    "architecture": "React provides the foundation for the business website interface.",
    "implementation": "The project focuses on responsive business website development. Original screenshots and further implementation details have not yet been supplied.",
    "myRole": [
      "Developed the business website using React.",
      "Built responsive layouts for different screen sizes."
    ]
  },
  {
    "id": 3,
    "role": "Full Stack Developer",
    "stats": [],
    "accent": "#FF6B00",
    "images": [
      "/Projects/talha/jewellery-ecommerce.svg"
    ],
    "hoverImage": "/Projects/talha/jewellery-ecommerce.svg",
    "github": "",
    "liveUrl": "https://jewellery-store-eight-theta.vercel.app/",
    "slug": "jewellery-ecommerce",
    "title": "Jewellery E-commerce",
    "type": "Full-stack Web Application",
    "tech": [
      "Next.js",
      "MongoDB",
      "Mongoose"
    ],
    "description": "A full-stack jewellery store with products, authentication, cart, checkout, orders and protected administration.",
    "overview": "A jewellery e-commerce application built with Next.js, MongoDB and Mongoose, connecting the customer shopping experience with product and order management.",
    "architecture": "Next.js powers the application, with MongoDB for persistence and Mongoose for data modeling. Authentication and protected admin functionality separate shopping from store management.",
    "implementation": "The application includes product management, authentication, cart, checkout and order functionality, alongside protected administration.",
    "myRole": [
      "Built product management and shopping workflows.",
      "Implemented authentication and protected admin functionality.",
      "Connected cart, checkout and orders with application data."
    ]
  },
  {
    "id": 4,
    "role": "Full Stack Developer",
    "stats": [],
    "accent": "#FF6B00",
    "images": [
      "/Projects/talha/fitivo.svg"
    ],
    "hoverImage": "/Projects/talha/fitivo.svg",
    "github": "",
    "liveUrl": "",
    "slug": "fitivo",
    "title": "Fitivo (In Progress)",
    "type": "Gym Management SaaS",
    "tech": [
      "Next.js",
      "React",
      "MongoDB"
    ],
    "description": "A multi-tenant gym management SaaS currently in progress.",
    "overview": "Fitivo is an in-progress multi-tenant gym management platform built with Next.js, React and MongoDB. It is not a completed commercial product.",
    "architecture": "The platform is being built around multi-tenancy and role-based dashboards using Next.js, React and MongoDB.",
    "implementation": "The development scope includes members, memberships, attendance, trainers, billing and analytics. Individual module completion has not been specified; these describe the product in development.",
    "myRole": [
      "Developing a multi-tenant gym management application.",
      "Working toward member, membership, attendance and trainer workflows.",
      "Building toward billing, analytics and role-based dashboards."
    ]
  }
];
export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}
