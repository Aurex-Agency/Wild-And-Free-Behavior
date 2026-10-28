"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// How far the visitor has to travel in one direction before the header reacts.
const HIDE_AFTER = 48;
const SHOW_AFTER = 64;

/**
 * Header behavior: transparent over the opening of each page, solid once scrolled,
 * tucked away while reading downward and back when the visitor scrolls up on purpose.
 * Direction is judged on distance traveled, not frame to frame, so the slow frames at
 * the end of a smooth or momentum scroll don't flash the header back in.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let frame = 0;
    let travel = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - last.current;
        last.current = y;
        setSolid(y > 24);
        if (y < 520) {
          travel = 0;
          setHidden(false);
          return;
        }
        if (dy === 0) return;
        if (Math.sign(dy) !== Math.sign(travel)) travel = 0;
        travel += dy;
        const menuOpen = document.getElementById("mobile-menu")?.hidden === false;
        if (travel > HIDE_AFTER && !menuOpen) setHidden(true);
        else if (travel < -SHOW_AFTER) setHidden(false);
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
