import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";
import { pickFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "How to Start ABA Therapy in New Albany, MS",
  description:
    "Every step from your first message to a steady weekly schedule at Wild & Free Behavior: a quick review, a free conversation, the assessment, and your plan.",
  alternates: { canonical: "/getting-started" },
  openGraph: { url: "/getting-started" },
};

const steps: { title: string; body: string; helps?: string }[] = [
  {
    title: "Reach out",
    body: `Use the short form on this site or call ${site.phone.display}. We'll ask a few questions about your child, your insurance, and what's going on. Nothing is booked at this step.`,
    helps: "Your child's age, whether they have an autism diagnosis, and the name of your insurance plan.",
  },
  {
    title: "A quick review",
    body: "Our team looks over what you shared and checks the basics, like insurance. If anything needs a closer look, a person will call you to talk it through.",
  },
  {
    title: "A free conversation",
    body: "You'll talk with Anna Claire and Jimbo about your child, ask your questions, and decide together whether we're the right fit. There's no cost for this conversation.",
    helps: "Your questions, and anything you've learned from your child's evaluation.",
  },
  {
    title: "Assessment",
    body: "We spend time with your child to understand their strengths and needs. Most insurance plans, including BCBS of Mississippi, need to approve the assessment first, and our team helps with that request.",
    helps:
      "Your child's diagnosis report and your insurance card. Some plans also ask for a referral or order for ABA from your child's doctor or psychologist.",
  },
  {
    title: "A plan and a weekly rhythm",
    body: "Our BCBA writes a plan based on the assessment. Once it's approved, we choose days and times together. They stay the same every week, and each Friday you'll get a reminder of the week ahead.",
  },
  {
    title: "Ongoing care",
    body: "Your child's plan is reviewed and updated as they grow, and we keep talking with you about what's working.",
  },
];

const ready = [
  "Your child's autism diagnosis report, if you have one",
  "Your insurance card, front and back",
  "A few notes about your child's typical day",
  "Your questions. All of them.",
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Getting Started", path: "/getting-started" }]}
        subtitle="how it begins"
        title="Getting started with ABA therapy"
        intro={
          <p>
            Starting therapy can feel like a lot. Here is exactly what happens, from your first message to a weekly
            schedule that stays the same.
          </p>
        }
        aside={
          <div className="tone-paper rounded-[1.5rem] p-7 md:p-9">
            <h2 className="display display-m text-ink">What to have ready</h2>
            <ul className="mt-5 grid gap-3">
              {ready.map((r) => (
                <li key={r} className="grid grid-cols-[1.1rem_1fr] gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-[1.5px] w-full bg-accent" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section aria-labelledby="steps-title" className="pb-20 md:pb-28">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 id="steps-title" className="sr-only">
                The steps
              </h2>
              <figure>
                <div className="arch-portrait aspect-[0.8] overflow-hidden">
                  <Photo image="cabinPortrait" sizes="(min-width: 64rem) 26rem, (min-width: 48rem) 40vw, 100vw" />
                </div>
                <figcaption className="nums mt-3 text-[0.9375rem] text-muted">
                  {site.address.street}, {site.address.city}
                </figcaption>
              </figure>
            </div>
          </div>
          <ol className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-line py-9 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr] sm:gap-x-8">
                <span aria-hidden="true" className="display text-[2.6rem] leading-none text-accent sm:text-[3.4rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display display-m text-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-3">{s.body}</p>
                  {s.helps && (
                    <p className="mt-4 border-l-2 border-sand pl-4 text-[0.9875rem]">
                      <span className="font-bold text-body">What helps: </span>
                      {s.helps}
                    </p>
                  )}
                </div>
              </li>
            ))}
            <li className="grid grid-cols-[3.5rem_1fr] gap-x-5 pt-4 sm:grid-cols-[5rem_1fr] sm:gap-x-8">
              <span />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <ScreenerTrigger>Start with step one</ScreenerTrigger>
                <Link href="/resources/your-first-visit" className="link">
                  Preparing your child for the first visit
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="gs-faq-title" className="tone-forest py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="gs-faq-title" subtitle="questions">
              Before you start
            </SectionHeading>
          </div>
          <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqList items={pickFaqs(["commitment", "how-long", "approval", "no-diagnosis", "first-visit"])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
