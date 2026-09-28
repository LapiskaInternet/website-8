import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  /** use on dark green sections */
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3 md:mb-12",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
          onDark ? "text-banhu-orange-light" : "text-banhu-orange-dark"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-6",
            onDark ? "bg-banhu-orange-light/60" : "bg-banhu-orange/60"
          )}
        />
        {eyebrow}
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-6",
            onDark ? "bg-banhu-orange-light/60" : "bg-banhu-orange/60"
          )}
        />
      </span>
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight text-balance md:text-4xl",
          onDark ? "text-banhu-cream" : "text-banhu-green-dark"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed md:text-lg",
            onDark ? "text-banhu-cream/75" : "text-muted-foreground",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
