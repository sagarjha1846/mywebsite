import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
  prose = false,
}: {
  children: ReactNode;
  className?: string;
  prose?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${
        prose ? "max-w-(--container-prose)" : "max-w-(--container-shell)"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Section rhythm is a single decision applied everywhere: generous vertical
 * space, one hairline between sections. Spacing is never tuned per-section.
 */
export function Section({
  children,
  id,
  className = "",
  divider = true,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      // scroll-mt matches the sticky header so anchored headings land clear of it.
      className={`scroll-mt-24 py-20 sm:py-28 lg:py-36 ${
        divider ? "border-t border-line" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section header. The eyebrow is a real label, the heading is the promise, and
 * `aside` holds the one optional action (e.g. "All work →").
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <div
      className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
      data-reveal
    >
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-(length:--text-h2)">{title}</h2>
        {intro ? (
          <p className="mt-4 max-w-prose text-(length:--text-lead) leading-relaxed text-ink-secondary">
            {intro}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

/** Wraps children so each gets a staggered reveal delay. */
export function Stagger({
  children,
  className = "",
  from = 0,
}: {
  children: ReactNode[];
  className?: string;
  from?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          data-reveal
          style={{ ["--reveal-index" as string]: from + i }}
          className="contents"
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Text                                                                       */
/* -------------------------------------------------------------------------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Small metadata chip. Not a skill badge — no rating, no colour coding. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-(length:--text-micro) tracking-wide text-ink-muted">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-(length:--text-sm) font-medium transition-all duration-200 ease-[var(--ease-out-soft)] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-ink text-paper hover:bg-accent hover:text-paper",
    secondary:
      "border border-line-strong text-ink hover:border-ink hover:bg-paper-sunken",
    ghost: "text-ink-secondary hover:text-ink",
  } as const;

  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-3.5 w-3.5 ${className}`}
    >
      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
}

/** Text link with an arrow that slides on hover. Used for "read more" actions. */
export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-1.5 text-(length:--text-sm) font-medium text-ink transition-colors duration-150 hover:text-accent";
  const inner = (
    <>
      {children}
      <ArrowIcon className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
