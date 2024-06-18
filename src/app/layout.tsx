import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { fontSans, fontUrban, fontFigtree, fontHeading } from "@/assets/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dawn",
  description: "Making coding competitive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontFigtree.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
