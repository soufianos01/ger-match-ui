import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ger-match-ui.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "GerMatch — Find the right fit in Germany",
  description: "GerMatch connects international talent with teams and opportunities in Germany.",
  openGraph: {
    title: "GerMatch — Find the right fit in Germany",
    description: "A clearer way to discover opportunities and build your future in Germany.",
    siteName: "GerMatch",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
