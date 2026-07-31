import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme";
import { RevealProvider } from "@/components/reveal";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    // Page titles read "Work — Sagar Jha", which is what shows in a tab strip
    // and in search results.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Full-stack engineer",
    "Backend engineer",
    "Platform engineer",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "React",
    "RBAC",
    "Authentication",
    "LLM agents",
    "Mumbai",
    site.name,
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  // Static PNGs in /public rather than Next's dynamic icon/opengraph-image
  // file-convention routes — those are served without a file extension,
  // which GitHub Pages (and most static hosts) serve as
  // application/octet-stream, breaking favicon rendering and social-card
  // scrapers outright. Regenerate via `npx tsx scripts/generate-images.tsx`.
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Theme colour must match --paper in each mode or mobile Safari's chrome
  // will disagree with the page.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
  ],
};

/** Person + WebSite structured data. Helps Google render a knowledge panel. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        email: site.email,
        jobTitle: site.role,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
        knowsAbout: [
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "React",
          "Role-Based Access Control",
          "Authentication and authorization",
          "Event-driven architecture",
          "LLM agents",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Vivekanand Education Society's Institute of Technology (VESIT)",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.description,
        publisher: { "@id": `${site.url}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ThemeScript />
        <StructuredData />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-(length:--text-sm) focus:text-paper"
        >
          Skip to content
        </a>
        <RevealProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
