"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { useInView } from "./useInView";

type Variant = "rise" | "fade" | "clip";

/**
 * Reveals content once as it scrolls into view. Used sparingly, with different
 * variants per role, so the page doesn't fade-up every block the same way.
 * The states live in CSS ([data-reveal]); without JavaScript everything shows (see layout).
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className,
  as: Tag = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure" | "section" | "p";
  amount?: number;
}) {
  const [ref, shown] = useInView<HTMLElement>(amount);
  return (
    <Tag
      ref={ref as Ref<never>}
      data-reveal={variant}
      data-shown={shown || undefined}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
