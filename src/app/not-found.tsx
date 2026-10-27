import type { Metadata } from "next";
import Link from "next/link";
import { SunMark } from "@/components/brand";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70dvh] place-content-center py-20 text-center">
      <SunMark className="mx-auto h-12 w-20 text-accent" />
      <p className="subtitle mt-6 text-ink">wrong turn</p>
      <h1 className="display display-l mt-3 text-ink">This path goes nowhere.</h1>
      <p className="lede mx-auto mt-5 max-w-[30rem]">The page you were looking for isn&apos;t here. The porch is this way.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
        <Link href="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link href="/faq" className="btn btn-ghost">
          Common questions
        </Link>
      </div>
    </section>
  );
}
