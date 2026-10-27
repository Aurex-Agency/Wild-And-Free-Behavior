/* eslint-disable @next/next/no-img-element -- static SVG wordmark */
import Link from "next/link";
import { SunMark } from "@/components/brand";

export default function NotFound() {
  return (
    <main id="main" className="wrap grid min-h-dvh place-content-center py-20 text-center">
      <img src="/brand/wordmark.svg" alt="Wild & Free Behavior" width={805} height={380} className="mx-auto h-14 w-auto" />
      <SunMark className="mx-auto mt-14 h-12 w-20 text-sand" />
      <h1 className="display display-l mt-6 text-forest">This path goes nowhere</h1>
      <p className="lede mx-auto mt-5 max-w-[30rem]">The page you were looking for isn&apos;t here. The porch is this way.</p>
      <p className="mt-8">
        <Link href="/" className="btn btn-primary">
          Back to the home page
        </Link>
      </p>
    </main>
  );
}
