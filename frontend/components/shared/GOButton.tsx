import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "light";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--goearc-primary)] text-white shadow-sm hover:bg-[var(--goearc-primary-dark)]",
  secondary:
    "bg-[var(--goearc-navy)] text-white shadow-sm hover:bg-[#113e62]",
  outline:
    "border border-[var(--goearc-primary)] bg-transparent text-[var(--goearc-primary)] hover:bg-[var(--goearc-sky)]",
  light:
    "bg-white text-[var(--goearc-navy)] shadow-sm hover:bg-[var(--goearc-sky)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-sm sm:text-base",
  lg: "min-h-14 px-7 py-3.5 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(11_141_196_/_0.25)] disabled:pointer-events-none disabled:opacity-50";

type GOButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function GOButton({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: GOButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type GOButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function GOButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GOButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}