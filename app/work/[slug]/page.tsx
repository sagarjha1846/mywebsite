import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { site } from "@/content/site";
import { projects, getProject } from "@/content/projects";
import {
  ArrowIcon,
  ArrowLink,
  Container,
  Tag,
} from "@/components/primitives";

/** Every case study is known at build time — pre-render all of them. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.kicker,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.name}`,
      description: project.kicker,
      url: `${site.url}/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.kicker,
    },
  };
}

/* -------------------------------------------------------------------------- */

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-prose text-(length:--text-lead) leading-relaxed text-ink-secondary">
      {children}
    </p>
  );
}

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12 sm:py-16" data-reveal>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,10rem)_1fr] lg:gap-16">
        <p className="eyebrow lg:pt-1.5">{eyebrow}</p>
        <div>
          {title ? (
            <h2 className="mb-6 max-w-[24ch] text-(length:--text-h3) tracking-tight">
              {title}
            </h2>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Bulleted list with hairline markers — used for architecture and challenges. */
function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li
          key={item}
          className="relative max-w-prose pl-6 text-(length:--text-base) leading-relaxed text-ink-secondary"
        >
          <span
            className="absolute left-0 top-[0.7em] h-px w-3 bg-ink-faint"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * BreadcrumbList + CreativeWork JSON-LD. The `about` array is what lets a
 * search engine associate this specific write-up with the technologies it
 * covers, which is the difference between a generic "article" result and one
 * that can surface for "RBAC case study" or "outbox pattern example".
 */
function StructuredData({ project }: { project: (typeof projects)[number] }) {
  const url = `${site.url}/work/${project.slug}`;
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: `${site.url}/work` },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": url,
        url,
        name: project.title,
        headline: project.title,
        description: project.kicker,
        author: { "@id": `${site.url}/#person` },
        creator: { "@id": `${site.url}/#person` },
        keywords: project.stack.join(", "),
        about: project.stack,
        isAccessibleForFree: true,
        ...(project.links?.[0] ? { sameAs: project.links.map((l) => l.href) } : {}),
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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const isPublic = project.access === "Public repository";

  return (
    <article>
      <StructuredData project={project} />
      {/* ---------------------------------------------------------------- */}
      <header className="pt-12 pb-4 sm:pt-16">
        <Container>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-(length:--text-sm) text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowIcon className="rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
            All work
          </Link>

          <div className="mt-10 max-w-4xl" data-reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-(length:--text-micro) uppercase tracking-widest text-ink-muted">
              <span>{project.kind}</span>
              <span className="h-3 w-px bg-line" aria-hidden="true" />
              <span className="normal-case tracking-normal">{project.org}</span>
              <span className="h-3 w-px bg-line" aria-hidden="true" />
              <span className="tnum normal-case tracking-normal">
                {project.period}
              </span>
            </div>

            <h1 className="mt-6 text-(length:--text-h1) tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-(length:--text-lead) leading-relaxed text-ink-secondary">
              {project.kicker}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-(length:--text-sm) font-medium transition-colors hover:border-ink hover:bg-paper-sunken"
                >
                  {link.label}
                  <ArrowIcon className="-rotate-45" />
                </a>
              ))}

              {/* Honest empty state. A greyed-out "Live demo" link on private
                  work reads worse than simply saying why there isn't one. */}
              {!isPublic ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-paper-sunken px-4 py-2 text-(length:--text-sm) text-ink-muted">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="h-3.5 w-3.5">
                    <rect x="3.2" y="7" width="9.6" height="6.4" rx="1.6" />
                    <path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" />
                  </svg>
                  {project.access}
                </span>
              ) : null}
            </div>
          </div>
        </Container>
      </header>

      {/* ---------------------------------------------------------------- */}
      <Container>
        <Block eyebrow="Problem">
          <Prose>{project.problem}</Prose>
        </Block>

        <Block eyebrow="Context">
          <Prose>{project.context}</Prose>
        </Block>

        <Block eyebrow="My role">
          <Prose>{project.role}</Prose>
          <ul className="mt-8 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="Architecture" title="How it's put together">
          <Points items={project.architecture} />
        </Block>

        <Block eyebrow="Challenges" title="What made it hard">
          <Points items={project.challenges} />
        </Block>

        {/* The decisions block is the point of the whole page: a decision with
            no stated cost is a preference, not an engineering decision. */}
        <Block
          eyebrow="Decisions"
          title="What I chose, why, and what it cost"
        >
          <ol className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {project.decisions.map((d, i) => (
              <li key={d.decision} className="bg-paper-raised p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="mt-1 font-mono text-(length:--text-micro) text-ink-faint tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="max-w-prose text-(length:--text-h4) leading-snug tracking-tight">
                      {d.decision}
                    </h3>
                    <dl className="mt-5 space-y-4">
                      <div>
                        <dt className="eyebrow">Because</dt>
                        <dd className="mt-1.5 max-w-prose text-(length:--text-base) leading-relaxed text-ink-secondary">
                          {d.because}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow">Trade-off</dt>
                        <dd className="mt-1.5 max-w-prose border-l-2 border-accent/40 pl-4 text-(length:--text-base) leading-relaxed text-ink-secondary">
                          {d.tradeoff}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block eyebrow="Results">
          <ul className="space-y-4">
            {project.results.map((r) => (
              <li
                key={r}
                className="relative max-w-prose pl-7 text-(length:--text-lead) leading-relaxed text-ink"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="absolute left-0 top-[0.42em] h-4 w-4 text-accent"
                >
                  <path d="M3 8.4l3.4 3.2L13 5" />
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </Block>
      </Container>

      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-line">
        <Container>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-3 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-20"
          >
            <div>
              <p className="eyebrow">Next case study</p>
              <p className="mt-3 text-(length:--text-h2) tracking-tight transition-colors duration-200 group-hover:text-accent">
                {next.title}
              </p>
              <p className="mt-2 max-w-xl text-(length:--text-sm) leading-relaxed text-ink-muted">
                {next.kicker}
              </p>
            </div>
            <ArrowIcon className="h-5 w-5 shrink-0 text-ink-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Container>
      </div>

      <div className="border-t border-line">
        <Container>
          <div className="py-14 sm:py-16">
            <p className="max-w-prose text-(length:--text-lead) leading-relaxed text-ink">
              Want the version with the parts I can only say out loud?
            </p>
            <div className="mt-5">
              <ArrowLink href={site.links.email} external>
                Get in touch
              </ArrowLink>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
