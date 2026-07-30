/**
 * Case studies.
 *
 * Editorial rules applied throughout:
 *  - Every claim in `results` traces to the current résumé or to public code.
 *  - Where employer work can't be shown, `access` says so plainly rather than
 *    faking a screenshot or a dead "Live demo" link.
 *  - `gaps` never renders on the page. It's a private checklist of what would
 *    make the study stronger if Sagar can supply or declassify it.
 */

export type Decision = {
  decision: string;
  because: string;
  tradeoff: string;
};

export type Project = {
  slug: string;
  /** Short label for cards and nav. */
  title: string;
  /** The one-sentence "what is it" a recruiter reads first. */
  kicker: string;
  org: string;
  period: string;
  kind: "Platform" | "Security" | "Data" | "AI" | "Frontend" | "Open source";
  access: "Private — enterprise codebase" | "Public repository";
  featured?: boolean;

  problem: string;
  context: string;
  role: string;
  stack: string[];
  architecture: string[];
  challenges: string[];
  decisions: Decision[];
  results: string[];

  links?: { label: string; href: string }[];
  /** Internal only — surfaced in the handover notes, never rendered. */
  gaps?: string[];
};

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "platform-services",
    title: "The platform layer",
    kicker:
      "RBAC, multi-stage approvals and event-driven notifications, built once and now running under 15+ production products.",
    org: "Shapoorji Pallonji Finance → Such AI",
    period: "2022 — Present",
    kind: "Platform",
    access: "Private — enterprise codebase",
    featured: true,

    problem:
      "Every new product in the portfolio was rebuilding the same three things: who can see what, who has to approve what, and who gets told when it happens. Each rebuild was a fresh chance to get authorisation subtly wrong, and each one drifted from the others — so a permission bug fixed in one product stayed broken in the rest.",
    context:
      "Supply chain finance, then enterprise automation. Regulated-adjacent domains where an over-permissive role or a silently dropped approval is a real business problem, not a cosmetic one. The work started as one product's internal need and ended up as the substrate the ecosystem is built on.",
    role:
      "I designed and built the original system from scratch, then led its generalisation into domain-agnostic services when it became clear other teams needed it more than they needed their own version.",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "React",
      "Event queues",
      "REST",
    ],
    architecture: [
      "A permission model resolved server-side into a single permission tree per user, walking user → groups → grants → module → application, with duplicate grants merged at resolution time.",
      "One resolved tree serves two consumers: the backend guard that authorises each request, and the frontend that renders menus and actions. The UI is permission-driven — it doesn't hard-code what a role can see, it reads what the server already computed.",
      "A multi-stage approval engine modelling approval as configurable state rather than branching code, so a new approval flow is configuration rather than a deployment.",
      "Notifications ride an event-driven path: domain services emit events, delivery is handled asynchronously off the request path so a slow notification never becomes a slow API.",
      "Generalisation step: domain vocabulary was pushed out to the edges, leaving services that know about subjects, permissions, stages and events — and nothing about supply chain finance.",
    ],
    challenges: [
      "Making authorisation identical on both sides of the wire. A frontend that computes permissions independently will eventually disagree with the backend, and the disagreement is always discovered in production.",
      "Generalising a system that was already live, without a rewrite and without breaking the product it was extracted from.",
      "Keeping permission resolution cheap. It runs on effectively every authenticated request, so an elegant model that costs three extra round-trips is not a usable model.",
    ],
    decisions: [
      {
        decision:
          "Resolve the full permission tree server-side and ship it to the client, rather than letting each client derive its own.",
        because:
          "One authority means the UI and the API can never disagree about what a user is allowed to do, and permission logic stays reviewable in one place.",
        tradeoff:
          "The payload is larger than a role string, and the tree has to be invalidated carefully when grants change.",
      },
      {
        decision:
          "Model approvals as configurable stages instead of encoding each workflow in application logic.",
        because:
          "Approval chains change for business reasons far more often than for engineering reasons; configuration lets that change happen without a release.",
        tradeoff:
          "More upfront design, and a configuration surface that itself needs validation and its own guard rails.",
      },
      {
        decision:
          "Extract the services in place, product by product, rather than building a v2 alongside and cutting over.",
        because:
          "The system was already carrying production traffic; a parallel rewrite would have meant maintaining two authorisation implementations, which is exactly the failure mode the project existed to remove.",
        tradeoff:
          "Slower, and required staying compatible with the original product's assumptions for longer than a clean-sheet design would.",
      },
    ],
    results: [
      "Now runs across 15+ production products — 15 web applications and 2 mobile applications.",
      "New products ship features without rebuilding authentication, authorisation or workflow primitives.",
      "Integrated end to end into a separate team's struggling project and live within two weeks, letting them ship faster under stricter auth policies.",
    ],
    gaps: [
      "No named product logos or user-count figures — needs employer clearance.",
      "Before/after delivery-time numbers for teams adopting the platform would be the strongest possible proof point.",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "custom-auth-layer",
    title: "Off Cognito, onto our own auth",
    kicker:
      "Replaced a vendor-locked identity provider with a custom authentication and authorisation layer, then rolled SSO to 5+ products and cleared VAPT.",
    org: "Such AI",
    period: "2025 — 2026",
    kind: "Security",
    access: "Private — enterprise codebase",
    featured: true,

    problem:
      "Authentication sat inside a managed vendor service. That bought speed early on and cost flexibility later: identity behaviour we needed was either unavailable, awkward to extend through vendor hooks, or priced per call. Replacing it meant rebuilding the single system where a mistake is unrecoverable.",
    context:
      "A multi-product enterprise estate where users move between applications and expect one identity, and where an external security team runs vulnerability assessment and penetration testing against what ships.",
    role:
      "I designed and implemented the replacement — password hashing, token strategy, device identity, session handling and the SSO rollout — and remediated the findings the security assessment returned.",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Argon2",
      "JWT (asymmetric)",
      "OAuth / SSO",
    ],
    architecture: [
      "Argon2 for password hashing — memory-hard by design, which is the property that matters when the threat is offline cracking of a leaked table.",
      "Asymmetric public/private-key JWTs: the auth service alone holds the signing key, every other service verifies with the public key. Verification needs no shared secret and no call back to auth.",
      "Device fingerprinting bound into the session model, so a session is tied to the context it was created in rather than being a bearer token that works anywhere.",
      "Single sign-on across products, with identity centralised in one service instead of duplicated per application.",
      "Findings from VAPT fed back as fixes in the same layer rather than as compensating controls bolted on elsewhere.",
    ],
    challenges: [
      "Cutting over the one subsystem that has no acceptable downtime and no acceptable partial correctness.",
      "Asymmetric signing changes the operational picture — key custody, rotation and distribution become things somebody has to own.",
      "Device fingerprinting has to be strict enough to matter and forgiving enough that ordinary users aren't logged out by a browser update.",
    ],
    decisions: [
      {
        decision:
          "Asymmetric (public/private key) JWTs rather than a shared HMAC secret.",
        because:
          "Verifying services never need to hold a credential that could also mint tokens, so the blast radius of a compromised service is bounded.",
        tradeoff:
          "Key management becomes a first-class operational concern: rotation, distribution and custody all need owners.",
      },
      {
        decision:
          "Argon2 over bcrypt for password hashing.",
        because:
          "Memory-hardness resists GPU and ASIC-accelerated cracking in a way iteration count alone does not.",
        tradeoff:
          "Higher memory cost per login, which has to be tuned against real server capacity rather than copied from a blog post.",
      },
      {
        decision:
          "Own the identity layer instead of staying on the managed service.",
        because:
          "Identity behaviour was on the critical path for several products; being unable to change it was a recurring tax, and per-call pricing scaled with success.",
        tradeoff:
          "Everything a managed provider handles quietly — the security posture, the edge cases, the upgrades — is now ours to maintain forever.",
      },
    ],
    results: [
      "SSO rolled out to 5+ products on the new layer.",
      "Findings from external VAPT security testing addressed in the auth layer itself.",
      "Removed the vendor dependency from the identity path across the estate.",
    ],
    gaps: [
      "Login latency and auth-cost before/after would make the vendor-exit argument concrete.",
      "VAPT severity breakdown (how many findings, at what severity) — likely confidential.",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "llm-agent-v1",
    title: "v1 of an LLM agent",
    kicker:
      "Designed and shipped the first version of an agent for enterprise automation — orchestration, tool and workflow execution, prompt and context management — and wrote the PRDs behind it.",
    org: "Such AI",
    period: "2026",
    kind: "AI",
    access: "Private — enterprise codebase",
    featured: true,

    problem:
      "Enterprise automation work is full of multi-step tasks that are too variable to hard-code and too repetitive to keep doing by hand. The question was whether an agent could carry those tasks reliably enough to sit in a real workflow — where a wrong action isn't a bad answer, it's a bad write to a production system.",
    context:
      "Built inside a product organisation, not a research one. That framing set the bar: the agent had to be predictable, inspectable and safe to put in front of enterprise users, which mattered more than raw capability.",
    role:
      "I designed the agent and shipped v1 to pre-production, and wrote the product requirements that defined what it should and shouldn't attempt.",
    stack: [
      "TypeScript",
      "Node.js",
      "LLM orchestration",
      "Tool calling",
      "Prompt & context engineering",
      "PostgreSQL",
    ],
    architecture: [
      "An orchestration loop that decides, per turn, whether the model has enough information to act — and asks rather than guesses when it doesn't.",
      "Tool and workflow execution as the agent's only route to the outside world, which makes every action the agent takes an explicit, reviewable call rather than free-form output.",
      "Context management as a deliberate layer: what the model is shown each turn is assembled, not accumulated, so behaviour stays stable as conversations grow.",
      "Prompt design treated as product surface — the agent's boundaries are specified, not emergent.",
    ],
    challenges: [
      "Non-determinism sitting on top of systems that assume determinism. The interesting engineering is in the boundary between them, not in the model call.",
      "Deciding what the agent must never do unilaterally, and making that a structural property rather than an instruction it could be talked out of.",
      "Writing requirements for a capability whose failure modes are probabilistic — a spec that only describes the happy path is worse than no spec.",
    ],
    decisions: [
      {
        decision:
          "Route every side effect through explicit tools rather than letting the model emit actions directly.",
        because:
          "A tool call is a typed, loggable, testable boundary. It's what makes the agent's behaviour auditable after the fact instead of merely plausible in the moment.",
        tradeoff:
          "Every new capability costs a tool definition and its validation, so the agent grows more deliberately than a free-form one.",
      },
      {
        decision:
          "Have the agent ask a clarifying question instead of inferring missing input.",
        because:
          "In enterprise automation a confidently wrong action is far more expensive than one extra round-trip with the user.",
        tradeoff:
          "More turns to complete a task, and prompts that have to be tuned so it asks when it genuinely should — not constantly.",
      },
      {
        decision:
          "Write the PRD before the implementation, despite the technology being new.",
        because:
          "Agents drift toward whatever the demo rewarded. Naming the scope and non-goals first is what kept v1 shippable rather than perpetually interesting.",
        tradeoff:
          "Some of the spec had to be revised once real model behaviour contradicted it.",
      },
    ],
    results: [
      "v1 shipped to pre-production.",
      "Brought an AI-native approach into the company's enterprise automation product.",
      "PRDs written alongside the build, defining scope and non-goals.",
    ],
    gaps: [
      "Task-success rate, latency and human-intervention rate — the numbers that would make this the strongest study on the site.",
      "Which model providers are used, and whether that's public.",
      "Whether v1 has since reached general availability.",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rbac-system",
    title: "rbac-system",
    kicker:
      "An open-source RBAC service with data-level scoping, an append-only audit log, role-explosion clustering, and an AI assistant that provisions access through governed, human-approved workflows.",
    org: "Open source",
    period: "2026",
    kind: "Open source",
    access: "Public repository",
    featured: true,

    problem:
      "Access administration is where RBAC quietly fails. Creating a module, a permission, a permission group and a user is four correct steps in the right order, done by hand, repeatedly — so teams take shortcuts, groups multiply, and nobody can answer who has access to what or why.",
    context:
      "A working reference implementation of the ideas behind the production platform work: the permission model, the guard, and an LLM assistant that performs administration through the same service layer a human would.",
    role:
      "Sole author — schema, permission-tree resolver, auth middleware, REST surface, agent loop, LLM adapters and tests.",
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "React",
      "Vite",
      "LLM tool calling",
    ],
    architecture: [
      "Application → Module → Permission, with a permission optionally pinned to a single master-data record — so a role can be granted \"read Programs, but only for Anchor X\" rather than the whole module.",
      "Permission groups bundle permissions; users belong to many groups and are scoped to applications. Login resolves the whole graph into one permission tree, which both the UI and the backend guard read from.",
      "The AI assistant exposes the same service layer as LLM tools, so the agent and the REST API share one implementation and one set of invariants — the agent has no privileged path.",
      "Governed provisioning: a non-admin describes the access they need, the model drafts structured actions as PENDING_APPROVAL, and only an admin can execute them. Human authorisation is structural, not advisory.",
      "The audit log is append-only by construction — no update or delete path exists anywhere in the codebase — and tags each entry MANUAL or AI_DRAFTED.",
      "Pluggable LLM adapters: any OpenAI-compatible endpoint (vLLM, Ollama, TGI) so the deployment can run entirely on internal infrastructure and no data leaves the network.",
      "Role-explosion clustering fingerprints groups by their sorted moduleKey:crud signature to surface hand-built near-duplicates that should be consolidated.",
    ],
    challenges: [
      "Letting a language model administer access control without letting it become a privilege-escalation path.",
      "Data-level scoping without turning every authorisation check into a bespoke query.",
      "Over-privilege detection with no history: in a fresh system, \"never used\" and \"used, but not recently\" are indistinguishable — a limitation the project documents rather than papers over.",
    ],
    decisions: [
      {
        decision:
          "The AI assistant calls the same service layer as the REST API, never the database directly.",
        because:
          "Validation, authorisation and audit live in one place. The agent inherits every invariant instead of being trusted to reimplement them.",
        tradeoff:
          "The agent is constrained to what the service layer already exposes, so new capabilities need a service method first.",
      },
      {
        decision:
          "Make the audit log append-only by having no mutation path in the code at all.",
        because:
          "Tamper-evidence enforced by construction survives review; tamper-evidence enforced by convention survives until someone is in a hurry.",
        tradeoff:
          "No corrections, no cleanup — the log grows unboundedly and needs an archival story.",
      },
      {
        decision:
          "Ship an OpenAI-compatible adapter as the production path and a hosted-model adapter for demos only.",
        because:
          "Access-control data is exactly the data an enterprise won't send to a third party. Self-hosting has to be the default, not a footnote.",
        tradeoff:
          "Tool-calling quality varies across self-hosted models, so the agent loop can't assume frontier-model reliability.",
      },
    ],
    results: [
      "Permission-tree resolution and guard behaviour covered by tests against a real PostgreSQL database via supertest — including data-scoped grants and 401/403/400 paths.",
      "Fails fast at boot if JWT secret or CORS origins are missing in production.",
      "Documents its own non-goals: no rate limiting, no refresh tokens, no pagination — scoped as a proof of concept, and says so.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/sagarjha1846/Rbac-system" },
    ],
    gaps: ["A hosted demo would let recruiters try the agent without cloning."],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "document-lifecycle-service",
    title: "Legal document lifecycle",
    kicker:
      "A 15+ table PostgreSQL schema with a JSONB state-machine trigger, an outbox for reliable cross-service events, and a transaction-safe distributed audit trail.",
    org: "Such AI",
    period: "2026",
    kind: "Data",
    access: "Private — enterprise codebase",

    problem:
      "Legal documents move through a lifecycle where the ordering of state changes is the product. Getting a transition wrong, or losing the event that told another service a transition happened, produces a record that disagrees with reality — the worst possible outcome for a legal artefact.",
    context:
      "A microservice inside a multi-service estate, so state changes had to be published to other services reliably, and the resulting audit trail had to hold across service boundaries.",
    role: "I designed the schema, the state-machine mechanism and the audit trail.",
    stack: ["PostgreSQL", "JSONB", "Node.js", "TypeScript", "Event queues"],
    architecture: [
      "15+ tables modelling documents, parties, versions and lifecycle state.",
      "A JSONB-based state-machine trigger holding transition rules as data in the database, so the rules are enforced where the write happens rather than trusted to every caller.",
      "The outbox pattern for cross-service events: the event is written in the same transaction as the state change, then relayed. The database commit is what makes the event real — there is no window where the state changed but the event vanished.",
      "Deferred foreign keys for circular references, letting mutually-dependent rows be inserted inside one transaction and checked at commit rather than per statement.",
      "A transaction-safe distributed audit trail with audit mirroring, event queues and idempotency, so a replayed event doesn't produce a duplicate audit record.",
    ],
    challenges: [
      "The dual-write problem: any design where the state change and the event notification are two separate operations will eventually do one and not the other.",
      "Circular references between entities that genuinely depend on each other, which ordinary foreign key checking makes impossible to insert.",
      "Making at-least-once delivery safe, since a queue that guarantees at-least-once will deliver twice, and an audit trail that records it twice is wrong.",
    ],
    decisions: [
      {
        decision: "Outbox pattern instead of publishing to the queue directly.",
        because:
          "It collapses two failure-prone writes into one atomic commit. Either the state change and its event both happened, or neither did.",
        tradeoff:
          "A relay process to build, run and monitor, and events arrive slightly later than a direct publish.",
      },
      {
        decision:
          "Enforce lifecycle transitions with a database trigger rather than in application code.",
        because:
          "Every writer is subject to the same rules, including migrations, scripts and future services that nobody has written yet.",
        tradeoff:
          "Logic in the database is harder to unit-test and version than logic in the service, and needs discipline to keep readable.",
      },
      {
        decision: "Deferred foreign key constraints for circular references.",
        because:
          "The circularity is real in the domain; deferring the check to commit lets the schema model it honestly instead of adding nullable columns to work around it.",
        tradeoff:
          "Constraint violations surface at commit, which makes them less obvious to debug than immediate failures.",
      },
    ],
    results: [
      "Lifecycle rules enforced at the database boundary rather than per caller.",
      "Cross-service events published without a dual-write window.",
      "Audit records safe under event replay through idempotency.",
    ],
    gaps: [
      "Document volume and transition throughput would give this study scale.",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "microfrontends-and-vite",
    title: "Microfrontends, and the CRA exit",
    kicker:
      "Customer-facing products as React microfrontends with Module Federation, plus three products migrated off deprecated Create React App to Vite — roughly 4,000+ files each — with no feature regressions.",
    org: "Shapoorji Pallonji Finance",
    period: "2022 — 2025",
    kind: "Frontend",
    access: "Private — enterprise codebase",

    problem:
      "Two problems that turned out to be the same problem. Multiple teams needed to ship into one customer-facing surface without queueing behind a single release, and the build toolchain underneath all of them had been deprecated — leaving three large products on tooling with no upstream future.",
    context:
      "Supply chain finance products with a shared UI component library, several teams, and roughly 4,000+ files per application.",
    role:
      "I built the customer-facing products as microfrontends and ran the migration off Create React App.",
    stack: [
      "React",
      "Module Federation",
      "Vite",
      "TypeScript",
      "Shared component library",
    ],
    architecture: [
      "Module Federation to compose independently built and deployed React applications into one product surface at runtime.",
      "A shared component library as the common vocabulary across federated applications, so composition didn't produce three visually different products.",
      "Migration executed per product rather than as one estate-wide change, keeping each cutover independently revertible.",
    ],
    challenges: [
      "Shared dependency versions across federated modules — the failure mode of Module Federation is two copies of React, and it fails at runtime, in the browser, not at build time.",
      "Migrating ~4,000+ files per product without turning a build-tool change into a behaviour change.",
      "Moving the shared component library without breaking every consumer at once.",
    ],
    decisions: [
      {
        decision: "Module Federation over a build-time monorepo composition.",
        because:
          "Teams could deploy independently, which was the actual constraint — the shared surface was a release bottleneck, not a code-sharing problem.",
        tradeoff:
          "Runtime integration risk and shared-dependency discipline that a single build would have enforced for free.",
      },
      {
        decision:
          "Migrate to Vite rather than staying on a deprecated toolchain or moving to Next.js.",
        because:
          "These were authenticated dashboard applications with no server-rendering requirement. Vite was the change that fixed the deprecation without also changing the rendering architecture.",
        tradeoff:
          "No SSR path if one is ever needed, and a second migration would be required to get one.",
      },
      {
        decision:
          "Treat 'no feature regressions' as the migration's success criterion, not 'faster builds'.",
        because:
          "A toolchain migration that changes product behaviour is indistinguishable, from the business's side, from a broken release.",
        tradeoff: "Slower migration, and improvements deferred to later work.",
      },
    ],
    results: [
      "Three products migrated off Create React App to Vite with no feature regressions.",
      "Shared UI component library migrated alongside them.",
      "Customer-facing products shipped as independently deployable microfrontends.",
    ],
    gaps: [
      "Build-time and bundle-size before/after would make the Vite migration measurable — worth recovering if the numbers still exist.",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "shopstop",
    title: "ShopStop",
    kicker:
      "A trust-first peer-to-peer marketplace: a NestJS modular monolith and Next.js web app, shipped with an 18-part design package from PRD through VAPT checklist and cost model.",
    org: "Open source",
    period: "2026",
    kind: "Open source",
    access: "Public repository",

    problem:
      "Peer-to-peer marketplaces don't compete on listings — every incumbent has listings. They compete on whether a stranger will send money to another stranger. The thesis behind ShopStop is that trust is the product, so identity verification, fraud detection and dispute resolution are the core system, not a support function.",
    context:
      "A complete product exercise rather than a code sample: the repository carries the specification and the implementation together, written to be built by a small team on a limited budget and to survive a penetration test.",
    role:
      "Sole author of both the design package and the implementation — API, web app, schema, contracts and deployment.",
    stack: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "BullMQ",
      "Socket.IO",
      "Docker",
    ],
    architecture: [
      "A modular monolith with boundaries drawn so any module can be extracted into a service later — explicitly designed to reach ~100K users without re-architecture.",
      "PostgreSQL 16 as the primary datastore including full-text search, avoiding a separate search cluster at v1.",
      "Redis for cache, sessions and rate limiting; BullMQ workers for fraud, notifications, media and moderation; Socket.IO for chat and presence.",
      "Auth: Argon2id, phone OTP, JWT access plus rotating refresh tokens with reuse detection, RBAC and ABAC, MFA at login.",
      "A hash-chained, tamper-evident audit log, a rules risk engine gating publish, and a prioritised moderation and fraud queue.",
      "Payments as an idempotent, HMAC-verified webhook flow into a ledger, then fulfilment.",
      "Containerised single-host deployment behind Caddy for automatic HTTPS and security headers.",
    ],
    challenges: [
      "Building a trust layer that's meaningful without being so strict that legitimate sellers can't list.",
      "Keeping infrastructure cost low enough for a small team while designing for a path to 1M users.",
      "Payment webhooks that are correct under retries and out-of-order delivery — the place marketplaces lose real money.",
    ],
    decisions: [
      {
        decision: "Modular monolith, not microservices. No Kubernetes.",
        because:
          "The cost and operational burden of distributed services buys nothing at this scale. Module boundaries preserve the option to split later, when there's a reason to.",
        tradeoff:
          "One deploy unit and one blast radius until modules are actually extracted.",
      },
      {
        decision: "PostgreSQL full-text search rather than a dedicated search engine.",
        because:
          "It removes an entire service from the v1 footprint, and Postgres FTS is more than adequate at launch volumes.",
        tradeoff:
          "Relevance tuning and faceting are weaker, and a search engine will eventually be needed.",
      },
      {
        decision: "Write the 18-part design package before and alongside the code.",
        because:
          "Cost, scaling and security posture are architectural decisions. Deciding them in documents is far cheaper than discovering them in production.",
        tradeoff:
          "Substantial upfront effort, and documents that have to be maintained as the implementation moves.",
      },
    ],
    results: [
      "MVP verified end to end against live PostgreSQL and Redis, with black-box flow tests.",
      "Design package spans PRD, personas, IA, schema, API spec, security architecture, VAPT checklist, monitoring, testing strategy, cost estimation and a 100 → 1M user scaling roadmap.",
      "OpenAPI contract, CI workflow and a production Docker Compose stack included.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/sagarjha1846/ShopStop" },
    ],
    gaps: ["A deployed instance would turn this from a read into a try."],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "notification-system",
    title: "Distributed notification system",
    kicker:
      "A RabbitMQ and Node.js service for real-time notifications across web and mobile, cutting duplicate notifications by 40% through idempotent message handling.",
    org: "Personal project",
    period: "2023",
    kind: "Platform",
    access: "Private — enterprise codebase",

    problem:
      "Notification systems fail in a specific, user-visible way: the same alert arrives three times. Retries and at-least-once delivery guarantee duplicates, and the user reads them as a broken product.",
    context:
      "A real-time notification service delivering to both web and mobile clients.",
    role: "Sole author — message handling, retry strategy and routing design.",
    stack: ["Node.js", "RabbitMQ", "Event-driven architecture"],
    architecture: [
      "Idempotent message handling so a message processed twice produces one notification.",
      "Consumer retry strategies with dead-letter queues, so a message that cannot be processed is quarantined for inspection instead of blocking the queue or disappearing.",
      "Priority-based routing so time-sensitive notifications aren't queued behind bulk traffic.",
    ],
    challenges: [
      "At-least-once delivery makes duplicates a certainty, not an edge case — the consumer has to be the thing that makes delivery effectively-once.",
      "Distinguishing a message worth retrying from one that will never succeed, so retries don't become an infinite loop.",
    ],
    decisions: [
      {
        decision: "Make consumers idempotent rather than chasing exactly-once delivery.",
        because:
          "Exactly-once across a network is a much harder guarantee than making the same message safe to process twice — and only one of those is achievable.",
        tradeoff:
          "Every consumer needs deduplication state, with its own retention policy.",
      },
      {
        decision: "Dead-letter queues over unbounded retries.",
        because:
          "A poison message retried forever is an outage. Quarantining it keeps the queue moving and preserves the failure for diagnosis.",
        tradeoff: "The dead-letter queue needs someone to actually watch it.",
      },
    ],
    results: [
      "Duplicate notifications reduced by 40% through idempotent message handling.",
      "Real-time delivery across web and mobile clients.",
    ],
    gaps: [
      "Confirm whether this can be open-sourced — public code would strengthen it considerably.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
