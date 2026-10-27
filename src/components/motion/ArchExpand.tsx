import type { ReactNode } from "react";

/**
 * Signature moment: a photo framed in the logo's arch opens to full-bleed as the
 * visitor scrolls, then the caption settles in. The section is taller than the screen,
 * the stage is sticky, and a CSS view timeline drives every step (see .arch-expand).
 * Browsers without scroll timelines, and reduced-motion visitors, get a full-bleed
 * photo with the caption over it.
 */
export function ArchExpand({
  media,
  children,
  label,
}: {
  media: ReactNode;
  children: ReactNode;
  label: string;
}) {
  return (
    <section aria-label={label} className="arch-expand relative">
      <div className="arch-expand__stage relative overflow-clip">
        <div aria-hidden="true" className="arch-expand__glow sun-glow absolute left-1/2 top-[2%] h-[60svh] w-[90vw] -translate-x-1/2" />
        <div className="arch-expand__clip absolute inset-0">
          <div className="arch-expand__media h-full w-full">{media}</div>
        </div>
        <div className="arch-expand__caption absolute inset-x-0 bottom-0 bg-linear-to-t from-forest-night/90 via-forest-night/45 to-transparent pt-48">
          {children}
        </div>
      </div>
    </section>
  );
}
