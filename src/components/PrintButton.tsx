"use client";

export function PrintButton({ children = "Print the pictures" }: { children?: string }) {
  return (
    <button type="button" className="btn btn-ghost no-print" onClick={() => window.print()}>
      {children}
    </button>
  );
}
