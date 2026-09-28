"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = { name: "", email: "", message: "" };

const inputBaseClass =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-[0.95rem] text-white placeholder-[#6E6862] outline-none transition-colors duration-200 focus:border-[#FF6B00]/70 focus:bg-white/[0.06]";

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return undefined;

      gsap.fromTo(
        content,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      return undefined;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // TODO: send to a real endpoint (backend / email service) when ready
    setIsSubmitted(true);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact"
      className="relative overflow-hidden bg-[#0A0A0A] py-24 text-white sm:py-28 lg:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.14),transparent_44%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="mx-auto max-w-[760px] text-center">
          <div className="portfolio-kicker mb-5 inline-flex items-center gap-3 rounded-full border border-[#EB5002]/20 bg-[#EB5002]/10 px-3 py-2 text-[#EB5002]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#EB5002]" aria-hidden="true" />
            Let&apos;s Build Together
          </div>

          <h2 className="portfolio-display mb-6 text-[2.4rem] font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-[3rem] lg:text-[4rem]">
            Ready to build something <span className="text-[#FF6B00]">impactful?</span>
          </h2>

          <p className="portfolio-copy mx-auto max-w-[38rem] text-[1.02rem] text-[#B3ACA4] sm:text-[1.08rem]">
            Have an idea, a roadmap, or a business problem that needs thoughtful execution? I&apos;d love to hear about it.
          </p>

          {isSubmitted ? (
            <div
              role="status"
              className="mx-auto mt-10 max-w-[32rem] rounded-2xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-6 py-8"
            >
              <div className="mb-2 text-2xl" aria-hidden="true">
                ✓
              </div>
              <p className="portfolio-display text-[1.3rem] font-bold tracking-[-0.02em] text-white">
                Message sent!
              </p>
              <p className="mt-2 text-[0.95rem] text-[#B3ACA4]">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="portfolio-button-label mt-5 inline-flex items-center gap-2 text-[#FF6B00] transition-colors duration-200 hover:text-white"
              >
                <span>Send another message</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-10 flex max-w-[32rem] flex-col gap-5 text-left"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#B3ACA4]"
                >
                  Name <span className="text-[#FF6B00]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={[
                    inputBaseClass,
                    errors.name ? "border-[#FF6B00]/70" : "border-white/10",
                  ].join(" ")}
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-2 text-[0.8rem] text-[#FF6B00]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#B3ACA4]"
                >
                  Email <span className="text-[#FF6B00]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={[
                    inputBaseClass,
                    errors.email ? "border-[#FF6B00]/70" : "border-white/10",
                  ].join(" ")}
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-2 text-[0.8rem] text-[#FF6B00]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#B3ACA4]"
                >
                  Message <span className="text-[#B3ACA4]/60">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={values.message}
                  onChange={handleChange}
                  className={[inputBaseClass, "resize-none border-white/10"].join(" ")}
                />
              </div>

              <div className="mt-2 flex justify-center">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#FF6B00] bg-[#FF6B00] px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#0b0b0b] shadow-[0_0_22px_rgba(255,107,0,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <span className="absolute inset-0 -translate-x-[105%] bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                  <span className="relative text-[#0b0b0b] transition-colors duration-400 ease-out group-hover:text-white">
                    Send Message
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative text-base leading-none text-[#0b0b0b] transition-transform duration-400 ease-out group-hover:translate-x-1 group-hover:text-white"
                  >
                    →
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
