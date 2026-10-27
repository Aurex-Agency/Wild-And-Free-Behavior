import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ActionBar } from "@/components/ActionBar";
import { JsonLd } from "@/components/JsonLd";
import { ScreenerDialog } from "@/components/screener/ScreenerDialog";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { Rhythm } from "@/components/sections/Rhythm";
import { Insurance } from "@/components/sections/Insurance";
import { People } from "@/components/sections/People";
import { Visit } from "@/components/sections/Visit";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Approach />
        <GettingStarted />
        <Rhythm />
        <Insurance />
        <People />
        <Visit />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <ActionBar />
      <ScreenerDialog />
      <JsonLd />
    </>
  );
}
