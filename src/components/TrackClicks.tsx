"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** One listener for tap-to-call and directions links marked with data-track. */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      const kind = el?.dataset.track;
      if (kind === "call") track("call_click", { page: location.pathname });
      if (kind === "directions") track("directions_click", { page: location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
