import Link from "next/link";
import type { Faq } from "@/content/faqs";

/** Native disclosure accordions. Works without JavaScript. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-cafe/20">
      {items.map((f) => (
        <details key={f.id} className="group border-b border-cafe/20">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.125rem] font-bold text-cafe marker:hidden hover:text-forest md:text-[1.1875rem] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-forest" />
              <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-forest transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
            </span>
          </summary>
          <div className="max-w-[40rem] pb-6 pr-8">
            <p>{f.a}</p>
            {f.link && (
              <p className="mt-3">
                <Link href={f.link.href} className="link">
                  {f.link.label}
                </Link>
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
