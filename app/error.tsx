"use client";

import { useEffect } from "react";

import { site } from "@/content/site";
import { ButtonLink, Container } from "@/components/primitives";

/**
 * Route-segment error boundary. Next.js renders this in place of the page
 * that threw — without it, a runtime error would fall through to the
 * framework's unstyled default screen instead of the site's own language.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No analytics on this site by design — this keeps the failure visible
    // in the browser console for now rather than silently swallowing it.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 max-w-[18ch] text-(length:--text-h1) tracking-[-0.03em]">
        Something broke on this page.
      </h1>
      <p className="mt-6 max-w-md text-(length:--text-lead) leading-relaxed text-ink-secondary">
        Not you — this one&apos;s on the code. Try again, or head back and
        I&apos;ll get it fixed.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-(length:--text-sm) font-medium text-paper transition hover:bg-accent"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
        <ButtonLink href={site.links.email} variant="ghost" external>
          Report it
        </ButtonLink>
      </div>
    </Container>
  );
}
