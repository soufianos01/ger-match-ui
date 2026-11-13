import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ger-match-ui.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "GerMatch — Find your Ausbildung in Germany",
  description: "GerMatch connects international talent with Ausbildung providers and paths in Germany.",
  openGraph: {
    title: "GerMatch — Find your Ausbildung in Germany",
    description: "A clearer way to discover Ausbildung paths and build your future in Germany.",
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
