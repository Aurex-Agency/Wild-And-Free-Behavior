"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `activeClass` the first time the element scrolls into view. Content is visible without JS. */
export function InView({
  children,
  className = "",
  activeClass,
}: {
  children: ReactNode;
  className?: string;
  activeClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${seen ? activeClass : ""}`}>
      {children}
    </div>
  );
}
