import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Talha Malik - Full Stack Developer',
    template: '%s | Talha Malik',
  },
  description:
    'Web developer specializing in React, Next.js, and MERN Stack development. Building fast, scalable, and user-focused web applications.',
  keywords: [
    'Talha Malik',
    'Web Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'JavaScript',
    'MERN Stack',
    'Portfolio',
  ],
  authors: [
    {
      name: 'Talha Malik',
    },
  ],
  creator: 'Talha Malik',
  metadataBase: new URL('https://portfolio-pi-three-wmfjdk08k5.vercel.app'),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/talha-logo.svg',
  },
  openGraph: {
    title: 'Talha Malik - Full Stack Developer',
    description:
      'Portfolio of Talha Malik, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    url: 'https://portfolio-pi-three-wmfjdk08k5.vercel.app',
    siteName: 'Talha Malik Portfolio',
    images: [
      {
        url: '/talha-og.png',
        width: 1200,
        height: 630,
        alt: 'Talha Malik - Full Stack Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talha Malik - Full Stack Developer',
    description:
      'Portfolio of Talha Malik, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    images: ['/talha-og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

