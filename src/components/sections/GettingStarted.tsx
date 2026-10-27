import Link from "next/link";
import { SUN_ARCH } from "@/lib/sun";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

const steps = [
  {
    title: "Reach out",
    body: "Tell us a little about your child. It takes a couple of minutes, and it doesn't book anything.",
  },
  {
    title: "A free conversation",
    body: "Sit down with Anna Claire and Jimbo to talk about your child, your questions, and whether we're the right fit.",
  },
  {
    title: "Assessment",
    body: "We spend time with your child to understand their strengths and needs. Your insurance may need to approve this step first.",
  },
  {
    title: "Your weekly rhythm",
    body: "Together we choose days and times that stay the same each week.",
  },
  {
    title: "Ongoing care",
    body: "Your child's plan is reviewed and updated as they grow.",
  },
];

/** A small arch with the step number inside, echoing the logo. */
function StepMarker({ n }: { n: number }) {
  return (
    <span className="relative grid h-12 w-12 shrink-0 place-items-end justify-center bg-beige" aria-hidden="true">
      <svg viewBox="420 520 296 110" className="absolute inset-x-0 top-1 h-auto w-full text-forest" fill="none">
        <path d={SUN_ARCH.d} stroke="currentColor" strokeWidth="9" />
      </svg>
      <span className="nums relative pb-1 text-[0.95rem] font-bold text-forest">{n}</span>
    </span>
  );
}

export function GettingStarted() {
  return (
    <section id="getting-started" aria-labelledby="start-title" className="py-20 md:py-28">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-5 lg:col-span-5">
          <p className="subtitle text-forest">getting started</p>
          <h2 id="start-title" className="display display-l mt-4 text-forest">
            How it begins
          </h2>
          <p className="lede mt-6 max-w-[30rem]">
            From the first message to a steady weekly schedule, here is what to expect. Nothing is booked until you and
            our team agree on a plan.
          </p>
          <figure className="mt-10 hidden md:block">
            <div className="aspect-[1.3] overflow-hidden">
              <Photo image="tableWork" sizes="(min-width: 80rem) 30rem, 40vw" />
            </div>
          </figure>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <figure className="mb-10 md:hidden">
            <div className="aspect-[1.25] overflow-hidden">
              <Photo image="tableWork" sizes="100vw" />
            </div>
          </figure>
          <ol className="relative">
            {/* The path: one continuous line connecting the markers */}
            <span aria-hidden="true" className="absolute bottom-10 left-6 top-6 w-px bg-forest/30" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                <StepMarker n={i + 1} />
                <div className="pt-1.5">
                  <h3 className="display display-m text-forest">{s.title}</h3>
                  <p className="mt-2.5 max-w-[34rem]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 pl-[4.25rem] sm:pl-[4.75rem]">
            <ScreenerTrigger>Start with step one</ScreenerTrigger>
            <Link href="/getting-started" className="link">
              What to expect at each step
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
