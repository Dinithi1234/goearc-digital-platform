import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "white" | "sky" | "navy" | "transparent";

type GOSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: SectionTone;
};

const toneStyles: Record<SectionTone, string> = {
  white: "bg-white text-[var(--goearc-text)]",
  sky: "bg-[var(--goearc-pale-blue)] text-[var(--goearc-text)]",
  navy: "bg-[var(--goearc-navy)] text-white",
  transparent: "bg-transparent text-[var(--goearc-text)]",
};

export default function GOSection({
  children,
  tone = "white",
  className,
  ...props
}: GOSectionProps) {
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-24", toneStyles[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}