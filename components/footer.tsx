import Link from "next/link";

import { site } from "@/content/site";

const social = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
].filter((l) => l.href);

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-(length:--text-h4) tracking-tight">{site.name}</p>
            <p className="mt-2 text-(length:--text-sm) leading-relaxed text-ink-muted">
              {site.role} — {site.discipline}. Based in {site.location}.
            </p>
            <a
              href={site.links.email}
              className="link mt-4 inline-block text-(length:--text-sm)"
            >
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Pages</p>
              <ul className="mt-4 space-y-2.5">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-(length:--text-sm) text-ink-secondary transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(length:--text-sm) text-ink-secondary transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Feed</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="/rss.xml"
                    className="text-(length:--text-sm) text-ink-secondary transition-colors hover:text-ink"
                  >
                    RSS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-(length:--text-micro) text-ink-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-(length:--text-micro) text-ink-faint">
            Next.js · TypeScript · Tailwind — no analytics, no cookies, no
            tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
