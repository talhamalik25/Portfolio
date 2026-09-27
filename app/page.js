import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Capabilities from "@/src/components/sections/Capabilities";
import SelectedWork from "@/src/components/sections/SelectedWork";
import Stack from "@/src/components/sections/Stack";
import Journey from "@/src/components/sections/Journey";
import FinalCta from "@/src/components/sections/FinalCta";
import Contact from "@/src/components/sections/Contact";
import Footer from "@/src/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Capabilities />
      <SelectedWork />
      <Stack />
      <Journey />
      <FinalCta />
      <Contact />
      <Footer />
    </>
  );
}
