import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

/**
 * Site-wide defaults only. Per-page <title>, description, canonical and social
 * tags are set by buildMetadata() in each page module — this layout deliberately
 * omits `title.template` so nothing is appended that could push a title past
 * the 60-character budget.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Plain string, not { default, template }: a template would append the brand
  // to every page title and silently push it past the 60-character budget.
  title: "Nexdelve — Fan-Made Game Guides, Tier Lists & Builds",
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
