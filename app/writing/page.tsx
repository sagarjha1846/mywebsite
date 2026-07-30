import type { Metadata } from "next";

import { site } from "@/content/site";
import { articles, writingTopics } from "@/content/writing";
import { ArrowLink, Container, Section } from "@/components/primitives";

const title = "Writing";
const description =
  "Technical writing on authorisation, permission modelling, event-driven architecture, idempotency and LLM agent design.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title: `${title} — ${site.name}`,
    description,
    url: `${site.url}/writing`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
  },
};

export default function WritingPage() {
  const hasArticles = articles.length > 0;
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Section divider={false} className="pt-16 pb-4 sm:pt-24">
        <Container>
          <p className="eyebrow" data-reveal>
            Writing
          </p>
          <h1
            className="mt-4 max-w-[20ch] text-(length:--text-h1) tracking-[-0.03em]"
            data-reveal
            style={{ ["--reveal-index" as string]: 1 }}
          >
            Notes on the systems I build.
          </h1>
          <p
            className="mt-7 max-w-2xl text-(length:--text-lead) leading-relaxed text-ink-secondary"
            data-reveal
            style={{ ["--reveal-index" as string]: 2 }}
          >
            Mostly about authorisation, event-driven architecture and the
            boundary between non-deterministic models and systems that assume
            determinism.
          </p>
        </Container>
      </Section>

      <Section divider={false} className="pt-12 pb-24">
        <Container>
          {hasArticles ? (
            <ul className="divide-y divide-line border-y border-line">
              {sorted.map((article, i) => (
                <li key={article.href}>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-8"
                    data-reveal
                    style={{ ["--reveal-index" as string]: i }}
                  >
                    <time
                      dateTime={article.date}
                      className="shrink-0 font-mono text-(length:--text-micro) text-ink-faint tnum sm:w-28"
                    >
                      {new Date(article.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span className="flex-1">
                      <span className="block text-(length:--text-h3) tracking-tight transition-colors group-hover:text-accent">
                        {article.title}
                      </span>
                      <span className="mt-2 block max-w-prose text-(length:--text-base) leading-relaxed text-ink-secondary">
                        {article.summary}
                      </span>
                      {article.readingTime ? (
                        <span className="mt-3 block font-mono text-(length:--text-micro) text-ink-faint">
                          {article.readingTime}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="rounded-2xl border border-dashed border-line-strong p-8 sm:p-12"
              data-reveal
            >
              <h2 className="max-w-[26ch] text-(length:--text-h3) tracking-tight">
                Nothing syndicated here yet.
              </h2>
              <p className="mt-4 max-w-prose text-(length:--text-lead) leading-relaxed text-ink-secondary">
                I write on Medium, but this page pulls from a curated list
                rather than an automatic feed — I&apos;d rather show four pieces
                worth reading than everything I&apos;ve ever posted. Here&apos;s
                what&apos;s queued.
              </p>

              <ul className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
                {writingTopics.map((topic) => (
                  <li key={topic.title} className="border-t border-line pt-6">
                    <h3 className="max-w-[30ch] text-(length:--text-h4) tracking-tight text-ink">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-(length:--text-sm) leading-relaxed text-ink-muted">
                      {topic.angle}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-line pt-8">
                {site.links.medium ? (
                  <ArrowLink href={site.links.medium} external>
                    Read on Medium
                  </ArrowLink>
                ) : (
                  <p className="text-(length:--text-sm) text-ink-muted">
                    In the meantime, the case studies in{" "}
                    <a href="/work" className="link">
                      Work
                    </a>{" "}
                    cover most of these ideas with the specifics attached.
                  </p>
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
