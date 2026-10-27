"use client";

import type { ReactNode } from "react";
import type { Payment } from "@/lib/screener";
import { openScreener } from "./events";

/** Any button that opens the screener, optionally with a payment answer already chosen. */
export function ScreenerTrigger({
  children,
  className = "btn btn-primary",
  payment,
}: {
  children: ReactNode;
  className?: string;
  payment?: Payment;
}) {
  return (
    <button type="button" aria-haspopup="dialog" className={className} onClick={() => openScreener({ payment })}>
      {children}
    </button>
  );
}
