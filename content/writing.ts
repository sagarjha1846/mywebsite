/**
 * Writing.
 *
 * Sagar writes on Medium, but the profile URL wasn't recoverable from the
 * supplied documents and isn't publicly discoverable by search. Rather than
 * link a guessed handle or fabricate article titles, this ships as a designed
 * empty state and `articles` stays empty until real entries are supplied.
 *
 * TO POPULATE: add the Medium profile URL to `site.links.medium`, then add
 * entries below. The writing page, the home section, the RSS feed and the
 * sitemap all read from this array — nothing else needs touching.
 */

export type Article = {
  title: string;
  /** One line on what the reader takes away — not a teaser. */
  summary: string;
  href: string;
  /** ISO date, used for sorting, <time> and RSS. */
  date: string;
  readingTime?: string;
  tags?: string[];
};

export const articles: Article[] = [];

/**
 * Topics Sagar has the standing to write about, drawn from work he's actually
 * done. Shown in the empty state so the section still carries signal while the
 * article list is empty — and doubles as a ready-made backlog.
 */
export const writingTopics: { title: string; angle: string }[] = [
  {
    title: "Resolving a permission tree once, on the server",
    angle:
      "Why a UI that computes its own permissions will eventually disagree with the API — and what to build instead.",
  },
  {
    title: "Leaving a managed identity provider",
    angle:
      "What you actually take on when you replace Cognito: key custody, session semantics, and the security review at the end.",
  },
  {
    title: "The outbox pattern, concretely",
    angle:
      "The dual-write problem, why the obvious fixes don't work, and the schema and relay that does.",
  },
  {
    title: "Idempotent consumers beat exactly-once delivery",
    angle:
      "Making the same message safe to process twice is achievable. Exactly-once across a network isn't.",
  },
  {
    title: "Giving an LLM agent tools without giving it privileges",
    angle:
      "Routing every side effect through a typed tool boundary, and keeping human approval structural rather than advisory.",
  },
  {
    title: "Migrating 4,000 files off Create React App",
    angle:
      "Running a toolchain migration where the only acceptable outcome is that nothing changes.",
  },
];
