import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Capabilities from "@/src/components/sections/Capabilities";
import SelectedWork from "@/src/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Capabilities />
      <SelectedWork />
    </>
  );
}
