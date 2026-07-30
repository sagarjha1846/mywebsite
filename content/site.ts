/**
 * Single source of truth for identity, links and SEO defaults.
 *
 * NOTE — `url` is a placeholder domain. Replace it before deploying; it is
 * used for canonical URLs, OG tags, sitemap.xml, robots.txt and RSS.
 */

export const site = {
  name: "Sagar Jha",
  firstName: "Sagar",
  /** Deliberately a role, not a job title — this is what a recruiter scans for. */
  role: "Full-Stack Engineer",
  discipline: "Backend & Platform",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",

  url: "https://sagarjha.dev", // TODO: confirm domain
  ogImage: "/opengraph-image",

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
