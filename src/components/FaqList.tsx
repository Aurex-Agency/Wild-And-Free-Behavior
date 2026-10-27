import Link from "next/link";
import type { Faq } from "@/content/faqs";

/** Native disclosure accordions. Works without JavaScript; opens smoothly where supported. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.id} className="group border-b border-line">
          <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.15rem] font-bold text-ink transition-colors duration-300 marker:hidden hover:text-accent md:text-[1.25rem] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ring-line transition-[background-color,box-shadow] duration-300 group-open:bg-accent group-open:ring-accent"
            >
              <span className="absolute h-[1.5px] w-3.5 bg-current group-open:bg-surface" />
              <span className="absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 group-open:scale-y-0 group-open:bg-surface motion-reduce:transition-none" />
            </span>
          </summary>
          <div className="max-w-[42rem] pb-7 pr-14">
            <p>{f.a}</p>
            {f.link && (
              <p className="mt-4">
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
