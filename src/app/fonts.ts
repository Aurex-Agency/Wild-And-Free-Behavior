import localFont from "next/font/local";
import { Raleway } from "next/font/google";

// Rovey demo: letters and spaces only (no numerals or punctuation). Display lines must
// stay letters-only until the licensed full version replaces this file.
export const rovey = localFont({
  src: "../fonts/rovey-free-demo.woff2",
  variable: "--font-rovey",
  weight: "400",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Decorative field notes only. Personal-use license until purchased.
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
