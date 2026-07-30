import Link from "next/link";

import type { Project } from "@/content/projects";
import { ArrowIcon, Tag } from "@/components/primitives";

/**
 * Case-study card.
 *
 * Deliberately typographic rather than image-led. Most of this work is inside
 * private enterprise codebases, so a card built around a screenshot slot would
 * be a card built around a permanent empty state. The kicker does the job a
 * thumbnail would: it says what the thing is before you click.
 *
 * The whole card is one link (stretched pseudo-element) so the tap target is
 * the card, not the 90px "Read case study" text — this is the difference
 * between a comfortable and an irritating card on a phone.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className="group relative flex flex-col justify-between gap-8 rounded-2xl border border-line bg-paper-raised p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-ambient)] sm:p-8"
      data-reveal
      style={{ ["--reveal-index" as string]: index }}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-(length:--text-micro) tracking-widest text-ink-faint tnum">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-(length:--text-micro) uppercase tracking-widest text-ink-muted">
            {project.kind}
          </span>
        </div>

        <h3 className="mt-6 text-(length:--text-h3) tracking-tight transition-colors duration-200 group-hover:text-accent">
          <Link href={`/work/${project.slug}`}>
            {/* Stretches the link across the whole card. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 text-(length:--text-base) leading-relaxed text-ink-secondary">
          {project.kicker}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <div className="min-w-0">
            <p className="truncate text-(length:--text-sm) text-ink">
              {project.org}
            </p>
            <p className="mt-0.5 font-mono text-(length:--text-micro) text-ink-faint tnum">
              {project.period}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-(length:--text-sm) font-medium text-ink transition-colors group-hover:text-accent">
            Case study
            <ArrowIcon className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Compact single-line variant used on the /work index below the featured grid. */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col gap-3 border-b border-line py-7 transition-colors duration-200 hover:border-line-strong sm:flex-row sm:items-baseline sm:gap-8"
      data-reveal
      style={{ ["--reveal-index" as string]: index }}
    >
      <span className="shrink-0 font-mono text-(length:--text-micro) tracking-widest text-ink-faint tnum sm:w-10 sm:pt-1.5">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-(length:--text-h4) tracking-tight transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <span className="font-mono text-(length:--text-micro) uppercase tracking-widest text-ink-muted">
            {project.kind}
          </span>
        </span>
        <span className="mt-2 block max-w-2xl text-(length:--text-sm) leading-relaxed text-ink-secondary">
          {project.kicker}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-4 sm:w-52 sm:justify-end">
        <span className="text-right">
          <span className="block text-(length:--text-sm) text-ink-secondary">
            {project.org}
          </span>
          <span className="mt-0.5 block font-mono text-(length:--text-micro) text-ink-faint tnum">
            {project.period}
          </span>
        </span>
        <ArrowIcon className="text-ink-muted transition-all duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:text-accent" />
      </span>
    </Link>
  );
}
