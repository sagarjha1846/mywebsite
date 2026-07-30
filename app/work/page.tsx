import type { Metadata } from "next";

import { projects, featuredProjects } from "@/content/projects";
import { Container, Section } from "@/components/primitives";
import { ProjectCard, ProjectRow } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on platform services, authentication, LLM agents, PostgreSQL schema design, microfrontends and open-source systems — the problem, the architecture, the decisions and the trade-offs.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Section divider={false} className="pt-16 pb-4 sm:pt-24">
        <Container>
          <p className="eyebrow" data-reveal>
            Work
          </p>
          <h1
            className="mt-4 max-w-[20ch] text-(length:--text-h1) tracking-[-0.03em]"
            data-reveal
            style={{ ["--reveal-index" as string]: 1 }}
          >
            Systems I designed, and the trade-offs I took.
          </h1>
          <p
            className="mt-7 max-w-2xl text-(length:--text-lead) leading-relaxed text-ink-secondary"
            data-reveal
            style={{ ["--reveal-index" as string]: 2 }}
          >
            Most of this is inside private enterprise codebases, so these are
            written up rather than screenshotted. Each one covers the problem,
            the architecture, the decisions I&apos;d defend in a review — and
            what each decision cost, because every one of them cost something.
          </p>
        </Container>
      </Section>

      <Section divider={false} className="pt-12 pb-20 sm:pt-16">
        <Container>
          {/* Visually hidden — keeps the heading outline at h1 → h2 → h3 for
              screen-reader navigation even though no visible section title
              sits above the grid here (unlike the home page, which has one). */}
          <h2 className="sr-only">Featured work</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {rest.length > 0 ? (
            <div className="mt-20">
              <h2 className="eyebrow" data-reveal>
                Also
              </h2>
              <div className="mt-8 border-t border-line">
                {rest.map((project, i) => (
                  <ProjectRow
                    key={project.slug}
                    project={project}
                    index={featuredProjects.length + i}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
