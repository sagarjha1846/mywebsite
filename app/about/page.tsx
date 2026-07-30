import type { Metadata } from "next";

import { site } from "@/content/site";
import { about } from "@/content/about";
import { education, experience } from "@/content/experience";
import {
  ArrowLink,
  ButtonLink,
  Container,
  Section,
} from "@/components/primitives";

const title = "About";
const description =
  "Sagar Jha — full-stack engineer in Mumbai working on authorisation, approvals, audit trails and identity. Six years building systems other features depend on being correct.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: `${title} — ${site.name}`,
    description,
    url: `${site.url}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
  },
};

export default function AboutPage() {
  const current = experience[0];

  return (
    <>
      <Section divider={false} className="pt-16 pb-4 sm:pt-24">
        <Container>
          <p className="eyebrow" data-reveal>
            About
          </p>
          <h1
            className="mt-4 max-w-[18ch] text-(length:--text-h1) tracking-[-0.03em]"
            data-reveal
            style={{ ["--reveal-index" as string]: 1 }}
          >
            I work where a mistake is expensive.
          </h1>
        </Container>
      </Section>

      <Section divider={false} className="pt-8 pb-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,17rem)] lg:gap-20">
            {/* Main narrative, held to a reading measure. */}
            <div data-reveal>
              {about.long.map((para) => (
                <p
                  key={para}
                  className="mb-7 max-w-prose text-(length:--text-lead) leading-[1.75] text-ink-secondary last:mb-0 first:text-ink"
                >
                  {para}
                </p>
              ))}

              <ul className="mt-12 space-y-3 border-t border-line pt-8">
                {about.asides.map((aside) => (
                  <li
                    key={aside}
                    className="max-w-prose text-(length:--text-base) leading-relaxed text-ink-muted"
                  >
                    {aside}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fact rail — the details a recruiter checks, without hunting. */}
            <aside className="lg:sticky lg:top-24 lg:self-start" data-reveal style={{ ["--reveal-index" as string]: 1 }}>
              <div className="rounded-2xl border border-line bg-paper-raised p-6">
                <dl className="space-y-5">
                  <div>
                    <dt className="eyebrow">Currently</dt>
                    <dd className="mt-1.5 text-(length:--text-sm) text-ink">
                      {current.title}
                      <span className="block text-ink-muted">
                        {current.company}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Based in</dt>
                    <dd className="mt-1.5 text-(length:--text-sm) text-ink">
                      {site.location}
                      <span className="block text-ink-muted tnum">GMT+5:30</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Focus</dt>
                    <dd className="mt-1.5 text-(length:--text-sm) text-ink">
                      Authorisation, platform services, agent infrastructure
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Education</dt>
                    <dd className="mt-1.5 text-(length:--text-sm) text-ink">
                      {education.degree}
                      <span className="block text-ink-muted">
                        {education.institution} · {education.year}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Availability</dt>
                    <dd className="mt-1.5 text-(length:--text-sm) text-ink">
                      {site.availability.label}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-col gap-2 border-t border-line pt-6">
                  <ArrowLink href={site.links.resume} external>
                    Download résumé
                  </ArrowLink>
                  <ArrowLink href={site.links.email} external>
                    Email me
                  </ArrowLink>
                  <ArrowLink href={site.links.linkedin} external>
                    LinkedIn
                  </ArrowLink>
                  <ArrowLink href={site.links.github} external>
                    GitHub
                  </ArrowLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-(length:--text-h2) tracking-tight">
              If any of that sounds like your problem.
            </h2>
            <p className="mt-5 text-(length:--text-lead) leading-relaxed text-ink-secondary">
              I&apos;m open to senior full-stack and platform roles. The work I
              want is the work above: authorisation, developer platforms, agent
              infrastructure — systems other teams build on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.links.email} external>
                {site.email}
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                Read the case studies
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
