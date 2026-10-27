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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <GettingStarted />
      <Rhythm />
      <Insurance />
      <People />
      <Visit />
      <Guides />
      <Faq />
      <FinalCta />
    </>
  );
}
