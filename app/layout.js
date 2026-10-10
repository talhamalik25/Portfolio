import "./globals.css";
import GlobalLoader from "@/src/components/ui/GlobalLoader";
import ScrollProgress from "@/src/components/ui/ScrollProgress";

export const metadata = {
  title: "Talha Malik — Full-Stack Developer",
  description:
    "CS student at Iqra University in Karachi, building full-stack web apps with Next.js, Node.js and MongoDB, and focused on polished, premium interfaces.",
  openGraph: {
    title: "Talha Malik — Full-Stack Developer",
    description:
      "CS student at Iqra University in Karachi, building full-stack web apps with Next.js, Node.js and MongoDB, and focused on polished, premium interfaces.",
    type: "website",
    // TODO: Add the image at public/images/og-image.png.
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Malik — Full-Stack Developer",
    description:
      "CS student at Iqra University in Karachi, building full-stack web apps with Next.js, Node.js and MongoDB, and focused on polished, premium interfaces.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GlobalLoader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
