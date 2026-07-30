/**
 * Hero, about and contact copy. Kept out of components so every user-facing
 * sentence on the site is editable from `content/` without touching JSX.
 */

export const hero = {
  /** Scanned in ~2 seconds. It has to say what he does, not who he is. */
  headline: "I build the platform layer other teams ship on.",
  lede: "Full-stack engineer, six years in. The authentication, RBAC, approval and audit systems I built from scratch now run under 15+ production products. Most recently I designed and shipped v1 of an LLM agent for enterprise automation.",
  /** Rendered as a compact metric row directly under the fold. Every figure is résumé-verified. */
  proof: [
    { value: "15+", label: "production products running on platform services I built" },
    { value: "5+", label: "products moved onto a custom SSO layer I designed" },
    { value: "3", label: "products migrated off CRA to Vite, no regressions" },
    { value: "6", label: "years shipping production systems end to end" },
  ],
};

export const about = {
  /** Short version, used on the home page. */
  short: [
    "I work at the layer where a mistake is expensive. Authorisation, approvals, audit trails, identity — the systems that other features quietly assume are correct.",
    "That started at a supply chain finance company, where I built RBAC, a multi-stage approval engine and an event-driven notification system from scratch because every new product was rebuilding them badly. It ended up as the foundation the product ecosystem was built on, and generalising it into domain-agnostic services is a large part of what I do now.",
  ],
  /** Long version, /about only. */
  long: [
    "I work at the layer where a mistake is expensive. Authorisation, approvals, audit trails, identity — the systems every other feature quietly assumes are correct, and that nobody thinks about until they aren't.",
    "That focus wasn't planned. At a supply chain finance company I noticed every new product was rebuilding the same three things — who can see what, who approves what, who gets told — and each rebuild was a fresh opportunity to get authorisation subtly wrong. So I built RBAC, a multi-stage approval engine and an event-driven notification system properly, once. It became the foundation the rest of the product ecosystem was built on, and generalising it into domain-agnostic services running under 15+ products is a large part of what I've done since.",
    "The through-line in my work is refusing to let correctness depend on everyone remembering. Lifecycle rules go in a database trigger so every writer obeys them, including the migration script nobody has written yet. Events go through an outbox so a state change and its notification commit together or not at all. Audit logs have no delete path anywhere in the codebase, because tamper-evidence enforced by convention lasts until somebody is in a hurry. Consumers are idempotent, because at-least-once delivery means duplicates are a certainty, not an edge case.",
    "I'm full-stack, and I think the backend-only version of this work is weaker. Permission-driven UI only works if the same resolved permission tree drives the menu and the API guard — that's one system, and it's better when one person can see both ends of it. I've built customer-facing products as React microfrontends with Module Federation and migrated three applications off a deprecated toolchain without changing what users see.",
    "Most recently I've been working on agents: I designed and shipped v1 of an LLM agent to pre-production and wrote the PRDs behind it. My position is that the interesting engineering isn't the model call — it's the boundary between something non-deterministic and systems that assume determinism. Every side effect goes through an explicit tool, so behaviour is auditable rather than merely plausible, and the agent asks instead of guessing, because in enterprise automation a confidently wrong action costs far more than one extra question.",
    "I own what I ship through production monitoring and incident response. I'd rather be paged for my own service than hand it over and hope.",
  ],
  /** Small, human, and strictly optional — placed last so it never leads. */
  asides: [
    "Based in Mumbai. Happy working remote or hybrid.",
    "I write about the patterns above — permission trees, outboxes, idempotency — on Medium.",
    "Open-source work is where I get to show the code the day job won't let me: rbac-system and ShopStop are both public.",
  ],
};

export const contact = {
  headline: "Let's talk.",
  lede: "I'm open to senior full-stack and platform engineering roles — particularly work on authorisation, developer platforms or agent infrastructure. If you're hiring for that, or you just want to argue about whether state machines belong in the database, I'll reply.",
  responseNote: "I read everything and reply within a couple of days.",
};
