/**
 * The public address and the head of every route. On Cloudflare Pages the build
 * writes one static HTML file per route with these tags (vite.config.ts), so
 * LinkedIn, Slack and search engines read the right title and preview without
 * running JavaScript. useSEO keeps them in sync once the app runs.
 */
export const SITE_URL = 'https://resume-khristian-garcia.pages.dev/';
export const OG_IMAGE = `${SITE_URL}og-image.jpg`;

export type RouteMeta = { path: string; title: string; description: string };

export const ROUTE_META: RouteMeta[] = [
  {
    path: '/',
    title: 'Khristian Garcia — Data Engineer (Snowflake, dbt, Azure)',
    description:
      'Data Engineer with 3 years building data platforms on Snowflake, dbt and Azure Data Factory for a US fintech, plus an AI and data platform in production. Bilingual, remote from Guatemala.',
  },
  {
    path: '/resume',
    title: 'Interactive resume | Khristian Garcia',
    description:
      'Data Engineer · Snowflake, dbt, Azure Data Factory. From a 24/7 NOC to the first BI hire to Data Engineer at a US fintech: the roles, the proof behind each figure, and CVs in PDF.',
  },
  {
    path: '/projects',
    title: 'Projects | Khristian Garcia',
    description: 'Production data work, systems in use and academic builds. The first two have full case studies.',
  },
  {
    path: '/alleviate',
    title: 'Alleviate case study | Khristian Garcia',
    description:
      'Alleviate: from five departments of spreadsheets to one source of truth in Snowflake. Data accuracy from 85% to 99.5%, reporting from 2+ days to under 30 minutes.',
  },
  {
    path: '/flowber',
    title: 'Flowber case study | Khristian Garcia',
    description:
      'Flowber: a barbershop platform built and run by one engineer. 160+ appointments, an AI agent with 20 tools, RAG on pgvector at 100% hit@1 and a dbt + DuckDB warehouse.',
  },
  {
    path: '/contact',
    title: 'Contact | Khristian Garcia',
    description:
      'Open to remote Data Engineer roles. You talk to me directly, no agency in between, and I answer within 24 hours.',
  },
];

/** Absolute public URL of a route, without hash: the canonical form on every host */
export const pageUrl = (path: string) => SITE_URL + path.replace(/^\//, '');
