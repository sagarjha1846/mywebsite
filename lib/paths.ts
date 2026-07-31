/**
 * Prefixes a root-relative path with the deployment's basePath
 * (NEXT_PUBLIC_BASE_PATH, set in next.config.ts — "/mywebsite" in
 * production builds, "" locally).
 *
 * Only needed for plain <a> tags pointing at same-origin *files* (the
 * résumé PDF, rss.xml) rather than pages. Internal page navigation should
 * always go through next/link instead, which applies basePath
 * automatically — this helper exists specifically because next/link's
 * default prefetching treats any same-origin href as a page with its own
 * RSC segment to prefetch, which 404s harmlessly-but-noisily for a static
 * file. Using a plain <a> with this helper sidesteps that entirely rather
 * than fighting Link's prefetch behavior for non-page hrefs.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
