import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  numeral,
  title,
  body,
  align = "center",
  className,
}: {
  eyebrow?: string;
  numeral?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-burgundy",
            align === "center" && "justify-center",
          )}
        >
          {numeral ? (
            <span className="text-taupe" aria-hidden="true">
              {numeral}
            </span>
          ) : null}
          {numeral ? (
            <span className="inline-block h-px w-6 bg-gold" aria-hidden="true" />
          ) : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif mt-3 text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.12] text-forest">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-[15px] leading-7 text-ink-soft">{body}</p>
      ) : null}
    </div>
  );
}
