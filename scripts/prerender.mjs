/**
 * Writes the English home page into dist/index.html, so a visitor sees it as
 * soon as the HTML and CSS arrive instead of after the JS bundle has downloaded
 * and run (on a slow phone that was ~3 s of blank page). The browser then
 * hydrates this markup (src/main.tsx). The inline script after #root in
 * index.html drops it on any other route or language.
 *
 * Runs as the last step of `npm run build`, after `vite build --ssr
 * src/prerender.tsx` has produced dist-ssr/prerender.js.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
// Loaded before the browser stand-ins below: framer-motion decides at import time
// whether it runs in a browser, and here it must take its server path
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'prerender.js')).href);

// What the app reads while it renders. A first visit in English, light theme,
// sound off: exactly what the inline scripts in index.html let through, and
// what the components show until hydration (useHydrated)
const memory = new Map();
globalThis.localStorage = {
  getItem: k => memory.get(k) ?? null,
  setItem: (k, v) => void memory.set(k, String(v)),
  removeItem: k => void memory.delete(k),
};
globalThis.sessionStorage = globalThis.localStorage;
globalThis.window = {
  location: { pathname: '/', search: '', hash: '', href: '/' },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
};
Object.defineProperty(globalThis, 'navigator', { value: { language: 'en-US' }, configurable: true });

const file = join(root, 'dist', 'index.html');
const doc = readFileSync(file, 'utf8');
const slot = '<div id="root"></div>';
if (!doc.includes(slot)) throw new Error(`prerender: ${slot} not found in dist/index.html`);

const html = render('/');
if (!html.includes('<h1')) throw new Error('prerender: the home page rendered without its <h1>');
writeFileSync(file, doc.replace(slot, `<div id="root">${html}</div>`));
console.log(`prerender: home page written into dist/index.html (${Math.round(html.length / 1024)} KB of markup)`);
