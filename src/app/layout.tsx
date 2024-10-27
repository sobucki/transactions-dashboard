import type { Metadata } from "next";
import Theme from "./themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Dashboard Transactions",
  description: "Dashboard Transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
