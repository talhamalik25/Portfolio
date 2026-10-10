"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "mtmaliktalha2005@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-talha-malik-465957307";
const GITHUB_URL = "https://github.com/talhamalik25";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_VALUES = { name: "", email: "", message: "" };

const inputBaseClass =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base leading-relaxed text-white placeholder-[#8A817B] outline-none transition-colors duration-200 focus:border-[#EB5002] focus:ring-2 focus:ring-[#EB5002]/30";

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message) errors.message = "Please enter a message.";

  return errors;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const submitTimerRef = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );
    }, section);

    return () => {
      context.revert();
      window.clearTimeout(submitTimerRef.current);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setFormState("idle");

    if (errors[name]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState === "loading") return;

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormState("error");
      return;
    }

    setErrors({});
    setFormState("loading");

    const subject = `Portfolio message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\nFrom: ${values.name.trim()}\nEmail: ${values.email.trim()}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    submitTimerRef.current = window.setTimeout(() => {
      try {
        window.location.href = mailtoUrl;
        setFormState("success");
      } catch {
        setFormState("error");
      }
    }, 100);
  };

  const formMessage = {
    loading: "Opening your email app…",
    success: "Your email app should open with a draft. Press Send there to deliver your message.",
    error: Object.keys(errors).length
      ? "Please fix the highlighted fields."
      : "I couldn't open your email app. Use the direct email link below instead.",
  }[formState];

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,80,2,0.1),transparent_44%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="portfolio-kicker mb-4 text-[#EB5002]">GET IN TOUCH</p>
          <h2
            id="contact-heading"
            className="portfolio-display text-[2.35rem] font-bold leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl"
          >
            Have a project or an opportunity? <span className="text-[#EB5002]">Let&apos;s talk.</span>
          </h2>
        </header>

        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/75">
                Name <span className="text-[#EB5002]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={`${inputBaseClass} ${errors.name ? "border-[#EB5002]" : "border-white/10"}`}
              />
              {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-[#FF9A68]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/75">
                Email <span className="text-[#EB5002]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={`${inputBaseClass} ${errors.email ? "border-[#EB5002]" : "border-white/10"}`}
              />
              {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-[#FF9A68]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/75">
                Message <span className="text-[#EB5002]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputBaseClass} resize-y ${errors.message ? "border-[#EB5002]" : "border-white/10"}`}
              />
              {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-[#FF9A68]">{errors.message}</p>}
            </div>

            {formMessage && (
              <p
                role={formState === "error" ? "alert" : "status"}
                aria-live={formState === "error" ? "assertive" : "polite"}
                className={`text-sm leading-relaxed ${formState === "error" ? "text-[#FF9A68]" : "text-white/70"}`}
              >
                {formMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-[#EB5002] bg-[#EB5002] px-6 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5002] disabled:cursor-wait disabled:opacity-70"
            >
              {formState === "loading" ? "Preparing email…" : "Open email app"}
            </button>

            <p className="text-sm leading-relaxed text-white/55">
              Prefer email?{" "}
              <a className="text-white underline decoration-[#EB5002] underline-offset-4 hover:text-[#FF9A68]" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </form>

          <aside className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="portfolio-display text-xl font-semibold text-white">Contact details</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#FF9A68]" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#FF9A68]" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#FF9A68]" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="h-4 w-4 text-[#EB5002]" aria-hidden="true" />
              Karachi, Pakistan
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
