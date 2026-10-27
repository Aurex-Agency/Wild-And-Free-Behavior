"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/config/site";

/** Main navigation links with the current page marked for assistive tech and sighted users. */
export function NavLinks({ variant, onNavigate }: { variant: "desktop" | "mobile"; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className={variant === "desktop" ? "flex items-center gap-8 xl:gap-10" : "grid"}>
      {nav.map((item, i) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href} className={variant === "mobile" ? "border-b border-line" : undefined}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={
                variant === "desktop"
                  ? `nav-link text-[0.98rem] font-semibold transition-colors duration-300 ${current ? "text-ink" : "text-ink/75 hover:text-ink"}`
                  : "group flex min-h-16 items-baseline gap-4 py-3"
              }
            >
              {variant === "mobile" ? (
                <>
                  <span className="nums text-[0.85rem] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`display text-[2.4rem] ${current ? "text-accent" : "text-ink"}`}>{item.label}</span>
                </>
              ) : (
                item.label
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
