"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { openScreener } from "./screener/events";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="btn min-h-11 px-3 text-forest"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-y border-cafe/15 bg-beige shadow-[0_24px_40px_-24px_rgb(6_43_43/0.35)]"
      >
        <nav aria-label="Main" className="wrap py-3">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-cafe/10 last:border-0">
                <a href={item.href} onClick={() => setOpen(false)} className="flex min-h-13 items-center text-lg font-semibold text-forest">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid gap-2 pb-3 pt-4 xs:grid-cols-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setOpen(false);
                openScreener();
              }}
            >
              Get started
            </button>
            <a href={site.phone.href} className="btn btn-outline nums">
              Call {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
