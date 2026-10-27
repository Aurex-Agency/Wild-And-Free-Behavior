"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has been `amount` visible (an intersection ratio, 0 to 1).
 * Reveals run once, so the observer disconnects after the first hit.
 */
export function useInView<T extends Element>(amount = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return [ref, inView] as const;
}
