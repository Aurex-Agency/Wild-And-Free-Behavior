import type { CSSProperties, ReactNode } from "react";

/**
 * Moves its child against the scroll for depth, as a CSS scroll-driven animation
 * (see .parallax), so it runs off the main thread and needs no JavaScript. The child
 * is scaled up inside a clipped frame so edges never show. `range` is the total
 * travel in percent of the element's own height. Browsers without scroll timelines,
 * and reduced-motion visitors, get the still photo.
 *
 * Every ancestor must clip with overflow: clip, not hidden: a hidden-overflow box is a
 * scroll container and would capture the view timeline.
 */
export function Parallax({
  children,
  range = 12,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-clip ${className ?? ""}`}>
      <div className="parallax h-full w-full" style={{ "--range": range } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}
