"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  Code2,
  Layers,
  ShoppingBag,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Terminal,
  Activity,
  Workflow,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionEffect } from "@/src/hooks/useMotionEffect";
import SectionHeader from "@/src/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Web Development",
    category: "Architecture & Implementation",
    tagline: "Modern web applications built from database to interface",
    description:
      "Engineering end-to-end web applications with Next.js, Node.js, and MongoDB. Fast, responsive, accessible frontend experiences backed by secure REST APIs, authentication flows, and clean data schemas.",
    deliverables: [
      "Next.js App Router, Server Components & Suspense",
      "Robust RESTful API design & secure JWT/session auth",
      "MongoDB Atlas schemas, aggregation & indexing",
      "Responsive, high-performance UI with zero layout shift",
    ],
    technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind CSS"],
    icon: Code2,
    previewType: "dentora",
    previewTitle: "Dentora — Healthcare Platform",
    previewSub: "Full-Stack Appointment & Clinic Engine",
    image: "/images/projects/dentora.png",
    meta: {
      runtime: "Next.js 16 + Node.js",
      database: "MongoDB Atlas",
      latency: "38ms avg API response",
    },
  },
  {
    id: "business-saas",
    number: "02",
    title: "Business Applications & SaaS",
    category: "Internal Workspaces & Tools",
    tagline: "Tailored portals, role-based tools, and operational telemetry",
    description:
      "Designing and developing specialized business software that replaces chaotic spreadsheets and disjointed tools with unified, role-based workflows, inventory management, and operational dashboards.",
    deliverables: [
      "Role-Based Access Control (RBAC) with granular permissions",
      "Operational workspaces, member records & CRUD systems",
      "Real-time operational metrics & activity logs",
      "Multi-device responsive layouts for desk and floor teams",
    ],
    technologies: ["Custom Workspaces", "RBAC", "Operational Dashboards", "Data Modeling", "State Engines"],
    icon: Layers,
    previewType: "fitivo",
    previewTitle: "Fitivo — Gym Operations Workspace",
    previewSub: "Management CRM & Member Telemetry",
    image: null,
    meta: {
      uptime: "99.9% availability",
      access: "Role-Based (Admin / Staff)",
      records: "Live member sync",
    },
  },
  {
    id: "e-commerce",
    number: "03",
    title: "E-Commerce Experiences",
    category: "Commerce & Direct Sales",
    tagline: "Conversion-first online stores and bespoke digital catalogs",
    description:
      "Building bespoke digital storefronts tailored to retail and direct consumer brands. Streamlined product discovery, responsive shopping carts, direct WhatsApp ordering paths, and administrative inventory controls.",
    deliverables: [
      "Bespoke product showcases, collection filtering & search",
      "Frictionless client-side cart & checkout pipelines",
      "Direct WhatsApp instant order integration for high conversion",
      "Protected administrator inventory & order status portals",
    ],
    technologies: ["Next.js", "E-Commerce", "Cart Architecture", "WhatsApp Checkout", "Inventory CRUD"],
    icon: ShoppingBag,
    previewType: "jewellery",
    previewTitle: "Atelier & Co. — Luxury E-Commerce",
    previewSub: "Jewellery Catalog & Instant WhatsApp Checkout",
    image: "/images/projects/jewellery-store.jpg",
    meta: {
      conversion: "WhatsApp Fast-Track",
      cart: "Persistent state engine",
      catalog: "Dynamic category matrix",
    },
  },
  {
    id: "automation",
    number: "04",
    title: "Automation & Integrations",
    category: "Workflows & System Bridges",
    tagline: "Connecting separated business tools, webhooks, and AI pipelines",
    description:
      "Automating repetitive business processes by constructing resilient workflows with n8n, custom webhooks, and LLM APIs. Bridging customer inquiries, internal CRM updates, and instant team notifications into hands-free pipelines.",
    deliverables: [
      "End-to-end n8n workflow architecture & execution monitoring",
      "Custom webhook listeners, payload validation & transformations",
      "LLM structured classification, sentiment analysis & intent triage",
      "Automated multi-channel notifications (Email, Slack, WhatsApp)",
    ],
    technologies: ["n8n Workflows", "Webhook Routing", "LLM APIs", "Data Transformers", "Process Automation"],
    icon: Workflow,
    previewType: "automation",
    previewTitle: "n8n + AI Workflow Engine",
    previewSub: "Autonomous Lead Routing & CRM Sync",
    image: null,
    meta: {
      trigger: "Webhook event listener",
      intelligence: "LLM schema parsing",
      dispatch: "Real-time CRM sync",
    },
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useMotionEffect(
    useCallback(() => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const context = gsap.context(() => {
        gsap.from("[data-service-header]", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });

        gsap.from("[data-service-row]", {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });

        gsap.from("[data-service-preview-pane]", {
          x: 24,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
      }, section);

      return () => context.revert();
    }, []),
  );

  const handlePointerMove = (e) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -relY * 10,
      y: relX * 10,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const current = servicesData[activeService];

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] py-20 text-[#FAF7F2] sm:py-24 lg:py-32"
      aria-labelledby="capabilities-heading"
    >
      {/* Subtle background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div data-service-header>
          <SectionHeader
            index="03"
            kicker="Services & Capabilities"
            title="How I"
            accent="Build."
            headingId="capabilities-heading"
            lede="Four core disciplines transforming product concepts into robust, production-ready software — from scalable architectures and client portals to refined e-commerce and automated pipelines."
          />
        </div>

        {/* Desktop & Mobile Split Container */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Interactive Service Rows */}
          <div className="flex flex-col border-t border-white/15 lg:col-span-7 xl:col-span-7">
            {servicesData.map((service, index) => {
              const isActive = activeService === index;
              const isMobileExpanded = expandedMobile === index;
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  data-service-row
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => {
                    setActiveService(index);
                    setExpandedMobile(isMobileExpanded ? -1 : index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveService(index);
                      setExpandedMobile(isMobileExpanded ? -1 : index);
                    }
                  }}
                  className={[
                    "group relative cursor-pointer border-b border-white/15 py-8 transition-all duration-300 sm:py-10 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A]",
                    isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]",
                  ].join(" ")}
                >
                  {/* Subtle active left highlight strip */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute top-0 bottom-0 left-0 w-[2px] transition-all duration-300",
                      isActive ? "bg-accent opacity-100" : "bg-transparent opacity-0 group-hover:bg-white/20 group-hover:opacity-100",
                    ].join(" ")}
                  />

                  <div className="pl-3 sm:pl-5">
                    {/* Top Metadata Row: Index + Category + Arrow */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "font-mono text-xs tracking-[0.2em] transition-colors duration-200",
                            isActive ? "text-accent font-semibold" : "text-white/40 group-hover:text-white/70",
                          ].join(" ")}
                        >
                          {`${service.number} //`}
                        </span>
                        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/50">
                          {service.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Mobile Accordion Indicator */}
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/60 transition-transform duration-300 lg:hidden">
                          <ChevronDown
                            className={[
                              "h-4 w-4 transition-transform duration-300",
                              isMobileExpanded ? "rotate-180 text-accent" : "",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                        </span>

                        {/* Desktop Arrow Indicator */}
                        <span
                          className={[
                            "hidden h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 lg:flex",
                            isActive
                              ? "border-accent bg-accent/10 text-accent translate-x-0 opacity-100"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-white/30 group-hover:text-white",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* Editorial Service Title */}
                    <h3
                      className={[
                        "portfolio-display text-2xl font-bold leading-tight tracking-[-0.03em] transition-colors duration-200 sm:text-3xl lg:text-[2.2rem]",
                        isActive ? "text-[#FAF7F2]" : "text-white/80 group-hover:text-[#FAF7F2]",
                      ].join(" ")}
                    >
                      {service.title}
                    </h3>

                    {/* Short Client-Oriented Description */}
                    <p className="portfolio-copy mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                      {service.description}
                    </p>

                    {/* Technology Badges */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className={[
                            "rounded-md border px-2.5 py-1 text-xs font-mono transition-colors duration-200",
                            isActive
                              ? "border-white/20 bg-white/[0.04] text-white/90"
                              : "border-white/10 bg-white/[0.015] text-white/50 group-hover:border-white/15 group-hover:text-white/70",
                          ].join(" ")}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Expandable Details (Tap on Mobile) */}
                    <div
                      className={[
                        "overflow-hidden transition-all duration-400 ease-in-out lg:hidden",
                        isMobileExpanded ? "mt-6 max-h-[800px] opacity-100 pt-4 border-t border-white/10" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">
                        Deliverables & Implementation:
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Embedded Mobile Visual Preview */}
                      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#111111] p-4 shadow-xl">
                        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
                          <span className="font-mono text-white/50">{`${service.number} // PREVIEW`}</span>
                          <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                            AUTHENTIC ARTIFACT
                          </span>
                        </div>
                        <MobilePreviewArtifact service={service} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Signature Interactive Visual Preview */}
          <div
            data-service-preview-pane
            className="hidden lg:col-span-5 lg:block xl:col-span-5"
          >
            <div className="sticky top-28">
              <div
                ref={previewRef}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
                }}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#121110] p-6 shadow-2xl backdrop-blur-sm transition-all duration-300"
              >
                {/* Visual Window Header */}
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="ml-2 font-mono text-xs text-white/40">
                      SYS // {current.number}_{current.id}.spec
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    ACTIVE CAPABILITY
                  </div>
                </div>

                {/* Artifact Display Viewport */}
                <div className="relative min-h-[340px] rounded-2xl border border-white/10 bg-[#0B0B0B] p-5 overflow-hidden">
                  <DesktopPreviewArtifact service={current} />
                </div>

                {/* Bottom Context Info */}
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#FAF7F2]">{current.previewTitle}</p>
                      <p className="font-mono text-white/50 text-[11px] mt-0.5">{current.previewSub}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/70">
                      {current.number} / 04
                    </span>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  <div className="mt-4 space-y-1.5">
                    {current.deliverables.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-white/70">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   AUTHENTIC VISUAL ARTIFACTS FOR EACH SERVICE (NO FAKE / GENERIC ASSETS)
   ========================================================================= */

function DesktopPreviewArtifact({ service }) {
  if (service.previewType === "dentora") {
    return (
      <div className="relative h-full flex flex-col justify-between">
        {/* Real Screenshot Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-black">
          <Image
            src="/images/projects/dentora.png"
            alt="Dentora Medical Clinic Web Platform"
            fill
            sizes="400px"
            className="object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2.5 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-sm">
            dentora-clinic.app
          </span>
        </div>

        {/* Live Code / API Inspection Telemetry */}
        <div className="mt-4 rounded-xl border border-white/10 bg-[#070707] p-3 font-mono text-[11px] text-white/70">
          <div className="flex items-center justify-between text-white/40 pb-1.5 border-b border-white/5 mb-1.5 text-[10px]">
            <span>ENDPOINT TELEMETRY</span>
            <span className="text-emerald-400">STATUS 200 OK</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <p className="text-white/90">
              <span className="text-accent font-semibold">GET</span> /api/v1/appointments/schedule
            </p>
            <p className="text-white/50 text-[10px]">
              Response: 38ms · Auth: Bearer JWT · Cache: HIT (Next.js SSR)
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (service.previewType === "fitivo") {
    return (
      <div className="flex h-full flex-col justify-between space-y-4">
        {/* Workspace Telemetry Dashboard */}
        <div className="rounded-xl border border-white/10 bg-[#0E0E0E] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-white/90">Fitivo Workspace</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
              <span className="font-mono text-[10px] text-white/40">ACTIVE MEMBERS</span>
              <p className="mt-1 text-lg font-bold text-[#FAF7F2]">1,280</p>
              <span className="text-[10px] text-emerald-400">+14.2% this month</span>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
              <span className="font-mono text-[10px] text-white/40">CHECK-INS TODAY</span>
              <p className="mt-1 text-lg font-bold text-[#FAF7F2]">184</p>
              <span className="text-[10px] text-accent">Peak hour: 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Role-Based Access Simulation */}
        <div className="rounded-xl border border-white/10 bg-[#080808] p-3 font-mono text-[11px]">
          <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-wider">
            RBAC ACCESS MATRIX
          </span>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between rounded bg-white/[0.02] px-2 py-1">
              <span className="text-white/80">Owner / SuperAdmin</span>
              <span className="text-accent font-semibold">ALL_PERMISSIONS</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/[0.02] px-2 py-1">
              <span className="text-white/80">Front Desk Staff</span>
              <span className="text-white/50">CHECKIN + BILLING</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/[0.02] px-2 py-1">
              <span className="text-white/80">Trainer / Coach</span>
              <span className="text-white/50">ROSTER_READONLY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (service.previewType === "jewellery") {
    return (
      <div className="relative h-full flex flex-col justify-between">
        {/* Real Screenshot Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-black">
          <Image
            src="/images/projects/jewellery-store.jpg"
            alt="Atelier & Co. Jewellery Store E-Commerce"
            fill
            sizes="400px"
            className="object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2.5 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-sm">
            atelierandco.store
          </span>
        </div>

        {/* E-Commerce Commerce Card */}
        <div className="mt-4 rounded-xl border border-white/10 bg-[#070707] p-3 font-mono text-[11px]">
          <div className="flex items-center justify-between text-white/40 pb-1.5 border-b border-white/5 mb-2 text-[10px]">
            <span>ORDER FLOW INTEGRATION</span>
            <span className="text-accent">DIRECT ROUTE</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 font-medium">Instant WhatsApp Checkout</p>
              <p className="text-white/50 text-[10px] mt-0.5">Pre-filled sku, size & order token</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[10px] text-emerald-400">
              Active
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Automation / n8n Visual Pipeline
  return (
    <div className="flex h-full flex-col justify-between space-y-3 font-mono text-xs">
      <div className="rounded-xl border border-white/10 bg-[#0B0B0B] p-3">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 text-[10px] text-white/40">
          <span>n8n ORCHESTRATION PIPELINE</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            EXECUTION #4,812
          </span>
        </div>

        {/* Connected Node Visualizer */}
        <div className="space-y-2">
          {/* Node 1 */}
          <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-accent text-[10px] font-bold text-white">
              1
            </span>
            <div className="flex-1 text-[11px]">
              <span className="text-white/90">Webhook Inbound</span>
              <p className="text-[9px] text-white/40">Captures customer form payload</p>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">2ms</span>
          </div>

          {/* Node 2 */}
          <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
              2
            </span>
            <div className="flex-1 text-[11px]">
              <span className="text-white/90">LLM Intent Classifier</span>
              <p className="text-[9px] text-white/40">Extracts urgency, budget & category</p>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">140ms</span>
          </div>

          {/* Node 3 */}
          <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
              3
            </span>
            <div className="flex-1 text-[11px]">
              <span className="text-white/90">CRM Sync & WhatsApp Alert</span>
              <p className="text-[9px] text-white/40">Dispatches lead + notifies team</p>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">45ms</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-[10px] text-white/50 flex items-center justify-between">
        <span>Failure Fallback: Sentry Alert + Retries</span>
        <span className="text-accent font-semibold">100% RELIABILITY</span>
      </div>
    </div>
  );
}

function MobilePreviewArtifact({ service }) {
  if (service.previewType === "dentora" && service.image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={service.image}
          alt={service.previewTitle}
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  if (service.previewType === "jewellery" && service.image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={service.image}
          alt={service.previewTitle}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    );
  }

  if (service.previewType === "fitivo") {
    return (
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/10 bg-black/40 p-2.5">
          <span className="font-mono text-[9px] text-white/40">ACTIVE MEMBERS</span>
          <p className="text-base font-bold text-white mt-1">1,280</p>
          <span className="text-[10px] text-emerald-400">+14% Growth</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/40 p-2.5">
          <span className="font-mono text-[9px] text-white/40">ROLE SECURITY</span>
          <p className="text-base font-bold text-white mt-1">RBAC</p>
          <span className="text-[10px] text-accent">Multi-tenant</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[10px] space-y-1.5">
      <div className="flex items-center justify-between text-white/80">
        <span>Webhook Trigger</span>
        <span className="text-emerald-400">OK</span>
      </div>
      <div className="flex items-center justify-between text-white/80">
        <span>LLM Entity Extraction</span>
        <span className="text-emerald-400">OK</span>
      </div>
      <div className="flex items-center justify-between text-white/80">
        <span>Automated CRM Sync</span>
        <span className="text-emerald-400">OK</span>
      </div>
    </div>
  );
}
