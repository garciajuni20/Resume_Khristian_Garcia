import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

/**
 * Build-time render of a page in English (scripts/prerender.mjs writes it into
 * the page's HTML), so the first paint does not wait for the JS bundle. The
 * browser then hydrates the same markup (src/main.tsx). Only the parts that
 * run during render execute here: effects, observers and audio never do.
 */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
}
