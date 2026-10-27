import type { Payment } from "@/lib/screener";

export const OPEN_EVENT = "wfb:screener-open";

export type OpenDetail = { payment?: Payment };

export function openScreener(detail: OpenDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN_EVENT, { detail }));
}
