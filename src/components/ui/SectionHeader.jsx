export default function SectionHeader({
  index,
  kicker,
  title,
  accent,
  lede,
  headingId,
  light = false,
  align = "left",
  children,
}) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto mb-12 max-w-3xl text-center sm:mb-16" : "mb-12 max-w-3xl sm:mb-16"}>
      <p
        className={[
          "portfolio-kicker mb-5 flex items-center gap-3 text-accent",
          centered ? "justify-center" : "",
        ].join(" ")}
      >
        {index ? <span className="tabular-nums">{index}</span> : null}
        {index ? <span aria-hidden="true" className="h-px w-8 bg-accent/50" /> : null}
        <span>{kicker}</span>
      </p>
      <h2
        id={headingId}
        className="portfolio-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-[4.25rem]"
      >
        {title}
        {accent ? <span className="text-accent"> {accent}</span> : null}
      </h2>
      {lede ? (
        <p
          className={[
            "portfolio-copy mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-muted" : "text-white/65",
            centered ? "mx-auto" : "",
          ].join(" ")}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}
