"use client";

import { Fragment, type CSSProperties, type Ref } from "react";
import { useInView } from "./useInView";

/**
 * Headline that rises into place word by word as it enters the viewport.
 * The full text stays in the DOM for search engines and screen readers.
 */
export function Words({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  id,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
}) {
  const [ref, shown] = useInView<HTMLElement>(0.4);
  const words = text.split(" ");
  return (
    <Tag ref={ref as Ref<never>} id={id} className={className} aria-label={text} data-words data-shown={shown || undefined}>
      {words.map((w, i) => (
        // The space sits between the word masks: inside an inline-block, a trailing space collapses.
        <Fragment key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span
              data-reveal="word"
              className="inline-block"
              style={{ "--reveal-delay": `${delay + i * 0.06}s` } as CSSProperties}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
