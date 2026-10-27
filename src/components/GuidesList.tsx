import Link from "next/link";
import { articles, type ArticleMeta } from "@/content/articles";
import { Photo } from "./Photo";

/** Editorial list of family guides. Rows lift and the photo opens up on hover. */
export function GuidesList({ items = articles, headingLevel = "h3" }: { items?: ArticleMeta[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-line">
      {items.map((a) => (
        <li key={a.slug} className="border-b border-line">
          <Link
            href={`/resources/${a.slug}`}
            className="group grid grid-cols-[5.5rem_1fr] items-center gap-5 py-6 sm:grid-cols-[9rem_1fr] md:gap-8 md:py-7"
          >
            <span className="block aspect-[1.15] overflow-hidden rounded-2xl">
              <Photo
                image={a.image}
                sizes="9rem"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:transition-none"
              />
            </span>
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 motion-reduce:transition-none">
              <span className="note block text-[1.45rem] leading-[1.2] sm:text-[1.7rem]">{a.subtitle}</span>
              <Heading className="mt-1 text-[1.2rem] font-bold leading-snug text-ink md:text-[1.4rem]">{a.title}</Heading>
              <span className="mt-2 hidden max-w-[42rem] text-[0.9875rem] text-muted sm:block">{a.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
