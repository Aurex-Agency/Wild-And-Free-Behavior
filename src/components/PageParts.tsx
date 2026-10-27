import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { breadcrumbNode, graph } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { LogRules, SunMark } from "./brand";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList data. Home is implied. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.9375rem] text-cafe-soft">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {full.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-sand">
                  /
                </span>
              )}
              {i === full.length - 1 ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-forest hover:underline">
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
  return <p className={`subtitle text-forest ${className}`}>{children}</p>;
}

/**
 * Interior page opening. Composition varies by page through `aside` and `layout`,
 * so pages don't all share one template.
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
    <section aria-labelledby={titleId} className="relative overflow-x-clip pb-14 pt-6 md:pb-20 md:pt-8">
      <div className="wrap">
        <Breadcrumbs trail={trail} />
        <div
          className={
            layout === "split"
              ? "mt-8 grid items-end gap-10 md:mt-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12"
              : "mt-8 md:mt-12"
          }
        >
          <div className={layout === "split" ? "md:col-span-7 lg:col-span-7" : "max-w-[52rem]"}>
            <Subtitle>{subtitle}</Subtitle>
            <h1 id={titleId} className="display display-hero mt-3 text-forest">
              {title}
            </h1>
            <div className="lede mt-6 max-w-[38rem]">{intro}</div>
          </div>
          {aside && (
            <div className={layout === "split" ? "md:col-span-5 lg:col-start-8" : "mt-10"}>{aside}</div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Section heading pair used inside pages. */
export function SectionHeading({
  id,
  subtitle,
  children,
  tone = "light",
}: {
  id: string;
  subtitle?: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <>
      {subtitle && <p className={`subtitle ${tone === "dark" ? "text-sand" : "text-forest"}`}>{subtitle}</p>}
      <h2 id={id} className={`display display-l ${subtitle ? "mt-3" : ""} ${tone === "dark" ? "" : "text-forest"}`}>
        {children}
      </h2>
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
    <section aria-label={title} className="on-dark relative overflow-hidden bg-forest py-16 text-beige md:py-20">
      <LogRules className="absolute inset-0 h-full w-full text-beige/[0.06]" />
      <div className="wrap relative grid items-center gap-8 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-7">
          <SunMark className="h-9 w-14 text-sand" />
          <h2 className="display display-l mt-4">
            {title}
          </h2>
          <p className="lede mt-4 max-w-[34rem] text-beige/90">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:flex-col md:items-stretch lg:flex-row lg:justify-end">
          <ScreenerTrigger className="btn btn-light">Find your next step</ScreenerTrigger>
          <a
            href={site.phone.href}
            data-track="call"
            className="btn nums text-beige shadow-[inset_0_0_0_1.5px_var(--color-sand)] hover:bg-forest-deep"
          >
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
