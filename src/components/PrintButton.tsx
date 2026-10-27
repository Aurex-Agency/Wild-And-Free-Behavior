"use client";

export function PrintButton({ children = "Print this story" }: { children?: string }) {
  return (
    <button type="button" className="btn btn-outline no-print" onClick={() => window.print()}>
      {children}
    </button>
  );
}
