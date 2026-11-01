import Experience from "@/src/components/sections/Experience";
import Process from "@/src/components/sections/Process";
import GitHub from "@/src/components/sections/GitHub";
import FAQ from "@/src/components/sections/FAQ";
import CTA from "@/src/components/sections/CTA";
import Testimonials from "@/src/components/sections/Testimonials";
import ResumeLink from "@/src/components/ui/ResumeLink";
import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Capabilities from "@/src/components/sections/Capabilities";
import SelectedWork from "@/src/components/sections/SelectedWork";
import Stack from "@/src/components/sections/Stack";
import Journey from "@/src/components/sections/Journey";
import Contact from "@/src/components/sections/Contact";
import Footer from "@/src/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <About />
        <Experience />
        <Capabilities />
        <Process />
        <Stack />
        <GitHub />
        <Journey />
        <FAQ />
        <Testimonials />
        <CTA />
        <Contact resumeLink={<ResumeLink />} />
      </main>
      <Footer />
    </>
  );
}
