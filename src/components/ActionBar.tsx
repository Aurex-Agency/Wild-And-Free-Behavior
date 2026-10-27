"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { openScreener } from "./screener/events";

/**
 * Phone-sized call and get-started bar. On the home page it appears once the hero's own
 * buttons scroll away; on other pages, after the visitor scrolls past the opening.
 */
export function ActionBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Both branches report the current state right away, so a new page starts correct.
    // Only the home page has hero buttons. Other visited pages may still be in the DOM, hidden.
    const target = pathname === "/" ? document.getElementById("hero-actions") : null;
    if (target) {
      const io = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      io.observe(target);
      return () => io.disconnect();
    }
    const onScroll = () => setVisible(window.scrollY > 520);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div
      className="action-bar fixed inset-x-0 bottom-0 z-40 border-t border-forest-deep bg-forest md:hidden"
      data-visible={visible}
      inert={!visible}
    >
      <div className="grid grid-cols-2 gap-px bg-forest-deep">
        <a href={site.phone.href} data-track="call" className="flex min-h-14 items-center justify-center bg-forest font-semibold text-beige">
          Call us
        </a>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => openScreener()}
          className="flex min-h-14 items-center justify-center bg-beige font-semibold text-forest"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
