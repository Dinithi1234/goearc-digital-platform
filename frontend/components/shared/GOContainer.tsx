import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GOContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function GOContainer({
  children,
  className,
  ...props
}: GOContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}