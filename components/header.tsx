"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header only grows a border once the page has moved. At rest it sits
  // flush with the page — one less line competing with the content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change, and lock the page behind the open mobile sheet.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
      data-print-hide
    >
      <div className="mx-auto flex h-16 w-full max-w-(--container-shell) items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 text-(length:--text-sm) font-medium tracking-tight"
        >
          <span>{site.name}</span>
          <span className="hidden font-mono text-(length:--text-micro) font-normal text-ink-muted sm:inline">
            {site.discipline}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-(length:--text-sm) transition-colors duration-150 hover:bg-paper-sunken hover:text-ink ${
                      isActive(item.href) ? "text-ink" : "text-ink-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mx-1.5 hidden h-5 w-px bg-line md:block" />
          <ThemeToggle />

          <a
            href={site.links.email}
            className="ml-1.5 hidden rounded-full bg-ink px-4 py-2 text-(length:--text-sm) font-medium text-paper transition-colors duration-200 hover:bg-accent md:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-paper-sunken md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="h-4.5 w-4.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet. Rendered only when open so its links stay out of the tab
          order the rest of the time. */}
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-line bg-paper md:hidden"
        >
          <ul className="mx-auto flex max-w-(--container-shell) flex-col px-5 py-3 sm:px-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-line py-3.5 text-(length:--text-lead) text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.email}
                className="block py-3.5 text-(length:--text-lead) text-accent"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
