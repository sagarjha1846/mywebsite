/**
 * Single source of truth for identity, links and SEO defaults.
 *
 * `url` vs `origin`: deployed as a GitHub Pages *project* site, so every
 * real page lives under /mywebsite. `url` is the full deployed base
 * (origin + basePath) — use it for every page-path construction
 * (`${site.url}/work`, canonical URLs, OG images, sitemap, RSS). `origin`
 * is the bare domain, for the rare case that genuinely wants just that
 * (robots.txt's non-standard Host directive).
 *
 * IMPORTANT: `url` must always be built as an *absolute* string
 * (`${site.url}${path}`), never passed as a bare "/path" to Next's
 * Metadata API (alternates.canonical, icons, openGraph.images, etc). Next
 * resolves those against `metadataBase` using standard URL-resolution
 * rules, where a leading "/" resets to the domain root and silently
 * drops the "/mywebsite" prefix — verified empirically, not a guess.
 */

const origin = "https://sagarjha1846.github.io";

export const site = {
  name: "Sagar Jha",
  firstName: "Sagar",
  /** Deliberately a role, not a job title — this is what a recruiter scans for. */
  role: "Full-Stack Engineer",
  discipline: "Backend & Platform",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",

  origin,
  url: `${origin}/mywebsite`,

  /**
   * Used verbatim in <meta name="description"> and as the OG description.
   * Kept under ~155 characters so Google doesn't truncate the snippet.
   */
  description:
    "Full-stack engineer, six years in. Built the authentication, RBAC, approval and audit systems now running under 15+ production products.",

  email: "sagar.jharavi@gmail.com",
  phone: "+91 88503 38145",

  /** Availability is a recruiter signal. Flip `open` to false to hide the dot. */
  availability: {
    open: true,
    label: "Open to senior full-stack & platform roles",
  },

  links: {
    github: "https://github.com/sagarjha1846",
    linkedin: "https://www.linkedin.com/in/saagar-jha-b26840163/",
    // TODO: replace with the real Medium profile URL — not publicly discoverable.
    medium: "",
    email: "mailto:sagar.jharavi@gmail.com",
    resume: "/sagar-jha-resume.pdf",
  },

  /** Ordered nav. `href` values map to section ids on `/` or to real routes. */
  nav: [
    { label: "Work", href: "/work" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
  ],
} as const;

export type Site = typeof site;
