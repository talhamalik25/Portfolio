import "./globals.css";
import GlobalLoader from "@/src/components/ui/GlobalLoader";
import ScrollProgress from "@/src/components/ui/ScrollProgress";

export const metadata = {
  title: "Talha Malik — Full-Stack Developer & AI Automation",
  description:
    "I build modern web applications, SaaS products and AI-powered automation systems. Based in Karachi, Pakistan.",
  openGraph: {
    title: "Talha Malik — Full-Stack Developer & AI Automation",
    description:
      "I build modern web applications, SaaS products and AI-powered automation systems. Based in Karachi, Pakistan.",
    type: "website",
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
