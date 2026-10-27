"use client";

import type { CSSProperties } from "react";
import { SUN_ARCH, SUN_RAYS } from "@/lib/sun";
import { useInView } from "./useInView";

/**
 * The logo's sun at large scale. Rays draw outward from the center when the
 * graphic scrolls into view, then the arch settles in. Drawing runs in CSS ([data-sun]).
 */
export function DrawnSun({ className = "", weight = 1.5 }: { className?: string; weight?: number }) {
  const [ref, shown] = useInView<SVGSVGElement>(0.3);
  const mid = (SUN_RAYS.length - 1) / 2;
  return (
    <svg
      ref={ref}
      viewBox="125 115 830 520"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      data-sun
      data-shown={shown || undefined}
    >
      {SUN_RAYS.map((r, i) => (
        <path
          key={i}
          d={`M${r.x1} ${r.y1}L${r.x2} ${r.y2}`}
          pathLength={1}
          strokeWidth={weight}
          vectorEffect="non-scaling-stroke"
          className="sun-ray"
          style={{ "--d": `${150 + Math.abs(i - mid) * 70}ms` } as CSSProperties}
        />
      ))}
      <path d={SUN_ARCH.d} pathLength={1} strokeWidth={weight * 1.3} vectorEffect="non-scaling-stroke" className="sun-arch" />
    </svg>
  );
}
