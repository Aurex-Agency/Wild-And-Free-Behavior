import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { StepsPath } from "@/components/motion/StepsPath";
import { Words } from "@/components/motion/Words";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

const steps = [
  {
    title: "Reach out",
    body: "Answer a few questions about your child here, or just call us. It takes a couple of minutes and doesn't book anything.",
  },
  {
    title: "A free conversation",
    body: "Sit down with Anna Claire and Jimbo. Bring your questions, and we'll talk honestly about whether we're the right fit.",
  },
  {
    title: "Assessment",
    body: "We spend time with your child to see what they're good at and what's hard right now. If you're using insurance, your plan may need to approve this step first.",
  },
  {
    title: "Your weekly rhythm",
    body: "Together we choose days and times that stay the same each week.",
  },
  {
    title: "Ongoing care",
    body: "We keep checking your child's plan and change it as they grow.",
  },
];

export function GettingStarted() {
  return (
    <section id="getting-started" aria-labelledby="start-title" className="tone-deep relative py-24 md:py-36">
      <div className="wrap grid gap-16 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal variant="fade">
              <p className="subtitle">getting started</p>
            </Reveal>
            <Words id="start-title" text="How it begins" className="display display-xl mt-3" />
            <Reveal delay={0.1}>
              <p className="lede mt-7 max-w-[30rem]">
                Five steps, and nothing gets booked until you&apos;ve met us and we&apos;ve agreed on a plan
                together.
              </p>
            </Reveal>
            <Reveal variant="clip" delay={0.15} className="mt-10 hidden md:block">
              <div className="aspect-[1.3] overflow-clip rounded-[1.5rem]">
                <Parallax range={16}>
                  <Photo image="tableWork" sizes="(min-width: 80rem) 32rem, 40vw" />
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <StepsPath steps={steps} />
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 pl-[4.1rem] md:pl-[6.9rem]">
            <ScreenerTrigger className="btn btn-primary">Start with step one</ScreenerTrigger>
            <Link href="/getting-started" className="link">
              What to expect at each step
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
