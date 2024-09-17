import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/themeProvider";
import { fontUrban, fontFigtree, fontHeading } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
// import { SocketProvider } from "@/lib/socketProvider";
import { ConvexClientProvider } from "@/lib/clerkProvider";
import FloatingReportButton from "@/components/shared/reportButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-figtree bg-black",
          fontUrban.variable,
          fontFigtree.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          // disableTransitionOnChange
        >
          <ConvexClientProvider>
            {/* <SocketProvider> */}
            <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
            <Toaster />
            <FloatingReportButton />
            {/* </SocketProvider> */}
            <SpeedInsights />
            <Analytics mode={"production"} />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
