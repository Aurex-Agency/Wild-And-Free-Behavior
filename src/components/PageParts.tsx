import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/config/site";
import { breadcrumbNode, graph } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { DrawnSun } from "./motion/DrawnSun";
import { Reveal } from "./motion/Reveal";
import { Words } from "./motion/Words";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";

export type Crumb = { name: string; path: string };

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** Visible breadcrumb trail plus matching BreadcrumbList data. Home is implied. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.9375rem] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {full.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
              )}
              {i === full.length - 1 ? (
                <span aria-current="page" className="text-ink/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="nav-link hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbNode(full))} />
    </>
  );
}

/** White Angelica lead-in above a headline (brand sheet "Subtitle" role). */
export function Subtitle({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`subtitle ${className}`}>{children}</p>;
}

/**
 * Interior page opening: dark ground with sunrise light, the title rising into place
 * (CSS only, so it never waits on JavaScript), and an optional aside.
 */
export function PageHeader({
  trail,
  subtitle,
  title,
  intro,
  aside,
  layout = "split",
}: {
  trail: Crumb[];
  subtitle: string;
  title: ReactNode;
  intro: ReactNode;
  aside?: ReactNode;
  layout?: "split" | "stacked";
}) {
  // Visited pages stay in the DOM (hidden) with Cache Components, so ids must be unique per route.
  const titleId = `title${trail[trail.length - 1].path.replace(/[^a-z0-9]+/gi, "-")}`;
  return (
    <section aria-labelledby={titleId} className="tone-deep relative isolate overflow-x-clip pb-16 pt-28 md:pb-24 md:pt-36">
      <div aria-hidden="true" className="sun-glow pointer-events-none absolute -right-[20%] -top-[30%] -z-10 h-[120%] w-[90vw] md:-right-[8%] md:w-[60vw]" />
      <div className="wrap">
        <div className="fade-in" style={d(50)}>
          <Breadcrumbs trail={trail} />
        </div>
        <div
          className={
            layout === "split"
              ? "mt-10 grid items-end gap-12 md:mt-14 md:grid-cols-12 md:gap-x-10"
              : "mt-10 md:mt-14"
          }
        >
          <div className={layout === "split" ? "md:col-span-7" : "max-w-[60rem]"}>
            <p className="subtitle fade-in" style={d(120)}>
              {subtitle}
            </p>
            <h1 id={titleId} className="display display-hero rise mt-3">
              <span style={d(220)}>{title}</span>
            </h1>
            <div className="lede fade-in mt-7 max-w-[40rem]" style={d(480)}>
              {intro}
            </div>
          </div>
          {aside && (
            <div className={`fade-in ${layout === "split" ? "md:col-span-5" : "mt-12"}`} style={d(600)}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Section heading pair used inside pages. Colors follow the section's tone. */
export function SectionHeading({
  id,
  subtitle,
  children,
  size = "l",
}: {
  id: string;
  subtitle?: string;
  children: string;
  size?: "l" | "xl";
}) {
  return (
    <>
      {subtitle && (
        <Reveal variant="fade">
          <p className="subtitle">{subtitle}</p>
        </Reveal>
      )}
      <Words id={id} text={children} className={`display ${size === "xl" ? "display-xl" : "display-l"} ${subtitle ? "mt-3" : ""}`} />
    </>
  );
}

/** Closing invitation used at the end of interior pages. */
export function CtaBand({
  title = "Start with a conversation",
  body = "Tell us a little about your child, or give us a call. The first conversation is free.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-label={title} className="tone-sand relative isolate overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="sun-glow absolute -left-[10%] top-0 -z-10 h-full w-[70vw]" />
      <div className="wrap grid items-end gap-10 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-7">
          <DrawnSun className="w-40 text-ink md:w-56" weight={1.25} />
          <Words text={title} as="h2" className="display display-l mt-4" />
          <Reveal delay={0.1}>
            <p className="lede mt-5 max-w-[34rem]">{body}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          <ScreenerTrigger className="btn btn-primary">Find your next step</ScreenerTrigger>
          <a href={site.phone.href} data-track="call" className="btn btn-ghost nums">
            Call {site.phone.display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
