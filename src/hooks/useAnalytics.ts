import type { AnalyticsEvent } from "../types";

const isDev = import.meta.env.DEV;

export default function useAnalytics(page: AnalyticsEvent["page"]) {
  // NOTE: intentionally lightweight — avoid unused locals that can break strict builds.
  // If you want to wire GA later, do it here and keep it env-gated.

  if (isDev) {
    // Keep dev-only logs minimal and silent in production.
    // eslint-disable-next-line no-console
    console.debug(`[analytics] page_view: ${page}`);
  }
}
