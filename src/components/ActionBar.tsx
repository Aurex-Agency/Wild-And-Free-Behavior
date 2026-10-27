"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { openScreener } from "./screener/events";

/** Phone-sized call and get-started bar. Appears once the hero's own buttons scroll away. */
export function ActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-actions");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="action-bar fixed inset-x-0 bottom-0 z-40 border-t border-forest-deep bg-forest md:hidden"
      data-visible={visible}
      inert={!visible}
    >
      <div className="grid grid-cols-2 gap-px bg-forest-deep">
        <a href={site.phone.href} className="flex min-h-14 items-center justify-center bg-forest font-semibold text-beige">
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
