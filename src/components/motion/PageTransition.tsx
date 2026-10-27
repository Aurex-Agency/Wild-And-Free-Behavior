import { ViewTransition, type ReactNode } from "react";

/**
 * Soft crossfade and rise between pages (browser View Transitions via React).
 * The header is anchored separately so only the content moves.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
