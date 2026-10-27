"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/config/site";

/** Main navigation links with the current page marked for assistive tech and sighted users. */
export function NavLinks({ variant, onNavigate }: { variant: "desktop" | "mobile"; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className={variant === "desktop" ? "flex items-center gap-7 xl:gap-9" : ""}>
      {nav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href} className={variant === "mobile" ? "border-b border-cafe/10 last:border-0" : undefined}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={
                variant === "desktop"
                  ? `py-2 text-[0.9875rem] font-semibold underline-offset-[0.4em] hover:text-forest hover:underline ${
                      current ? "text-forest underline decoration-sand decoration-2" : "text-cafe"
                    }`
                  : `flex min-h-13 items-center text-lg font-semibold ${current ? "text-forest underline decoration-sand decoration-2 underline-offset-[0.35em]" : "text-forest"}`
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
