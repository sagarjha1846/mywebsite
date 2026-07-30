/**
 * Skills.
 *
 * No bars, no percentages, no icon wall. Each group carries a `proof` line
 * saying what was actually built with it — a list of nouns proves nothing, and
 * a percentage next to "React" proves less than nothing.
 *
 * Nothing appears here that isn't backed by the résumé or by public code.
 */

export type SkillGroup = {
  title: string;
  proof: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    proof: "TypeScript end to end — the same language across API, data layer and UI.",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Backend & APIs",
    proof:
      "Built RBAC, multi-stage approval and event-driven notification services from scratch, now running under 15+ production products.",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "REST APIs",
      "Microservices",
      "Event-driven architecture",
    ],
  },
  {
    title: "Data",
    proof:
      "A 15+ table PostgreSQL schema with a JSONB state-machine trigger, an outbox for cross-service events and deferred foreign keys for circular references.",
    items: [
      "PostgreSQL",
      "Redis",
      "Sequelize",
      "Prisma",
      "Schema & data modelling",
      "Query optimisation",
      "Indexing",
      "Migrations",
    ],
  },
  {
    title: "Auth & security",
    proof:
      "Replaced a managed identity provider with a custom auth layer — Argon2, asymmetric JWTs, device fingerprinting — then rolled SSO to 5+ products and cleared VAPT findings.",
    items: [
      "Custom JWT (asymmetric keys)",
      "Argon2",
      "OAuth / SSO",
      "MFA",
      "RBAC",
      "Session management",
      "VAPT remediation",
    ],
  },
  {
    title: "Frontend",
    proof:
      "Customer-facing products as React microfrontends with Module Federation, and three applications migrated off Create React App to Vite with no feature regressions.",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Module Federation",
      "Tailwind CSS",
      "Material UI",
      "Ant Design",
    ],
  },
  {
    title: "AI",
    proof:
      "Designed and shipped v1 of an LLM agent to pre-production — orchestration, tool and workflow execution, prompt and context management.",
    items: [
      "LLM integration",
      "Agentic workflows",
      "Tool calling",
      "Prompt engineering",
      "RAG & embeddings",
      "Multi-model providers",
    ],
  },
  {
    title: "Cloud & messaging",
    proof:
      "Delivered an authentication platform on AWS Cognito, and a RabbitMQ notification service that cut duplicate notifications by 40%.",
    items: [
      "AWS Lambda",
      "AWS S3",
      "AWS Cognito",
      "AWS Amplify",
      "RabbitMQ",
      "Socket.IO",
      "Firebase Cloud Messaging",
    ],
  },
  {
    title: "Practice",
    proof:
      "Own services through production monitoring and incident response, not just to the merge commit.",
    items: [
      "System design",
      "Distributed systems",
      "Code review",
      "CI/CD",
      "Testing",
      "Production monitoring",
      "Incident response",
    ],
  },
];

/**
 * Architecture patterns worked with directly. Kept separate from the tool list
 * because patterns are the more useful signal — tools change, these don't.
 */
export const patterns: { name: string; note: string }[] = [
  {
    name: "Outbox pattern",
    note: "State change and its event committed in one transaction — no dual-write window.",
  },
  {
    name: "Permission-tree resolution",
    note: "One server-side authority the API guard and the UI both read from.",
  },
  {
    name: "Idempotent consumers",
    note: "Effectively-once processing on top of at-least-once delivery.",
  },
  {
    name: "State machines in the database",
    note: "Transition rules enforced where the write happens, for every caller.",
  },
  {
    name: "Append-only audit trails",
    note: "Tamper-evidence by construction — no mutation path in the codebase.",
  },
  {
    name: "Module Federation",
    note: "Independently built and deployed frontends composed at runtime.",
  },
];
