import { SUN_ARCH, SUN_RAYS, SUN_STROKE } from "@/lib/sun";

// The logo arch is a circle segment: chord 280 units, rise 90.1 units.
const CHORD = SUN_ARCH.x1 - SUN_ARCH.x0;
const RISE = SUN_ARCH.y - (SUN_ARCH.cy - SUN_ARCH.r);
const RADIUS = SUN_ARCH.r / CHORD;

/** Clip path for an arch-topped frame of a given width/height aspect, in bounding-box units. */
function archPath(aspect: number) {
  const cap = (RISE / CHORD) * aspect;
  const ry = RADIUS * aspect;
  return `M0,1 L0,${cap.toFixed(4)} A${RADIUS.toFixed(4)},${ry.toFixed(4)} 0 0 1 1,${cap.toFixed(4)} L1,1 Z`;
}

export const HERO_ASPECT = { desktop: 0.8, mobile: 1.4 } as const;

/** Rendered once in the layout; `.arch-frame` elements reference these by id. */
export function ArchClipPaths() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <clipPath id="arch-desktop" clipPathUnits="objectBoundingBox">
        <path d={archPath(HERO_ASPECT.desktop)} />
      </clipPath>
      <clipPath id="arch-mobile" clipPathUnits="objectBoundingBox">
        <path d={archPath(HERO_ASPECT.mobile)} />
      </clipPath>
      <clipPath id="arch-portrait" clipPathUnits="objectBoundingBox">
        <path d={archPath(0.8)} />
      </clipPath>
    </svg>
  );
}

type Ray = { x1: number; y1: number; x2: number; y2: number };

function shorten(r: Ray, k: number): Ray {
  return { x1: r.x1, y1: r.y1, x2: r.x1 + (r.x2 - r.x1) * k, y2: r.y1 + (r.y2 - r.y1) * k };
}

function bounds(rays: Ray[]) {
  const xs = rays.flatMap((r) => [r.x1, r.x2]);
  const ys = rays.flatMap((r) => [r.y1, r.y2]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys) };
}

/**
 * Rays that sit around an arch-framed photo, like the logo's sun over its arch.
 * Positioned in units of the frame width, so it scales with the photo.
 * `reach` shortens the rays (1 = logo proportions).
 */
export function ArchRays({
  reach,
  className = "",
  animate = false,
  weight = 2,
}: {
  reach: number;
  className?: string;
  animate?: boolean;
  /** Line weight in CSS pixels, independent of size. */
  weight?: number;
}) {
  const rays = SUN_RAYS.map((r) => shorten(r, reach));
  const b = bounds(rays);
  const pad = SUN_STROKE;
  const vbX = b.minX - pad;
  const vbY = b.minY - pad;
  const vbW = b.maxX - b.minX + pad * 2;
  const vbH = SUN_ARCH.y + pad - vbY;
  const archTop = SUN_ARCH.cy - SUN_ARCH.r;

  return (
    <svg
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute overflow-visible ${animate ? "ray-draw" : ""} ${className}`}
      style={{
        left: `${((vbX - SUN_ARCH.x0) / CHORD) * 100}%`,
        width: `${(vbW / CHORD) * 100}%`,
        // Margin percentages resolve against width, which keeps the rays locked to the arch.
        top: 0,
        marginTop: `${((vbY - archTop) / CHORD) * 100}%`,
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="butt"
    >
      {rays.map((r, i) => (
        <path
          key={i}
          d={`M${r.x1} ${r.y1}L${r.x2} ${r.y2}`}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{ ["--i" as string]: Math.abs(i - (rays.length - 1) / 2) }}
        />
      ))}
    </svg>
  );
}

/** Height the rays need above the frame, as a fraction of frame width. */
export function raysHeadroom(reach: number) {
  const rays = SUN_RAYS.map((r) => shorten(r, reach));
  const archTop = SUN_ARCH.cy - SUN_ARCH.r;
  return (archTop - (bounds(rays).minY - SUN_STROKE)) / CHORD;
}

/** The full sun mark (arch plus rays), for small decorative use and the screener meter. */
export function SunMark({
  className = "",
  groups = false,
  title,
}: {
  className?: string;
  groups?: boolean;
  title?: string;
}) {
  const per = Math.ceil(SUN_RAYS.length / 3);
  return (
    <svg
      viewBox="125 115 830 520"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={SUN_STROKE * 2.2}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {SUN_RAYS.map((r, i) => (
        <path key={i} d={`M${r.x1} ${r.y1}L${r.x2} ${r.y2}`} data-group={groups ? Math.floor(i / per) : undefined} />
      ))}
      <path d={SUN_ARCH.d} strokeWidth={SUN_STROKE * 2.5} data-group={groups ? 2 : undefined} />
    </svg>
  );
}

// Irregular spacing echoes stacked logs and pine planks. Values are deliberate, not random.
const COURSES = [0, 7, 13, 22, 28, 37, 44, 50, 59, 66, 72, 81, 88, 94, 100];

/** Horizontal hairlines with uneven spacing, used as dividers and quiet texture. */
export function LogRules({ className = "", lines = COURSES }: { className?: string; lines?: number[] }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {lines.map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/** A short handwritten caption. Decorative: the same idea is always stated in body text nearby. */
export function FieldNote({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p aria-hidden="true" className={`note select-none ${className}`}>
      {children}
    </p>
  );
}
