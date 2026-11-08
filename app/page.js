import Process from "@/src/components/sections/Process";
import FAQ from "@/src/components/sections/FAQ";
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
        className="skip-link fixed top-4 left-4 z-[110] -translate-y-[200%] rounded-full bg-accent px-4 py-3 font-bold text-background focus:translate-y-0 focus:outline-2 focus:outline-offset-[3px] focus:outline-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Capabilities />
        <SelectedWork />
        <Stack />
        <Journey />
        <Process />
        <FAQ />
        <Contact resumeLink={<ResumeLink />} />
      </main>
      <Footer />
    </>
  );
}
