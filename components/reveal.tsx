"use client";

import { useEffect } from "react";

/**
 * Scroll reveal, done once for the whole document.
 *
 * One IntersectionObserver for every `[data-reveal]` on the page rather than a
 * hook per component: fewer observers, no per-element React state, and no
 * animation library. Elements unobserve after revealing — the animation is a
 * one-shot, not a scroll-linked effect that re-fires as you scroll back up.
 *
 * The CSS that hides elements is gated behind `html[data-motion="on"]`, which
 * ThemeScript sets. If this component never runs, nothing is hidden.
 */
export function RevealProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const reveal = (el: Element) => el.setAttribute("data-revealed", "true");

    if (reduced.matches) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Generous top margin so an element is revealed well before it's on
      // screen — a fast flick-scroll or a large scrollTo jump shouldn't be
      // able to outrun the observer and leave content stuck invisible.
      { rootMargin: "20% 0px -8% 0px", threshold: 0 },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    // Client-side navigation swaps the DOM without remounting this provider,
    // so pick up anything new that appears.
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    // Belt-and-braces: whatever the observer missed (a jump-scroll, a very
    // short page, a slow first frame) gets revealed unconditionally after a
    // beat. Content must never be permanently stuck at opacity: 0.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(reveal);
    }, 1600);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
