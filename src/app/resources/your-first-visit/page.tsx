import type { Metadata } from "next";
import { ArticleLayout, articleMetadata } from "@/components/ArticleLayout";
import { Photo, type ImageKey } from "@/components/Photo";
import { PrintButton } from "@/components/PrintButton";

const slug = "your-first-visit";
export const metadata: Metadata = articleMetadata(slug);

// Captions are written for a parent to read out loud, in their own voice. Each one describes only
// what the photo shows. Portrait photos get a narrower frame so they don't run a full screen tall.
const story: { images?: ImageKey[]; frame?: string; text: string }[] = [
  { images: ["sign"], text: "When we pull in on Doctors Drive, look for the big stone sign with a sun on it. That's how we know we're here." },
  { images: ["cabin"], text: "This is the cabin. It's made of logs, and there are rocking chairs on the front porch." },
  { images: ["portraitAnnaClaire", "portraitJimbo"], text: "This is Anna Claire, and this is Jimbo. They work at the cabin." },
  { images: ["wallScript"], frame: "aspect-[2.2] md:aspect-[2.6]", text: "Inside, the name of the place is up on the wall in big curly letters." },
  { images: ["playroom"], frame: "aspect-[0.8] max-w-[26rem]", text: "There's a room with a little white tent in the corner and toys all over the rug." },
  { images: ["books"], frame: "aspect-[0.8] max-w-[26rem]", text: "There are books lined up along the wall." },
  { images: ["routines"], frame: "aspect-[0.8] max-w-[26rem]", text: "This room has soft cushions to sit on. On the wall there's a song about who's here today, and a chart for the weather." },
  { images: ["instruments"], text: "Sometimes there's music, with a drum and a harmonica." },
  { images: ["communication"], text: "Sometimes you'll sit at a little table and use markers." },
  { images: ["windowRoom"], text: "There's a table by a big window, too." },
  { images: ["heroGardenMobile"], text: "In the summer, there's a garden outside with tomatoes growing." },
  { text: "You'll meet some other grown-ups, too, and they'll tell you their names. When it's time to go, we'll head home." },
];

export default function Page() {
  return (
    <ArticleLayout slug={slug} showImage={false}>
      <p>
        A new place can be a lot for a little one, and it can help to see it first. So we took pictures of the cabin
        for you to look at together before you come. Go through them as many times as your child wants.
      </p>
      <p>
        The words under each photo are there for you to read out loud. Change anything that won&apos;t make sense to
        your child, or skip what doesn&apos;t fit. You can print the whole thing, too.
      </p>
      <p className="note !mt-6 text-[2rem] leading-tight text-ink">
        See you soon,
        <br />
        Anna Claire &amp; Jimbo
      </p>
      <div>
        <PrintButton>Print the pictures</PrintButton>
      </div>

      <ol className="print-story !mt-10 !list-none !pl-0">
        {story.map((s, i) => (
          <li key={i} className="border-t border-line py-7 first:border-t-0 first:pt-0">
            {s.images?.length === 2 ? (
              <div className="grid grid-cols-2 gap-3">
                {s.images.map((image) => (
                  <div key={image} className="aspect-[0.8] overflow-hidden rounded-[1rem]">
                    <Photo image={image} sizes="(min-width: 64rem) 20rem, 50vw" />
                  </div>
                ))}
              </div>
            ) : s.images ? (
              <div className={`${s.frame ?? "aspect-[1.5]"} overflow-hidden rounded-[1rem]`}>
                <Photo image={s.images[0]} sizes="(min-width: 64rem) 40rem, 100vw" />
              </div>
            ) : null}
            <p className="mt-4 text-[1.375rem] font-semibold leading-snug text-body">{s.text}</p>
          </li>
        ))}
      </ol>
    </ArticleLayout>
  );
}
