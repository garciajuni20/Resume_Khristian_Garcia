/**
 * Cloudflare Pages serves the site from the root with real paths (/resume);
 * the GitHub Pages mirror lives under /Resume_Khristian_Garcia/ and keeps the
 * hash router (/#/resume), since it cannot rewrite unknown paths.
 */
export const CLEAN_URLS = import.meta.env.BASE_URL === '/';

/** In-app href for a route on the current host */
export function routeHref(path: string): string {
  return CLEAN_URLS ? path : `${import.meta.env.BASE_URL}#${path}`;
}

/**
 * Old links (/#/resume, /?lang=en#/resume, /#/resume?lang=en) keep working on
 * the clean-URL host: the hash route becomes the path before the router starts.
 */
export function upgradeHashRoute(): void {
  if (!CLEAN_URLS || !location.hash.startsWith('#/')) return;
  const [path, hashQuery = ''] = location.hash.slice(1).split('?');
  const params = new URLSearchParams(location.search);
  new URLSearchParams(hashQuery).forEach((v, k) => params.set(k, v));
  const query = params.toString();
  history.replaceState(null, '', path + (query ? `?${query}` : ''));
}
