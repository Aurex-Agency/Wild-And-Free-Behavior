// Conversion events with no personal or health details: step numbers and result types only.
// No analytics provider is installed yet. When one is chosen (Plausible, Fathom, or similar
// cookieless tool), forward events in `send` and nowhere else. Never add ad pixels or
// session replay to this site.

export type EventName =
  | "screener_open"
  | "screener_step"
  | "screener_result"
  | "contact_submit"
  | "call_click"
  | "directions_click";

type Props = Record<string, string | number>;

declare global {
  interface Window {
    plausible?: (name: string, options?: { props?: Props }) => void;
  }
}

function send(name: EventName, props?: Props) {
  window.plausible?.(name, props ? { props } : undefined);
}

export function track(name: EventName, props?: Props) {
  if (typeof window === "undefined") return;
  send(name, props);
  // Lets tests and a future provider observe events without touching call sites.
  window.dispatchEvent(new CustomEvent("wfb:track", { detail: { name, props } }));
}
