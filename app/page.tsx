import Link from "next/link";

import { site } from "@/content/site";
import { hero, about, contact } from "@/content/about";
import { experience, education } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { skillGroups, patterns } from "@/content/skills";
import { articles, writingTopics } from "@/content/writing";
import {
  ArrowIcon,
  ArrowLink,
  ButtonLink,
  Container,
  Section,
  SectionHeader,
  Tag,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";

/* ========================================================================== */
/* HERO                                                                       */
/* Answers "what does he do, at what level, and is he available" above the    */
/* fold. No photo, no terminal animation, no "I'm passionate about code".     */
/* ========================================================================== */

function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
      <Container>
        {site.availability.open ? (
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-raised py-1.5 pl-3 pr-4"
            data-reveal
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60 [animation-duration:2.4s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
            </span>
            <span className="text-(length:--text-caption) text-ink-secondary">
              {site.availability.label}
            </span>
          </div>
        ) : null}

        <h1
          className="max-w-[19ch] text-(length:--text-h1) font-medium tracking-[-0.03em]"
          data-reveal
          style={{ ["--reveal-index" as string]: 1 }}
        >
          {hero.headline}
        </h1>

        <p
          className="mt-7 max-w-2xl text-(length:--text-lead) leading-relaxed text-ink-secondary"
          data-reveal
          style={{ ["--reveal-index" as string]: 2 }}
        >
          {hero.lede}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          data-reveal
          style={{ ["--reveal-index" as string]: 3 }}
        >
          <ButtonLink href="/work">View selected work</ButtonLink>
          <ButtonLink href={site.links.email} variant="secondary" external>
            Get in touch
          </ButtonLink>
          <ButtonLink href={site.links.resume} variant="ghost" external>
            Résumé
            <ArrowIcon className="-rotate-45" />
          </ButtonLink>
        </div>

        {/* Proof strip. Four résumé-verified numbers, tabular so they align. */}
        <dl
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-12 lg:grid-cols-4"
          data-reveal
          style={{ ["--reveal-index" as string]: 4 }}
        >
          {hero.proof.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block text-(length:--text-h2) font-medium tracking-tight tnum">
                  {item.value}
                </span>
                <span className="mt-2 block max-w-[24ch] text-(length:--text-sm) leading-snug text-ink-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* SELECTED WORK                                                              */
/* ========================================================================== */

function SelectedWork() {
  return (
    <Section id="work">
      <Container>
        <SectionHeader
          eyebrow="Selected work"
          title="Four systems worth explaining."
          intro="Each of these is written up as a case study — the problem, the architecture, the decisions I'd defend in a review, and what they cost."
          aside={<ArrowLink href="/work">All work</ArrowLink>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* EXPERIENCE                                                                 */
/* Two-column: sticky-ish meta on the left, outcomes on the right. Recent      */
/* roles get full bullets; early-career roles compress to one line each —      */
/* seniority is communicated by what gets the space.                          */
/* ========================================================================== */

function Experience() {
  const primary = experience.filter((r) => r.primary);
  const earlier = experience.filter((r) => !r.primary);

  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          eyebrow="Experience"
          title="Six years, mostly at the layer everything else depends on."
        />

        <div className="space-y-16 sm:space-y-20">
          {primary.map((role, i) => (
            <div
              key={role.company}
              className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16"
              data-reveal
              style={{ ["--reveal-index" as string]: i }}
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="font-mono text-(length:--text-micro) tracking-wide text-ink-muted tnum">
                  <time dateTime={role.startISO}>{role.start}</time>
                  {" — "}
                  {role.endISO ? (
                    <time dateTime={role.endISO}>{role.end}</time>
                  ) : (
                    role.end
                  )}
                </p>
                <h3 className="mt-3 text-(length:--text-h4) tracking-tight">
                  {role.company}
                </h3>
                {role.parent ? (
                  <p className="mt-0.5 text-(length:--text-sm) text-ink-faint">
                    {role.parent}
                  </p>
                ) : null}
                <p className="mt-2 text-(length:--text-sm) text-ink-secondary">
                  {role.title}
                </p>
                <p className="mt-1 text-(length:--text-sm) text-ink-faint">
                  {role.location}
                </p>
              </div>

              <div>
                <p className="max-w-prose text-(length:--text-lead) leading-relaxed text-ink">
                  {role.summary}
                </p>
                <ul className="mt-7 space-y-4">
                  {role.highlights.map((point) => (
                    <li
                      key={point}
                      className="relative max-w-prose pl-6 text-(length:--text-base) leading-relaxed text-ink-secondary"
                    >
                      <span
                        className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-ink-faint"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Earlier roles: present, dated, and out of the way. */}
        <div className="mt-20 border-t border-line pt-12" data-reveal>
          <p className="eyebrow">Earlier</p>
          <ul className="mt-8 space-y-6">
            {earlier.map((role) => (
              <li
                key={role.company}
                className="grid gap-2 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-16"
              >
                <div>
                  <p className="font-mono text-(length:--text-micro) text-ink-muted tnum">
                    {role.start === role.end
                      ? role.start
                      : `${role.start} — ${role.end}`}
                  </p>
                  <p className="mt-1.5 text-(length:--text-sm) text-ink">
                    {role.company}
                    {role.parent ? (
                      <span className="text-ink-faint"> · {role.parent}</span>
                    ) : null}
                  </p>
                </div>
                <div>
                  <p className="text-(length:--text-sm) text-ink-secondary">
                    {role.title}
                  </p>
                  <p className="mt-1 max-w-prose text-(length:--text-sm) leading-relaxed text-ink-muted">
                    {role.highlights[0]}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-2 border-t border-line pt-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-16">
            <p className="font-mono text-(length:--text-micro) text-ink-muted tnum">
              {education.year}
            </p>
            <div>
              <p className="text-(length:--text-sm) text-ink">
                {education.degree}
              </p>
              <p className="mt-1 text-(length:--text-sm) text-ink-muted">
                {education.institution}, {education.affiliation}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* ARCHITECTURE / HOW I WORK                                                  */
/* The section that separates "writes features" from "designs systems".       */
/* ========================================================================== */

function Architecture() {
  return (
    <Section id="architecture">
      <Container>
        <SectionHeader
          eyebrow="Architecture"
          title="Correctness shouldn't depend on everyone remembering."
          intro="The patterns I reach for, and the one idea underneath all of them: put the rule where it can't be bypassed, not in a document that asks people to be careful."
        />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern, i) => (
            <li
              key={pattern.name}
              className="bg-paper-raised p-6 transition-colors duration-300 hover:bg-paper-sunken sm:p-7"
              data-reveal
              style={{ ["--reveal-index" as string]: i }}
            >
              <h3 className="text-(length:--text-h4) tracking-tight">
                {pattern.name}
              </h3>
              <p className="mt-2.5 text-(length:--text-sm) leading-relaxed text-ink-secondary">
                {pattern.note}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* SKILLS                                                                     */
/* No bars. No percentages. Every group states what was built with it.        */
/* ========================================================================== */

function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeader
          eyebrow="Technical"
          title="What I use, and what I built with it."
          intro="Grouped by what it's for. I've left off anything I couldn't point at a shipped system to justify."
        />
        <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              data-reveal
              style={{ ["--reveal-index" as string]: i % 2 }}
            >
              <h3 className="text-(length:--text-h4) tracking-tight">
                {group.title}
              </h3>
              <p className="mt-2.5 max-w-prose text-(length:--text-sm) leading-relaxed text-ink-secondary">
                {group.proof}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* ABOUT (short)                                                              */
/* ========================================================================== */

function AboutPreview() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">About</p>
          </div>
          <div data-reveal style={{ ["--reveal-index" as string]: 1 }}>
            {about.short.map((para) => (
              <p
                key={para}
                className="mb-6 max-w-prose text-(length:--text-lead) leading-relaxed text-ink last:mb-0"
              >
                {para}
              </p>
            ))}
            <div className="mt-8">
              <ArrowLink href="/about">More about how I work</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* WRITING                                                                    */
/* Real articles when they exist; a designed empty state when they don't.     */
/* ========================================================================== */

function Writing() {
  const hasArticles = articles.length > 0;

  return (
    <Section id="writing">
      <Container>
        <SectionHeader
          eyebrow="Writing"
          title="Notes on the systems above."
          intro={
            hasArticles
              ? "Longer pieces on authorisation, event-driven architecture and agent design."
              : undefined
          }
          aside={
            hasArticles ? <ArrowLink href="/writing">All writing</ArrowLink> : undefined
          }
        />

        {hasArticles ? (
          <ul className="divide-y divide-line border-y border-line">
            {articles.slice(0, 4).map((article, i) => (
              <li key={article.href}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                  data-reveal
                  style={{ ["--reveal-index" as string]: i }}
                >
                  <time
                    dateTime={article.date}
                    className="shrink-0 font-mono text-(length:--text-micro) text-ink-faint tnum sm:w-28"
                  >
                    {new Date(article.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className="flex-1">
                    <span className="block text-(length:--text-h4) tracking-tight transition-colors group-hover:text-accent">
                      {article.title}
                    </span>
                    <span className="mt-1.5 block max-w-prose text-(length:--text-sm) leading-relaxed text-ink-secondary">
                      {article.summary}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty state that still carries signal: it shows what he has the
             standing to write about, drawn from work he's actually done. */
          <div
            className="rounded-2xl border border-dashed border-line-strong p-7 sm:p-10"
            data-reveal
          >
            <p className="max-w-prose text-(length:--text-lead) leading-relaxed text-ink">
              I write on Medium about the patterns behind the work above. The
              feed isn&apos;t wired up here yet — these are the pieces in the
              queue.
            </p>
            <ul className="mt-9 grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {writingTopics.map((topic) => (
                <li key={topic.title} className="border-t border-line pt-5">
                  <h3 className="text-(length:--text-base) font-medium tracking-tight text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-1.5 text-(length:--text-sm) leading-relaxed text-ink-muted">
                    {topic.angle}
                  </p>
                </li>
              ))}
            </ul>
            {site.links.medium ? (
              <div className="mt-9">
                <ArrowLink href={site.links.medium} external>
                  Read on Medium
                </ArrowLink>
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* CONTACT                                                                    */
/* ========================================================================== */

function Contact() {
  return (
    <Section id="contact">
      <Container>
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-(length:--text-h1) tracking-[-0.03em]">
            {contact.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-(length:--text-lead) leading-relaxed text-ink-secondary">
            {contact.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={site.links.email} external>
              {site.email}
            </ButtonLink>
            <ButtonLink href={site.links.linkedin} variant="secondary" external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={site.links.github} variant="secondary" external>
              GitHub
            </ButtonLink>
          </div>

          <p className="mt-8 text-(length:--text-sm) text-ink-muted">
            {contact.responseNote} Based in {site.location} ·{" "}
            <span className="tnum">GMT+5:30</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <Architecture />
      <Skills />
      <AboutPreview />
      <Writing />
      <Contact />
    </>
  );
}
