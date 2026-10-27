import { SunMark } from "./brand";

/** A slow band of short truths about the practice. Pauses on hover; still for reduced motion. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10">
          <span className="display whitespace-nowrap text-[2.2rem] leading-none md:text-[3rem]">{t}</span>
          <SunMark className="h-6 w-10 shrink-0 text-ink md:h-8 md:w-12" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee py-6 md:py-8 ${className}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}
