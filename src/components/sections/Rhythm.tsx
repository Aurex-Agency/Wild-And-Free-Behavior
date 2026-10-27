import { FieldNote, LogRules } from "@/components/brand";
import { InView } from "@/components/InView";
import { Photo } from "@/components/Photo";

const days = [
  { short: "Mon", name: "Monday", session: true },
  { short: "Tue", name: "Tuesday", session: true },
  { short: "Wed", name: "Wednesday", session: false },
  { short: "Thu", name: "Thursday", session: true },
  { short: "Fri", name: "Friday", session: false },
];

/** The garden pause and the weekly rhythm: consistency is the client's real differentiator. */
export function Rhythm() {
  return (
    <>
      <section aria-labelledby="pause-title" className="relative">
        <div className="aspect-[0.92] w-full overflow-hidden md:aspect-auto md:h-[min(78vh,52rem)]">
          <Photo image="tomato" sizes="100vw" mobileSizes="100vw" />
        </div>
        <div className="wrap relative">
          <div className="-mt-20 max-w-[34rem] bg-beige px-6 pb-2 pt-7 md:-mt-36 md:px-10 md:pt-10">
            <h2 id="pause-title" className="display display-l text-forest">
              Week by week
            </h2>
            <p className="mt-4">
              The same days and times each week give your child something steady to build on, the way a garden does
              best with regular care.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="rhythm-title" className="on-dark relative mt-20 overflow-hidden bg-forest py-20 text-beige md:mt-28 md:py-28">
        <LogRules className="absolute inset-0 h-full w-full text-beige/[0.06]" />
        <div className="wrap relative grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5">
            <p className="subtitle text-sand">scheduling</p>
            <h2 id="rhythm-title" className="display display-l mt-4">
              Same time every week
            </h2>
            <p className="lede mt-6">
              Once the assessment is done, we set your child&apos;s days and times together. They stay the same from
              week to week, so your family can plan around them and your child knows what to expect.
            </p>
            <p className="mt-5 text-beige/85">Every Friday, you&apos;ll get a heads-up with next week&apos;s schedule.</p>
          </div>

          <figure className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <InView activeClass="rhythm-in" className="relative">
              <ul className="grid grid-cols-1 border-t border-beige/25 sm:grid-cols-5 sm:border-l sm:border-t-0">
                {days.map((d, i) => (
                  <li
                    key={d.short}
                    className="grid grid-cols-[5.5rem_1fr] items-center gap-4 border-b border-beige/25 py-3 sm:min-h-64 sm:grid-cols-1 sm:grid-rows-[auto_1fr] sm:items-stretch sm:gap-0 sm:border-b-0 sm:border-r sm:py-0"
                  >
                    <span className="eyebrow sm:border-b sm:border-beige/25 sm:px-3 sm:py-3">
                      <abbr title={d.name} className="no-underline">
                        {d.short}
                      </abbr>
                    </span>
                    <span className="relative flex min-h-11 items-center sm:block sm:px-2">
                      {d.session && (
                        <span
                          className="rhythm-block flex h-11 w-full items-center bg-sand px-3 text-[0.9375rem] font-bold text-cafe sm:absolute sm:inset-x-2 sm:top-[22%] sm:h-24 sm:w-auto sm:items-start sm:pt-2.5"
                          style={{ ["--i" as string]: i }}
                        >
                          Session
                        </span>
                      )}
                      {d.short === "Fri" && (
                        <span className="text-[0.9375rem] font-semibold text-beige/85 sm:absolute sm:inset-x-2 sm:bottom-4 sm:leading-snug">
                          Reminder of next week&apos;s times
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <FieldNote className="pointer-events-none absolute -top-14 right-0 hidden rotate-[-5deg] text-sand sm:block">
                same time every week
              </FieldNote>
            </InView>
            <figcaption className="mt-4 text-[0.9375rem] text-beige/80">
              Example only. Your child&apos;s days and times are set together after the assessment.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
