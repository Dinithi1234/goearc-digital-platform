import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingAlignment = "left" | "center";
type HeadingLevel = "h1" | "h2" | "h3";

type GOHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: HeadingAlignment;
  level?: HeadingLevel;
  className?: string;
};

export default function GOHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
  className,
}: GOHeadingProps) {
  const HeadingTag = level;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--goearc-primary)]">
          {eyebrow}
        </p>
      )}

      <HeadingTag
        className={cn(
          "font-semibold tracking-[-0.035em] text-balance",
          level === "h1" &&
            "text-4xl leading-[1.08] sm:text-5xl lg:text-7xl",
          level === "h2" &&
            "text-3xl leading-tight sm:text-4xl lg:text-5xl",
          level === "h3" && "text-2xl leading-tight sm:text-3xl",
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <div
          className={cn(
            "mt-6 max-w-2xl text-base leading-8 text-[var(--goearc-muted)] sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}