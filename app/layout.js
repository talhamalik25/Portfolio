import "./globals.css";
import GlobalLoader from "@/src/components/ui/GlobalLoader";
import ScrollProgress from "@/src/components/ui/ScrollProgress";

export const metadata = {
  metadataBase: new URL("https://portfolio-pi-three-wmfjdk08k5.vercel.app"),
  title: "Talha Malik — Full-Stack Developer | Frontend Developer at AKTech | AI Automation",
  description:
    "Full-Stack Developer and Frontend Developer at AKTech. BS CS student at Iqra University, Karachi, building with Next.js, Node.js and MongoDB and exploring AI automation.",
  openGraph: {
    title: "Talha Malik — Full-Stack Developer | Frontend Developer at AKTech | AI Automation",
    description:
      "Full-Stack Developer and Frontend Developer at AKTech. BS CS student at Iqra University, Karachi, building with Next.js, Node.js and MongoDB and exploring AI automation.",
    type: "website",
    images: ["/images/profile/heroimg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Malik — Full-Stack Developer | Frontend Developer at AKTech | AI Automation",
    description:
      "Full-Stack Developer and Frontend Developer at AKTech. BS CS student at Iqra University, Karachi, building with Next.js, Node.js and MongoDB and exploring AI automation.",
    images: ["/images/profile/heroimg.png"],
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
