"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { title: string; body: string; helps?: string };

/**
 * Numbered steps on a path that draws itself as the visitor scrolls (a CSS view
 * timeline, see .steps-path). Each number lights up when the line reaches it.
 * Without scroll timelines the path shows fully drawn.
 */
export function StepsPath({ steps, size = "lg" }: { steps: Step[]; size?: "md" | "lg" }) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting) setReached((r) => Math.max(r, i));
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const num = size === "lg" ? "text-[3rem] md:text-[4.5rem]" : "text-[2.4rem] md:text-[3.2rem]";

  return (
    <ol className="steps-path relative">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-line md:left-[2.4rem]" />
      <span
        aria-hidden="true"
        className="steps-path__line absolute bottom-6 left-[1.6rem] top-6 w-px origin-top bg-accent md:left-[2.4rem]"
      />
      {steps.map((s, i) => (
        <li
          key={s.title}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          data-index={i}
          className="relative grid grid-cols-[3.2rem_1fr] gap-x-6 pb-14 last:pb-0 md:grid-cols-[4.8rem_1fr] md:gap-x-10"
        >
          <span
            aria-hidden="true"
            className={`display nums relative z-10 bg-surface text-center leading-none transition-colors duration-700 ${num} ${
              i <= reached ? "text-accent" : "text-ink/25"
            }`}
          >
            {i + 1}
          </span>
          <div className="pt-1 md:pt-3">
            <h3 className="display display-m">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-3 max-w-[36rem]">{s.body}</p>
            {s.helps && (
              <p className="mt-4 border-l-2 border-accent pl-4 text-[0.9875rem] text-muted">
                <span className="font-bold text-ink">What helps: </span>
                {s.helps}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
