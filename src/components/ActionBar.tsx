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
    <div className="action-bar fixed inset-x-0 bottom-0 z-40 md:hidden" data-visible={visible} inert={!visible}>
      <div className="m-3 grid grid-cols-2 gap-2 rounded-full bg-forest-night/95 p-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6)]">
        <a href={site.phone.href} data-track="call" className="flex min-h-12 items-center justify-center rounded-full font-semibold text-beige">
          Call us
        </a>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => openScreener()}
          className="flex min-h-12 items-center justify-center rounded-full bg-sand font-semibold text-forest-deep"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
