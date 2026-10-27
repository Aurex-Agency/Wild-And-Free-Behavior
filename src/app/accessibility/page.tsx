import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/PageParts";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Wild & Free Behavior's commitment to an accessible website, and how to reach us if something doesn't work for you.",
  alternates: { canonical: "/accessibility" },
  openGraph: { url: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Accessibility", path: "/accessibility" }]}
        subtitle="for everyone"
        title="Accessibility"
        layout="stacked"
        intro={<p>We want every family to be able to use this site, read it, and reach us.</p>}
      />
      <div className="wrap pb-20 md:pb-28">
        <div className="prose">
          <h2>Our goal</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The site was built and tested
            for keyboard use, screen readers, text that can be enlarged, sufficient color contrast, and reduced motion.
          </p>

          <h2>What you can expect</h2>
          <ul>
            <li>Every page and form works with a keyboard, with a visible focus outline.</li>
            <li>Photos have text descriptions. Decorative handwriting repeats something said in the text nearby.</li>
            <li>If your device is set to reduce motion, the site&apos;s animations turn off.</li>
            <li>Phone numbers and addresses are real text you can copy or tap.</li>
          </ul>

          <h2>Known limits</h2>
          <p>
            Some of our guides link to documents from other organizations, such as state agency PDFs. We can&apos;t
            control how accessible those are, but we&apos;re happy to read or explain anything in them.
          </p>

          <h2>If something doesn&apos;t work for you</h2>
          <p>
            Call us at{" "}
            <a href={site.phone.href} data-track="call">
              {site.phone.display}
            </a>
            . Tell us what you were trying to do, and we&apos;ll help you another way and work on fixing the problem.
          </p>
        </div>
      </div>
    </>
  );
}
