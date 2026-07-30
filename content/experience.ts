/**
 * Employment history.
 *
 * Every bullet below traces to a claim on the current résumé. Nothing is
 * inflated, and no metric appears here that isn't on that document.
 */

export type Role = {
  company: string;
  /** Parent org / client, shown as a subdued qualifier. */
  parent?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  /** Machine-readable for JSON-LD and <time>. */
  startISO: string;
  endISO?: string;
  /** One line that frames the role before the bullets. */
  summary: string;
  highlights: string[];
  stack: string[];
  /** `true` renders the role in the expanded, primary treatment. */
  primary?: boolean;
};

export const experience: Role[] = [
  {
    company: "Such AI",
    title: "Full-Stack Engineer, Backend & Platform",
    location: "Mumbai, India",
    start: "Nov 2025",
    end: "Present",
    startISO: "2025-11-01",
    primary: true,
    summary:
      "Building the shared platform layer for an enterprise automation product, and its first LLM agent.",
    highlights: [
      "Designed and shipped v1 of an LLM agent to pre-production — orchestration, tool and workflow execution, and prompt and context management — and wrote the PRDs behind it.",
      "Generalised the RBAC, approval and notification platform I originally built into domain-agnostic services, now running across 15+ production products (15 web, 2 mobile), so teams ship features without rebuilding auth or workflows.",
      "Replaced vendor-locked Cognito auth with a custom authentication and authorisation layer using Argon2 hashing, asymmetric public/private-key JWTs and device fingerprinting; rolled SSO out to 5+ products and closed findings from VAPT security testing.",
      "Designed a 15+ table PostgreSQL schema for a legal document-lifecycle microservice with a JSONB-based state-machine trigger, an outbox pattern for reliable cross-service events, and deferred foreign keys for circular references.",
      "Built a transaction-safe distributed audit trail with audit mirroring, event queues and idempotency, and own those services through production monitoring and incident response.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "LLM orchestration",
      "RabbitMQ",
      "Redis",
    ],
  },
  {
    company: "Shapoorji Pallonji Finance",
    parent: "SPFPL",
    title: "Senior Software Developer",
    location: "Mumbai, India",
    start: "Jul 2022",
    end: "Nov 2025",
    startISO: "2022-07-01",
    endISO: "2025-11-30",
    primary: true,
    summary:
      "Supply chain finance products — owned the authorisation and workflow foundations the product ecosystem was later built on.",
    highlights: [
      "Built the company's RBAC, multi-stage approval engine and event-driven notification system from scratch on Node.js and PostgreSQL, with permission-driven dynamic UI rendering — the foundation later reused across the product ecosystem.",
      "Owned full-stack features end to end, from React frontends through Node.js APIs and PostgreSQL data models, and built customer-facing products as React microfrontends with Module Federation.",
      "Delivered the authentication platform on AWS Cognito (MFA, SSO, concurrent-login detection, session management); fixed a Cognito custom-message Lambda race condition by dropping an external API call and resolving user identity via clientMetadata, cutting billed Lambda duration.",
      "Migrated three products off deprecated Create React App to Vite — roughly 4,000+ files each, plus a shared UI component library — with no feature regressions.",
      "Integrated my RBAC and approval engine into another team's struggling project end to end and had it live in two weeks, letting them ship features faster under stricter auth policies.",
    ],
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS Cognito",
      "Module Federation",
      "Vite",
    ],
  },
  {
    company: "Pangea Tech",
    title: "Software Developer",
    location: "Bangalore, India",
    start: "2022",
    end: "2022",
    startISO: "2022-03-01",
    endISO: "2022-07-01",
    summary: "Full-stack work on the TuringXai data platform.",
    highlights: [
      "Built full-stack features covering data processing, analysis and visualisation, turning designs and wireframes into production React code.",
    ],
    stack: ["React", "Node.js", "Data visualisation"],
  },
  {
    company: "Avotrix Technology",
    parent: "Sony Pictures Networks",
    title: "Software Engineer",
    location: "Mumbai, India",
    start: "2020",
    end: "2022",
    startISO: "2020-09-01",
    endISO: "2022-03-01",
    summary: "Web and mobile features on a PLC-based platform.",
    highlights: [
      "Developed and supported web and mobile features, and resolved UI, process-flow and reporting defects across Android, iOS and web.",
    ],
    stack: ["JavaScript", "Web", "Mobile"],
  },
  {
    company: "Techera IT Consultancy",
    parent: "L&T Technology Services",
    title: "Software Engineer",
    location: "Mumbai, India",
    start: "2019",
    end: "2020",
    startISO: "2019-10-10",
    endISO: "2020-01-31",
    summary: "Mobile telecom feature verification.",
    highlights: [
      "Tested mobile telecom features across LTE, GSM, VoWiFi, VoLTE and 3G/4G, and supported the Zebra Hawkeye Qualcomm baseline-upgrade project.",
    ],
    stack: ["Telecom protocols", "Test automation"],
  },
];

export const education = {
  degree: "Bachelor of Engineering, Electronics",
  institution: "Vivekanand Education Society's Institute of Technology (VESIT)",
  affiliation: "University of Mumbai",
  year: "2019",
};
