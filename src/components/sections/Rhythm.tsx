import { InView } from "@/components/InView";
import { Photo } from "@/components/Photo";
import { ArchExpand } from "@/components/motion/ArchExpand";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";

const days = [
  { short: "Mon", name: "Monday", session: true },
  { short: "Tue", name: "Tuesday", session: true },
  { short: "Wed", name: "Wednesday", session: false },
  { short: "Thu", name: "Thursday", session: true },
  { short: "Fri", name: "Friday", session: false },
];

/** The arch opens onto the garden, then the weekly rhythm: the client's real differentiator. */
export function Rhythm() {
  return (
    <>
      <ArchExpand label="Week by week" media={<Photo image="tomato" sizes="100vw" mobileSizes="100vw" />}>
        <div className="wrap pb-14 md:pb-20">
          <p className="subtitle">week by week</p>
          <p className="display display-xl mt-2 max-w-[14ch] text-beige">Steady weeks grow good days</p>
          <p className="lede mt-5 max-w-[34rem] text-beige/90">
            The same days and times each week give your child something steady to build on, the way a garden does best
            with regular care.
          </p>
        </div>
      </ArchExpand>

      <section aria-labelledby="rhythm-title" className="tone-forest relative overflow-hidden py-24 md:py-36">
        <div className="wrap grid gap-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <Reveal variant="fade">
              <p className="subtitle">scheduling</p>
            </Reveal>
            <Words id="rhythm-title" text="Same time every week" className="display display-l mt-3" />
            <Reveal delay={0.1}>
              <p className="lede mt-7">
                Once the assessment is done, we set your child&apos;s days and times together. They stay the same from
                week to week, so your family can plan around them and your child knows what to expect.
              </p>
              <p className="mt-5 text-muted">Every Friday, you&apos;ll get a heads-up with next week&apos;s schedule.</p>
            </Reveal>
          </div>

          <figure className="md:col-span-7 md:self-end">
            <InView activeClass="rhythm-in" className="relative">
              <ul className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-line sm:grid-cols-5">
                {days.map((d, i) => (
                  <li
                    key={d.short}
                    className="grid grid-cols-[5.5rem_1fr] items-center gap-4 border-b border-line px-4 py-3 last:border-b-0 sm:min-h-72 sm:grid-cols-1 sm:grid-rows-[auto_1fr] sm:items-stretch sm:gap-0 sm:border-b-0 sm:border-r sm:px-0 sm:py-0 sm:last:border-r-0"
                  >
                    <span className="eyebrow text-accent sm:border-b sm:border-line sm:px-4 sm:py-4">
                      <abbr title={d.name} className="no-underline">
                        {d.short}
                      </abbr>
                    </span>
                    <span className="relative flex min-h-11 items-center sm:block sm:px-2.5">
                      {d.session && (
                        <span
                          className="rhythm-block flex h-11 w-full items-center rounded-xl bg-sand px-3 text-[0.9375rem] font-bold text-forest-deep sm:absolute sm:inset-x-2.5 sm:top-[24%] sm:h-28 sm:w-auto sm:items-start sm:pt-3"
                          style={{ ["--i" as string]: i }}
                        >
                          Session
                        </span>
                      )}
                      {d.short === "Fri" && (
                        <span className="text-[0.9375rem] font-semibold text-body sm:absolute sm:inset-x-3 sm:bottom-5 sm:leading-snug">
                          Reminder of next week&apos;s times
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </InView>
            <figcaption className="mt-4 text-[0.9375rem] text-muted">
              Example only. Your child&apos;s days and times are set together after the assessment.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
