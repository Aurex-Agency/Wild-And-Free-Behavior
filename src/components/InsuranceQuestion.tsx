import { SunMark } from "./brand";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";
import { paymentOptions } from "./screener/copy";
import { intakeMode } from "@/lib/intake";

/** The screener's first question, answerable in place. Each answer opens the screener with it chosen. */
export function InsuranceQuestion({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="relative bg-sand-soft px-6 pb-8 pt-11 md:px-10 md:pb-10 md:pt-14">
      <SunMark className="absolute -top-5 left-6 h-10 w-16 text-forest md:left-10" />
      <p className="subtitle text-[1.75rem] text-forest md:text-[2rem]">check your options</p>
      <Heading className="mt-2 text-[1.5rem] font-bold leading-tight text-cafe">How will you pay for services?</Heading>
      <p className="mt-2 text-[0.9375rem] text-cafe-soft">
        Three short questions. Nothing is booked{intakeMode === "demo" ? ", and this preview doesn't send anything" : ""}.
      </p>
      <ul className="mt-6 grid gap-2.5">
        {paymentOptions.map((o) => (
          <li key={o.value}>
            <ScreenerTrigger payment={o.value} className="option w-full text-left font-semibold leading-snug text-cafe">
              {o.label}
            </ScreenerTrigger>
          </li>
        ))}
      </ul>
    </div>
  );
}
