import "./globals.css";
import GlobalLoader from "@/src/components/ui/GlobalLoader";
import ScrollProgress from "@/src/components/ui/ScrollProgress";

const siteTitle = "Talha Malik — Full-Stack Developer";
const siteDescription =
  "Full-Stack Developer and Frontend Developer at AKTech. BS CS student at Iqra University, Karachi, building with Next.js, Node.js and MongoDB and exploring AI automation.";

export const metadata = {
  metadataBase: new URL("https://portfolio-pi-three-wmfjdk08k5.vercel.app"),
  applicationName: "Talha Malik Portfolio",
  authors: [{ name: "Talha Malik", url: "https://portfolio-pi-three-wmfjdk08k5.vercel.app" }],
  creator: "Talha Malik",
  title: {
    default: siteTitle,
    template: "%s | Talha Malik",
  },
  description: siteDescription,
  keywords: [
    "Talha Malik",
    "Full-Stack Developer",
    "Frontend Developer",
    "Next.js",
    "Karachi",
    "AKTech",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "Talha Malik",
    url: "/",
    images: [{ url: "/images/profile/heroimg.png", width: 1200, height: 1500, alt: "Portrait of Talha Malik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/profile/heroimg.png"],
  },
  robots: { index: true, follow: true },
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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Talha Malik",
              jobTitle: "Full-Stack Developer",
              url: "https://portfolio-pi-three-wmfjdk08k5.vercel.app",
              email: "mailto:mtmaliktalha2005@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
              sameAs: [
                "https://github.com/talhamalik25",
                "https://www.linkedin.com/in/muhammad-talha-malik-465957307",
              ],
            }),
          }}
        />
        <GlobalLoader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
