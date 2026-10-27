import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { Rhythm } from "@/components/sections/Rhythm";
import { Insurance } from "@/components/sections/Insurance";
import { People } from "@/components/sections/People";
import { Visit } from "@/components/sections/Visit";
import { Guides } from "@/components/sections/Guides";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Marquee } from "@/components/Marquee";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        className="tone-sand"
        items={["Room to grow", "Same time every week", "New Albany, Mississippi", site.insurance.primaryShort, "A free first conversation"]}
      />
      <Approach />
      <Rhythm />
      <GettingStarted />
      <Insurance />
      <People />
      <Visit />
      <Guides />
      <Faq />
      <FinalCta />
    </>
  );
}
