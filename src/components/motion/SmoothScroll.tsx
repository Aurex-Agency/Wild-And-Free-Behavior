"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Smooth wheel scrolling on desktop only. Touch devices keep native scrolling, and
 * reduced-motion visitors get none. Lenis pauses itself when the page locks scroll
 * (the screener dialog), and nested scroll areas keep working. Loaded on demand, so
 * phones never download it.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis.current = new Lenis({
        autoRaf: true,
        lerp: 0.11,
        // In-page links land below the fixed header via html scroll-padding-top, which Lenis reads.
        anchors: true,
        autoToggle: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
    });
    return () => {
      cancelled = true;
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  // New pages start at the top, without easing across the old page.
  useEffect(() => {
    if (!location.hash) lenis.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
