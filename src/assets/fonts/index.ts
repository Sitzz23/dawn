import { Urbanist, Figtree } from "next/font/google";
import localFont from "next/font/local";

export const fontUrban = Urbanist({
  subsets: ["latin"],
  variable: "--font-urban",
});

export const fontFigtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const fontHeading = localFont({
  src: "./CalSans SemiBold.woff2",
  variable: "--font-heading",
});
