import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/PageParts";

export const metadata: Metadata = {
  title: "Website Privacy Policy",
  description: "How Wild & Free Behavior handles information shared through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

// Draft for legal review before launch (see REVIEW-NOTES.md). Keep it accurate to how the site behaves.

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Privacy", path: "/privacy" }]}
        subtitle="your information"
        title="Website privacy policy"
        layout="stacked"
        intro={
          <p className="nums">
            Last updated <time dateTime="2026-10-27">October 27, 2026</time>.
          </p>
        }
      />
      <div className="wrap pb-20 md:pb-28">
        <div className="prose">
          <p>
            This policy explains how {site.legalName} handles information shared through this website. If you or your
            child receive services from us, your health information is also protected under HIPAA, and our Notice of
            Privacy Practices explains how. Ask us for a copy at any time.
          </p>

          <h2>Information you give us</h2>
          <p>
            When you use the &ldquo;Find your next step&rdquo; form, we ask how you plan to pay for services, a few
            questions about your child (age range, diagnosis status, and whether they&apos;ve had ABA before), an optional
            town, your name, your phone number or email, how you&apos;d like us to reach you, and an optional note.
          </p>
          <p>
            We use this only to respond to you and help you get started. It goes to the secure client management service
            our team uses, which has agreed to protect it as HIPAA requires. Please don&apos;t send medical records or
            insurance numbers through the website.
          </p>

          <h2>Information collected automatically</h2>
          <p>
            Like most websites, our hosting provider may record basic technical details such as IP address, browser type,
            and pages requested, to keep the site secure and working. We don&apos;t use advertising trackers, we don&apos;t
            record your visit, and we don&apos;t use cookies to track you. If we count visits to understand which pages
            are useful, we&apos;ll use a tool that doesn&apos;t collect personal or health details.
          </p>

          <h2>How we share information</h2>
          <p>
            We don&apos;t sell or rent your information. We share it only with service providers who help us run our
            practice and are required to protect it, or when the law requires it.
          </p>

          <h2>Children</h2>
          <p>
            This site is meant for parents and caregivers. We don&apos;t knowingly collect information directly from
            children.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Our guides link to government agencies and other organizations. Their privacy practices are their own.
          </p>

          <h2>Your choices</h2>
          <p>
            If you shared information through this site and want it corrected or removed, call us. We&apos;ll do so unless
            we&apos;re required to keep it.
          </p>

          <h2>Contact</h2>
          <p className="nums">
            {site.legalName}
            <br />
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            <a href={site.phone.href} data-track="call">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
