type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  level?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level;
  return (
    <div className={`${className} ${align === "center" ? "text-center" : ""}`}>
      <div className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</div>
      <Heading className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)] md:text-6xl">
        {title}
      </Heading>
      {description ? (
        <p className={`mt-5 max-w-3xl text-base leading-8 text-[#96a79d] md:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
