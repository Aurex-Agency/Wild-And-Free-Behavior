"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type FocusItem = { title: string; body: string; media: ReactNode };

/**
 * An index of focus areas. On wide screens a sticky arch beside the list shows the
 * photo for whichever item sits in the middle of the screen (or is hovered).
 * On phones each item carries its own photo.
 */
export function FocusIndex({ items }: { items: FocusItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-[14svh]">
          <div className="arch-portrait relative aspect-[0.8] overflow-hidden">
            {items.map((it, i) => (
              <div
                key={it.title}
                aria-hidden={i !== active}
                className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.08)" }}
              >
                {it.media}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ol className="md:col-span-7 md:pt-[8svh]">
        {items.map((it, i) => (
          <li
            key={it.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            onMouseEnter={() => setActive(i)}
            className="group grid grid-cols-[3.25rem_1fr] gap-x-5 border-t border-line py-9 last:border-b md:grid-cols-[4.5rem_1fr] md:py-12"
          >
            <span
              aria-hidden="true"
              className={`display nums pt-1 text-[1.6rem] transition-colors duration-500 md:text-[2rem] ${i === active ? "text-accent" : "text-muted"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className={`display display-l transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:origin-left ${
                  i === active ? "text-ink md:translate-x-2" : "text-ink/45"
                }`}
              >
                {it.title}
              </h3>
              <p className="mt-4 max-w-[34rem]">{it.body}</p>
              <div className="mt-6 aspect-[1.4] overflow-hidden rounded-[1.25rem] md:hidden">{it.media}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
