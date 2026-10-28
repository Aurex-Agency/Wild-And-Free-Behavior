import { SunMark } from "./brand";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";
import { paymentOptions } from "./screener/copy";
import { intakeMode } from "@/lib/intake";

/** The screener's first question, answerable in place. Each answer opens the screener with it chosen. */
export function InsuranceQuestion({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="tone-paper relative rounded-[1.75rem] px-6 pb-8 pt-12 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] md:px-10 md:pb-10 md:pt-14">
      <SunMark className="absolute -top-6 left-7 h-12 w-20 text-sand md:left-10" />
      <p className="note text-[1.6rem] leading-[1.2] sm:text-[1.9rem] md:text-[2.1rem]">check your options</p>
      <Heading className="mt-4 text-[1.5rem] font-bold leading-tight text-ink">How are you planning to pay?</Heading>
      <p className="mt-2 text-[0.9375rem] text-muted">
        Three short questions. Nothing is booked{intakeMode === "demo" ? ", and this preview doesn't send anything" : ""}.
      </p>
      <ul className="mt-6 grid gap-2.5">
        {paymentOptions.map((o) => (
          <li key={o.value}>
            <ScreenerTrigger payment={o.value} className="option w-full text-left font-semibold leading-snug">
              {o.label}
            </ScreenerTrigger>
          </li>
        ))}
      </ul>
    </div>
  );
}
