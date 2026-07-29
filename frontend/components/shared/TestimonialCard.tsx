import Image from "next/image";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  className?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialCard({
  quote,
  name,
  location,
  image,
  imageAlt,
  featured = false,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[var(--goearc-border)] p-7 sm:p-8",
        featured
          ? "bg-[var(--goearc-navy)] text-white shadow-xl"
          : "bg-white text-[var(--goearc-text)] shadow-[0_12px_35px_rgb(23_77_120_/_0.07)]",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4",
            featured
              ? "bg-white/10 ring-white/15"
              : "bg-[var(--goearc-sky)] ring-[var(--goearc-sky)]",
          )}
        >
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? `Portrait of ${name}`}
              fill
              sizes="64px"
              className="object-cover object-center"
            />
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                "flex h-full w-full items-center justify-center text-lg font-semibold",
                featured
                  ? "text-white"
                  : "text-[var(--goearc-primary)]",
              )}
            >
              {getInitials(name)}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold">{name}</p>

          <p
            className={cn(
              "mt-1 text-sm",
              featured
                ? "text-white/65"
                : "text-[var(--goearc-muted)]",
            )}
          >
            {location}
          </p>
        </div>
      </div>

      <Quote
        aria-hidden="true"
        className={cn(
          "mt-7",
          featured
            ? "text-white/20"
            : "text-[var(--goearc-primary)]/20",
        )}
        size={42}
      />

      <blockquote
        className={cn(
          "mt-4 text-xl font-medium leading-9 sm:text-2xl",
          featured ? "text-white" : "text-[var(--goearc-navy)]",
        )}
      >
        “{quote}”
      </blockquote>
    </article>
  );
}