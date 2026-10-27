import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { articles, getArticle, type ArticleMeta } from "@/content/articles";
import { graph, ids } from "@/lib/schema";
import { Breadcrumbs, CtaBand } from "./PageParts";
import { GuidesList } from "./GuidesList";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

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

/** Long-form guide: narrow reading column, sources listed, related guides, closing invitation. */
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
        <header className="wrap pb-10 pt-6 md:pt-8">
          <Breadcrumbs
            trail={[
              { name: "Resources", path: "/resources" },
              { name: a.short, path: `/resources/${a.slug}` },
            ]}
          />
          <div className="mt-8 max-w-[52rem] md:mt-12">
            <p className="subtitle text-forest">{a.subtitle}</p>
            <h1 id={`${a.slug}-title`} className="display display-l mt-3 text-forest">
              {a.title}
            </h1>
            <p className="lede mt-6 max-w-[40rem]">{a.description}</p>
            <p className="nums mt-6 text-[0.9375rem] text-cafe-soft">
              By the {site.name} team · Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time>
              {a.reviewedBy ? ` · Reviewed by ${a.reviewedBy}` : ""}
            </p>
          </div>
        </header>

        {showImage && (
          <div className="wrap no-print">
            <div className="aspect-[2.2] overflow-hidden md:aspect-[2.8]">
              <Photo image={a.image} priority sizes="(min-width: 82rem) 76rem, 100vw" />
            </div>
          </div>
        )}

        <div className={`wrap grid gap-12 pb-14 md:grid-cols-12 md:gap-x-8 md:pb-20 lg:gap-x-12 ${showImage ? "pt-14 md:pt-20" : "pt-2"}`}>
          <div className="prose md:col-span-8 lg:col-span-7 lg:col-start-2">{children}</div>
          {a.sources.length > 0 && (
            <aside aria-labelledby={`${a.slug}-sources`} className="self-start border-t-2 border-forest pt-6 md:col-span-4 lg:col-span-3 lg:col-start-10">
              <h2 id={`${a.slug}-sources`} className="eyebrow text-forest">
                Sources
              </h2>
              <ul className="mt-4 grid gap-3 text-[0.9375rem]">
                {a.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-cafe underline decoration-cafe/30 underline-offset-4 hover:text-forest hover:decoration-forest">
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.875rem] text-cafe-soft">
                General information for families, not medical, legal, or coverage advice for your child.
              </p>
            </aside>
          )}
        </div>
      </article>

      <section aria-labelledby={`${a.slug}-more`} className="no-print bg-beige-deep py-16 md:py-20">
        <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <p className="subtitle text-forest">keep reading</p>
            <h2 id={`${a.slug}-more`} className="display display-m mt-3 text-forest">
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
