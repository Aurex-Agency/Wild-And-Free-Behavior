import Link from "next/link";
import { articles, type ArticleMeta } from "@/content/articles";
import { Photo } from "./Photo";

/** Editorial list of family guides: a photo, a title, one line. Not a card grid. */
export function GuidesList({ items = articles, headingLevel = "h3" }: { items?: ArticleMeta[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-cafe/20">
      {items.map((a) => (
        <li key={a.slug} className="border-b border-cafe/20">
          <Link
            href={`/resources/${a.slug}`}
            className="group grid grid-cols-[5.5rem_1fr] items-center gap-5 py-5 sm:grid-cols-[8rem_1fr] md:gap-8"
          >
            <span className="block aspect-[1.15] overflow-hidden bg-beige-deep">
              <Photo image={a.image} sizes="8rem" imgClassName="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
            </span>
            <span>
              <span className="subtitle block text-[1.6rem] text-forest/80">{a.subtitle}</span>
              <Heading className="mt-1 text-[1.1875rem] font-bold leading-snug text-cafe group-hover:text-forest group-hover:underline md:text-[1.3125rem]">
                {a.title}
              </Heading>
              <span className="mt-1.5 hidden max-w-[42rem] text-[0.9375rem] text-cafe-soft sm:block">{a.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
