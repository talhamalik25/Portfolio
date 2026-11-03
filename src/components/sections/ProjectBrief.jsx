"use client";

import { useEffect, useRef, useState } from "react";
import { projectTypes, budgetRanges } from "@/data/contact";
import { readyEntries } from "@/src/lib/content";
import { briefFields, validateContact } from "@/src/lib/contact";

const initialValues = { name: "", email: "", projectType: "", budget: "", message: "" };
const titles = ["Your details", "Your project", "Tell me more"];
const types = readyEntries(projectTypes, "Project types");
const ranges = readyEntries(budgetRanges, "Budget ranges");
const inputClass = "w-full min-w-0 rounded-xl border border-outline bg-card px-4 py-3 text-base text-content outline-none focus:border-[#EB5002] focus:ring-2 focus:ring-[#EB5002]/30 disabled:opacity-60";
const buttonClass = "min-h-12 rounded-full border border-[#EB5002] bg-[#EB5002] px-6 text-sm font-semibold text-content transition-colors hover:bg-transparent hover:text-content disabled:cursor-wait disabled:opacity-60";

export default function ProjectBrief() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [focusTarget, setFocusTarget] = useState(null);
  const formRef = useRef(null);
  const submitting = useRef(false);

  useEffect(() => {
    if (focusTarget) formRef.current?.querySelector(focusTarget)?.focus();
  }, [step, status, focusTarget]);

  const change = (event) => {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setStatus("idle");
    setFocusTarget(null);
  };
  const showErrors = (nextErrors) => {
    const field = Object.keys(nextErrors)[0];
    setErrors(nextErrors);
    setStep(briefFields.findIndex(fields => fields.includes(field)));
    setStatus("invalid");
    setFocusTarget('[name="' + field + '"]');
  };
  const submit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateContact(values, step < 2 ? step : undefined);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    setErrors({});
    if (step < 2) {
      setStep(step + 1); setStatus("idle"); setFocusTarget("[data-step-heading]"); return;
    }
    submitting.current = true;
    setStatus("loading");
    setFocusTarget(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        const fieldErrors = Object.fromEntries(Object.entries(result.errors || {}).filter(([key]) => briefFields.flat().includes(key)));
        if (Object.keys(fieldErrors).length) { showErrors(fieldErrors); return; }
        throw new Error("Delivery failed");
      }
      setStatus("success"); setValues(initialValues); setFocusTarget("[data-success]");
    } catch { setStatus("error"); }
    finally { submitting.current = false; }
  };
  const props = (name) => ({
    id: "brief-" + name, name, value: values[name], onChange: change,
    disabled: status === "loading", className: inputClass,
    "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? "brief-" + name + "-error" : undefined,
  });
  const field = (name, label, control) => <div key={name}>
    <label htmlFor={"brief-" + name} className="mb-2 block text-sm text-muted">{label}</label>
    {control}
    {errors[name] && <p id={"brief-" + name + "-error"} className="mt-2 text-sm text-accent-ink">{errors[name]}</p>}
  </div>;

  return <form ref={formRef} onSubmit={submit} noValidate aria-label="Project brief" aria-busy={status === "loading"} className="min-w-0 space-y-6">
    {status === "success" ? <div data-success tabIndex={-1} role="status" className="rounded-2xl border border-[#EB5002]/40 p-6">
      <h3 className="mb-3 text-2xl font-semibold">Thanks for the brief.</h3>
      <p className="text-muted">Your message has been sent.</p>
      <button type="button" className={buttonClass + " mt-6"} onClick={() => { setStep(0); setStatus("idle"); setFocusTarget("[data-step-heading]"); }}>Start another brief</button>
    </div> : <>
      <ol aria-label="Brief progress" className="grid grid-cols-3 gap-3">
        {titles.map((title, index) => <li key={title} aria-current={step === index ? "step" : undefined} className={"border-t-2 pt-3 text-xs sm:text-sm " + (index <= step ? "border-[#EB5002] text-content" : "border-outline text-muted")}>
          <span className="mb-1 block text-accent-ink">0{index + 1}</span>{title}
        </li>)}
      </ol>
      <h3 data-step-heading tabIndex={-1} className="text-2xl font-semibold tracking-tight">Step {step + 1} of 3 — {titles[step]}</h3>
      <div className="space-y-5">
        {step === 0 && <>
          {field("name", "Name (required)", <input {...props("name")} autoComplete="name" required maxLength={100} />)}
          {field("email", "Email (required)", <input {...props("email")} type="email" autoComplete="email" required maxLength={254} />)}
        </>}
        {step === 1 && <>
          {field("projectType", "Project type (required)", <select {...props("projectType")} required><option value="">Choose a project type</option>{types.map(type => <option key={type}>{type}</option>)}</select>)}
          {field("budget", "Budget range (optional)", ranges.length
            ? <select {...props("budget")}><option value="">Not decided yet</option>{ranges.map(range => <option key={range}>{range}</option>)}</select>
            : <input {...props("budget")} maxLength={100} placeholder="Your range and currency, if known" />)}
        </>}
        {step === 2 && <>
          <p className="text-sm leading-relaxed text-muted">What would you like to build? Share the purpose, key features and any timing you have in mind.</p>
          {field("message", "Message (required)", <textarea {...props("message")} rows={6} maxLength={5000} required />)}
        </>}
      </div>
      {status === "invalid" && <p role="alert" className="text-sm text-accent-ink">Please check the highlighted fields.</p>}
      {status === "error" && <p role="alert" className="text-sm text-accent-ink">Your brief could not be sent. Your details are still here. Please try again or use the direct email link below.</p>}
      {status === "loading" && <p role="status" className="text-sm text-muted">Sending your brief…</p>}
      <div className="flex flex-wrap gap-3">
        {step > 0 && <button type="button" disabled={status === "loading"} className="min-h-12 rounded-full border border-outline px-6 text-sm hover:border-[#EB5002] disabled:opacity-60" onClick={() => { setStep(step - 1); setStatus("idle"); setErrors({}); setFocusTarget("[data-step-heading]"); }}>Back</button>}
        <button type="submit" disabled={status === "loading"} className={buttonClass}>{status === "loading" ? "Sending…" : step === 2 ? "Send brief" : "Continue"}</button>
      </div>
    </>}
    <p className="break-words text-sm leading-relaxed text-muted">Prefer email? <a href="mailto:mtmaliktalha2005@gmail.com" className="text-content underline decoration-[#EB5002] underline-offset-4 hover:text-accent-ink">mtmaliktalha2005@gmail.com</a></p>
  </form>;
}
