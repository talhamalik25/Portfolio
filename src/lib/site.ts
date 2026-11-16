export const site = {
  name: 'Talha Malik',
  firstName: 'TALHA',
  lastName: 'Malik',
  handle: 'talhamalik25',
  brand: 'TALHA',
  email: 'mtmaliktalha2005@gmail.com',
  location: 'Karachi, Pakistan',
  timeZone: 'Asia/Karachi',
  timeZoneLabel: 'PKT',
  url: 'https://portfolio-pi-three-wmfjdk08k5.vercel.app',
  tagline: 'Full Stack Developer crafting fast, expressive web experiences.',
  roles: [
    'Full Stack Developer',
    'React & Next.js Engineer',
    'MERN Stack Developer',
    'Full Stack Web Development',
  ],
} as const;

export const socials = {
  github: { label: 'GitHub', href: 'https://github.com/talhamalik25' },
};
export const socialList: Array<{ label: string; href: string }> = [socials.github];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
