"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Header behavior: transparent over the opening of each page, solid once scrolled,
 * tucked away while reading downward and back as soon as the visitor scrolls up.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 24);
        const menuOpen = document.getElementById("mobile-menu")?.hidden === false;
        if (!menuOpen) setHidden(y > 520 && y > last.current + 4);
        if (y < last.current - 4) setHidden(false);
        last.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-30"
      data-solid={solid}
      data-hidden={hidden}
      onFocusCapture={() => setHidden(false)}
    >
      {children}
    </header>
  );
}
