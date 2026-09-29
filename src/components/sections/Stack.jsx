"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiN8N,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostgresql,
  SiNextdotjs,
  SiVercel,
  SiThreedotjs,
} from "react-icons/si";

const ALL_TOOLS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#68A063" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "n8n", Icon: SiN8N, color: "#EA4B71" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#E6EDF3" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#0070F3" },
  { name: "Vercel", Icon: SiVercel, color: "#F81CE5" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#049EF4" },
];

export default function Stack() {
  const sectionRef = useRef(null);
  const [hasMouse, setHasMouse] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);

  /* -------------------------------------------------------
     MOUSE SPOTLIGHT
  ------------------------------------------------------- */

  useEffect(() => {
    const match = window.matchMedia("(hover: hover) and (pointer: fine)");

    setHasMouse(match.matches);

    const section = sectionRef.current;

    if (!section || !match.matches) return undefined;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        section.style.setProperty("--mouse-x", `${x}px`);
        section.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        section.style.setProperty("--mouse-x", "-1000px");
        section.style.setProperty("--mouse-y", "-1000px");
      });

      setHoveredTool(null);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    section.style.setProperty("--mouse-x", "-1000px");
    section.style.setProperty("--mouse-y", "-1000px");

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);

      cancelAnimationFrame(rafId);
    };
  }, []);

  /* -------------------------------------------------------
     MARQUEE COLUMNS
  ------------------------------------------------------- */

  const columnsData = useMemo(() => {
    const col1 = [
      ALL_TOOLS[0],
      ALL_TOOLS[1],
      ALL_TOOLS[3],
      ALL_TOOLS[5],
      ALL_TOOLS[7],
      ALL_TOOLS[9],
      ALL_TOOLS[11],
      ALL_TOOLS[13],
    ];

    const col2 = [
      ALL_TOOLS[1],
      ALL_TOOLS[2],
      ALL_TOOLS[4],
      ALL_TOOLS[6],
      ALL_TOOLS[8],
      ALL_TOOLS[10],
      ALL_TOOLS[12],
      ALL_TOOLS[0],
    ];

    const col3 = [
      ALL_TOOLS[14],
      ALL_TOOLS[9],
      ALL_TOOLS[6],
      ALL_TOOLS[3],
      ALL_TOOLS[1],
      ALL_TOOLS[11],
      ALL_TOOLS[8],
      ALL_TOOLS[2],
    ];

    const col4 = [
      ALL_TOOLS[11],
      ALL_TOOLS[8],
      ALL_TOOLS[5],
      ALL_TOOLS[2],
      ALL_TOOLS[0],
      ALL_TOOLS[10],
      ALL_TOOLS[7],
      ALL_TOOLS[1],
    ];

    const col5 = [
      ALL_TOOLS[10],
      ALL_TOOLS[7],
      ALL_TOOLS[4],
      ALL_TOOLS[1],
      ALL_TOOLS[14],
      ALL_TOOLS[9],
      ALL_TOOLS[6],
      ALL_TOOLS[0],
    ];

    const col6 = [
      ALL_TOOLS[9],
      ALL_TOOLS[6],
      ALL_TOOLS[3],
      ALL_TOOLS[1],
      ALL_TOOLS[11],
      ALL_TOOLS[8],
      ALL_TOOLS[5],
      ALL_TOOLS[2],
    ];

    return [
      {
        id: "col1",
        items: col1,
        direction: "Up",
        duration: "32s",
        displayClass: "flex",
      },
      {
        id: "col2",
        items: col2,
        direction: "Down",
        duration: "36s",
        displayClass: "flex",
      },
      {
        id: "col3",
        items: col3,
        direction: "Up",
        duration: "30s",
        displayClass: "flex",
      },
      {
        id: "col4",
        items: col4,
        direction: "Down",
        duration: "34s",
        displayClass: "hidden lg:flex",
      },
      {
        id: "col5",
        items: col5,
        direction: "Up",
        duration: "32s",
        displayClass: "hidden xl:flex",
      },
      {
        id: "col6",
        items: col6,
        direction: "Down",
        duration: "38s",
        displayClass: "hidden xl:flex",
      },
    ];
  }, []);

  /* -------------------------------------------------------
     MARQUEE WALL
  ------------------------------------------------------- */

  const MarqueeWall = ({ layerType }) => {
    const isSpotlight = layerType === "spotlight";

    return (
      <div
        className={`
          mx-auto w-full max-w-[1240px]
          px-4 sm:px-6 lg:px-8
          ${
            isSpotlight
              ? "pointer-events-none absolute inset-x-0 h-full"
              : "relative z-10"
          }
        `}
        style={
          isSpotlight
            ? {
                maskImage:
                  "radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), black 0%, rgba(0,0,0,0.7) 58%, transparent 100%)",

                WebkitMaskImage:
                  "radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), black 0%, rgba(0,0,0,0.7) 58%, transparent 100%)",

                zIndex: 15,
                opacity: 0.32,
              }
            : {}
        }
      >
        <div
          className="
            relative flex h-[560px] w-full
            justify-center
            gap-3
            sm:h-[600px]
            sm:gap-4
            lg:gap-6
          "
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",

            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {columnsData.map((col, columnIndex) => (
            <div
              key={`${col.id}-${layerType}`}
              className={`
                group/col
                relative
                flex
                h-full
                flex-col
                overflow-visible

                w-[60px]
                sm:w-[72px]
                lg:w-[88px]

                ${col.displayClass}

                ${
                  columnIndex % 2 === 0
                    ? "translate-y-[-4px]"
                    : "translate-y-[4px]"
                }
              `}
              style={{
                zIndex: 5 + columnIndex,
              }}
            >
              <ul
                className="
                  flex
                  w-full
                  flex-col
                  gap-3
                  will-change-transform
                  sm:gap-4
                  lg:gap-5
                "
                style={{
                  animation: `scroll${col.direction} ${col.duration} linear infinite`,
                }}
              >
                {col.items.concat(col.items).map((tool, index) => {
                  const toolId = `${col.id}-${tool.name}-${index}`;

                  const isHovered = hoveredTool === toolId;
                  const baseOpacity = isSpotlight ? 0.94 : 0.82;

                  return (
                    <li
                      key={toolId}
                      onMouseEnter={() => {
                        if (!isSpotlight) {
                          setHoveredTool(toolId);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!isSpotlight) {
                          setHoveredTool(null);
                        }
                      }}
                      className={`
                        group/card
                        relative
                        flex
                        aspect-square
                        w-full
                        shrink-0
                        items-center
                        justify-center

                        rounded-[1.1rem]

                        border

                        transition-[transform,background-color,border-color,box-shadow,opacity]
                        duration-300
                        ease-out

                        ${
                          isHovered
                            ? "z-[100] scale-[1.05] border-white/20 bg-[#171717]"
                            : "border-white/[0.08] bg-[#0d0d0d]/80"
                        }
                      `}
                      style={{
                        opacity: isHovered ? 1 : baseOpacity,
                        borderColor: isHovered
                          ? `${tool.color}55`
                          : "rgba(255,255,255,0.08)",
                        boxShadow: isHovered
                          ? `0 0 0 1px ${tool.color}22, 0 6px 20px ${tool.color}30`
                          : "0 4px 16px rgba(0,0,0,0.18)",
                        scale: isHovered ? 1.05 : 1,
                      }}
                    >
                      {/* ICON */}
                      <tool.Icon
                        className={`
                          relative
                          z-10

                          h-6
                          w-6

                          sm:h-7
                          sm:w-7

                          lg:h-8
                          lg:w-8

                          transition-transform
                          duration-300
                          ease-out
                        `}
                        style={{
                          color: tool.color,
                          fill: tool.color,
                          scale: isHovered ? 1.1 : 1,
                          filter: isHovered
                            ? `drop-shadow(0 0 8px ${tool.color}66)`
                            : "none",
                        }}
                      />

                      {/* TOOL NAME */}
                      {!isSpotlight && (
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -bottom-9
                            left-1/2
                            z-[120]
                            -translate-x-1/2
                            whitespace-nowrap

                            rounded-full
                            border
                            border-white/10

                            bg-[#171311]/95

                            px-3
                            py-1.5

                            text-[0.6rem]
                            font-semibold
                            tracking-[0.14em]
                            text-white

                            opacity-0

                            shadow-[0_10px_24px_rgba(0,0,0,0.3)]

                            transition-all
                            duration-300

                            group-hover/card:-translate-y-1
                            group-hover/card:opacity-100
                          "
                        >
                          {tool.name}
                        </div>
                      )}

                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------
     SECTION
  ------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-t
        border-white/5
        bg-[#0A0A0A]
        py-24
        lg:py-36
      "
      aria-label="Tech Stack"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",

        backgroundSize: "18px 18px",
      }}
    >
      {/* MARQUEE ANIMATIONS */}

      <style>{`
        @keyframes scrollUp {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          from {
            transform: translateY(-50%);
          }

          to {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          ul {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      {/* CENTER CONTENT */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          flex
          flex-col
          items-center
          justify-center
          bg-[radial-gradient(ellipse_600px_350px_at_center,rgba(0,0,0,0.5)_0%,transparent_65%)]
        "
      >
        <div
          className="
            pointer-events-auto
            flex
            max-w-2xl
            flex-col
            items-center
            justify-center
            px-4
            text-center
          "
        >
          <div className="portfolio-kicker mb-4 text-[#EB5002]">
            TECH STACK
          </div>

          <h2
            className="
              portfolio-display
              mb-6
              text-[2.5rem]
              font-bold
              leading-[0.9]
              tracking-[-0.06em]
              text-white
              sm:text-[3.2rem]
              lg:text-[4rem]
            "
          >
            Tools I Use To{" "}
            <span className="text-[#EB5002]">
              Build.
            </span>
          </h2>

          <p
            className="
              portfolio-copy
              text-[1.05rem]
              text-[#8A8A8A]
            "
          >
            A curated set of technologies and tools I rely
            on to design, build, and ship production-ready
            digital products.
          </p>
        </div>
      </div>

      {/* BACKGROUND MARQUEE */}

      <MarqueeWall layerType="dim" />

      {/* MOUSE FOLLOWING SPOTLIGHT */}

      {hasMouse && (
        <MarqueeWall layerType="spotlight" />
      )}
    </section>
  );
}
