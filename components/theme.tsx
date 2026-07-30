"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Runs before first paint, so the correct theme is on <html> when the browser
 * paints. Without this the page renders light and flips to dark — the flash
 * that gives away a theme toggle bolted on after the fact.
 *
 * It also stamps `data-motion="on"`, which is what arms the scroll-reveal CSS.
 * Reveal styles are inert until JS proves it's running, so with JS disabled or
 * still loading, content is visible rather than stuck at opacity: 0.
 */
export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",s==="light"||s==="dark"?s:(d?"dark":"light"));}catch(e){}document.documentElement.setAttribute("data-motion","on");})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7L5.4 5.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* Safari private mode — the toggle still works for this session. */
      }
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      // Until the effect resolves we don't know the theme, so the label stays
      // generic rather than announcing something possibly wrong.
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
      className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-paper-sunken hover:text-ink"
      data-print-hide
    >
      {/* Both icons render; CSS picks one. Avoids a hydration mismatch and
          keeps the button from popping in after mount. */}
      <span className="hidden [html[data-theme='dark']_&]:block">
        <SunIcon />
      </span>
      <span className="block [html[data-theme='dark']_&]:hidden">
        <MoonIcon />
      </span>
    </button>
  );
}
