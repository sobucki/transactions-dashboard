import type { Metadata } from "next";
import Theme from "./themes";

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
      </body>
    </html>
  );
}
