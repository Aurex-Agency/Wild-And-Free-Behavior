"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { NavLinks } from "./NavLinks";
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
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
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
        className="btn btn-ghost min-h-11 px-5"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        data-lenis-prevent
        className="tone-deep fixed inset-x-0 bottom-0 top-[4.75rem] z-40 overflow-y-auto"
      >
        <nav aria-label="Main" className="wrap flex min-h-full flex-col pb-10 pt-4">
          <NavLinks variant="mobile" onNavigate={() => setOpen(false)} />
          <div className="mt-auto grid gap-3 pt-10">
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
            <a href={site.phone.href} className="btn btn-ghost nums" data-track="call">
              Call {site.phone.display}
            </a>
            <p className="nums mt-4 text-[0.9375rem] text-muted">
              {site.address.street}, {site.address.city}, {site.address.region}
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}
