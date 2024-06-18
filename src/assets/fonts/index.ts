import { Inter as FontSans, Urbanist } from "next/font/google";
import { Figtree } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontUrban = Urbanist({
  subsets: ["latin"],
  variable: "--font-urban",
});

export const fontFigtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});
