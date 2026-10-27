import type { Metadata } from "next";
import { ArticleLayout, articleMetadata } from "@/components/ArticleLayout";
import { Photo, type ImageKey } from "@/components/Photo";
import { PrintButton } from "@/components/PrintButton";

const slug = "your-first-visit";
export const metadata: Metadata = articleMetadata(slug);

// Written as a simple first-person picture story. Wording flagged for BCBA review.
const story: { image?: ImageKey; aspect?: string; text: string }[] = [
  { image: "sign", text: "We will drive to Doctors Drive in New Albany. I will look for a big stone sign with a sun on it." },
  { image: "cabin", text: "The building is a log cabin. It has a big front porch with rocking chairs." },
  { image: "wallScript", aspect: "aspect-[2.6]", text: "Inside, the walls are made of wood. The name of the place is written on the wall." },
  { image: "routines", text: "There is a room with soft cushions to sit on. A board on the wall says I'm here today." },
  { image: "communication", text: "Sometimes I will sit at a small table and use paper and markers." },
  { image: "windowRoom", text: "There is a table by a big window." },
  { image: "heroGardenMobile", text: "Outside, there is a garden with plants and tomatoes." },
  { text: "I will meet new grown-ups. They will tell me their names. When it is time to go, I will go home." },
];

export default function Page() {
  return (
    <ArticleLayout slug={slug} showImage={false}>
      <p>
        Some children feel calmer when they know what a new place looks like. Look at these pictures together before
        your first visit, as many times as you like. You can print this page, too.
      </p>
      <p>
        Use your child&apos;s own words. If a word here won&apos;t mean much to your child, change it when you read it
        together.
      </p>
      <div>
        <PrintButton />
      </div>

      <ol className="print-story !mt-10 !list-none !pl-0">
        {story.map((s, i) => (
          <li key={i} className="border-t border-cafe/20 py-6 first:border-t-0 first:pt-0">
            {s.image && (
              <div className={`${s.aspect ?? "aspect-[1.5]"} overflow-hidden`}>
                <Photo image={s.image} sizes="(min-width: 64rem) 40rem, 100vw" />
              </div>
            )}
            <p className="mt-4 text-[1.375rem] font-semibold leading-snug text-cafe">{s.text}</p>
          </li>
        ))}
      </ol>
    </ArticleLayout>
  );
}
