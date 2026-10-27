import localFont from "next/font/local";
import { Gilda_Display, Raleway } from "next/font/google";

// Brand sheet roles: Rovey for headlines, White Angelica for subtitles, Raleway Medium for body.

// The only Rovey file available is the free release, which has letters and spaces but no
// numerals or punctuation. No metric fallback here, so the next family in the stack
// (Gilda Display) supplies exactly the characters Rovey lacks. A full Rovey file dropped
// in at src/fonts/rovey.woff2 takes over those characters automatically.
export const rovey = localFont({
  src: "../fonts/rovey.woff2",
  variable: "--font-rovey",
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

// Open Font License. Chosen to match Rovey's weight, contrast, and lining figures.
// Only downloaded when a heading contains a character Rovey doesn't have.
export const roveyCompanion = Gilda_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rovey-companion",
  display: "swap",
  preload: false,
});

// Subtitles and handwritten notes.
export const angelica = localFont({
  src: "../fonts/white-angelica.woff2",
  variable: "--font-angelica",
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

// Open Font License. next/font self-hosts the Latin subset; browsers never contact Google.
// "optional" keeps body text from repainting late on slow connections (better LCP and CLS);
// the metric-matched fallback shows only on a slow first visit.
export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "optional",
});
