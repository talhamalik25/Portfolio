import { testimonials } from "@/data/sections";
import RevealSection from "@/src/components/ui/RevealSection";

export default function Testimonials() {
  if (!testimonials.enabled || !testimonials.items.length) return null;
  return <RevealSection id="testimonials" light>
    <header className="mb-10"><p className="portfolio-kicker mb-4 text-[#EB5002]">TESTIMONIALS</p><h2 id="testimonials-heading" className="portfolio-display text-4xl sm:text-5xl">In Their Words.</h2></header>
    <div data-reveal-group className="grid gap-5 md:grid-cols-2">{testimonials.items.map((item) => <figure data-reveal key={item.name + item.quote} className="rounded-3xl border border-[#1A1613]/10 bg-white p-7">
      <blockquote className="text-xl leading-relaxed">{item.quote}</blockquote><figcaption className="mt-6 text-sm text-[#5D5652]">{item.name}{item.attribution ? " — " + item.attribution : ""}</figcaption>
    </figure>)}</div>
  </RevealSection>;
}
