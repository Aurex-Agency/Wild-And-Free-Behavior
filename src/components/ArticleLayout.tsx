import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/config/site";
import { articles, getArticle, type ArticleMeta } from "@/content/articles";
import { graph, ids } from "@/lib/schema";
import { Breadcrumbs, CtaBand } from "./PageParts";
import { GuidesList } from "./GuidesList";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";
import { Parallax } from "./motion/Parallax";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

export function articleMetadata(slug: string): Metadata {
  const a = getArticle(slug)!;
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/resources/${a.slug}` },
    openGraph: { type: "article", url: `/resources/${a.slug}`, title: a.title, description: a.description },
  };
}

function articleNode(a: ArticleMeta) {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated,
    mainEntityOfPage: `${site.url}/resources/${a.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": ids.clinic },
    ...(a.reviewedBy ? { reviewedBy: { "@id": ids.owner } } : {}),
    image: `${site.url}/opengraph-image.jpg`,
  };
}

/** Long-form guide: dark opening, then a paper reading column for comfort over long text. */
export function ArticleLayout({
  slug,
  children,
  showImage = true,
}: {
  slug: string;
  children: ReactNode;
  showImage?: boolean;
}) {
  const a = getArticle(slug)!;
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article aria-labelledby={`${a.slug}-title`}>
        <header className="tone-deep relative isolate overflow-x-clip pb-14 pt-28 md:pb-20 md:pt-36">
          <div aria-hidden="true" className="sun-glow pointer-events-none absolute -right-[20%] -top-[30%] -z-10 h-[120%] w-[90vw] md:w-[60vw]" />
          <div className="wrap">
            <div className="fade-in" style={d(50)}>
              <Breadcrumbs
                trail={[
                  { name: "Resources", path: "/resources" },
                  { name: a.short, path: `/resources/${a.slug}` },
                ]}
              />
            </div>
            <div className="mt-10 max-w-[60rem] md:mt-14">
              <p className="subtitle fade-in" style={d(120)}>
                {a.subtitle}
              </p>
              <h1 id={`${a.slug}-title`} className="display display-l rise mt-3">
                <span style={d(220)}>{a.title}</span>
              </h1>
              <p className="lede fade-in mt-7 max-w-[42rem]" style={d(480)}>
                {a.description}
              </p>
              <p className="nums fade-in mt-7 text-[0.9375rem] text-muted" style={d(600)}>
                By the {site.name} team · Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time>
                {a.reviewedBy ? ` · Reviewed by ${a.reviewedBy}` : ""}
              </p>
            </div>
          </div>
          {showImage && (
            <div className="wrap no-print mt-14 md:mt-16">
              <div className="fade-in aspect-[2.2] overflow-clip rounded-[1.75rem] md:aspect-[2.8]" style={d(700)}>
                <Parallax range={14}>
                  <Photo image={a.image} priority sizes="(min-width: 90rem) 82rem, 100vw" />
                </Parallax>
              </div>
            </div>
          )}
        </header>

        <div className="tone-paper">
          <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:gap-x-8 md:py-24 lg:gap-x-12">
            <div className="prose md:col-span-8 lg:col-span-7 lg:col-start-2">{children}</div>
            {a.sources.length > 0 && (
              <aside aria-labelledby={`${a.slug}-sources`} className="self-start border-t-2 border-accent pt-6 md:col-span-4 lg:col-span-3 lg:col-start-10">
                <h2 id={`${a.slug}-sources`} className="eyebrow text-accent">
                  Sources
                </h2>
                <ul className="mt-4 grid gap-3 text-[0.9375rem]">
                  {a.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent"
                      >
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.875rem] text-muted">
                  General information for families, not medical, legal, or coverage advice for your child.
                </p>
              </aside>
            )}
          </div>
        </div>
      </article>

      <section aria-labelledby={`${a.slug}-more`} className="no-print tone-deep py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <p className="subtitle">keep reading</p>
            <h2 id={`${a.slug}-more`} className="display display-l mt-3">
              More guides for families
            </h2>
          </div>
          <div className="md:col-span-8">
            <GuidesList items={related} />
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaBand />
      </div>
      <JsonLd data={graph(articleNode(a))} />
    </>
  );
}
