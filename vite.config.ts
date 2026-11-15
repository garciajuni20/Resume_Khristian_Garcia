import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ROUTE_META, SITE_URL, pageUrl } from './src/data/routes'

// GitHub Pages serves the site from /Resume_Khristian_Garcia/; Cloudflare Pages
// serves it from the root and sets CF_PAGES=1 in its build. Every asset path in
// the app goes through import.meta.env.BASE_URL, so this one switch covers both.
const base = process.env.CF_PAGES ? '/' : '/Resume_Khristian_Garcia/'

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Clean URLs need a document per route: dist/resume.html and so on, each
 * with its own title, description, canonical and preview tags, so crawlers and
 * link previews (LinkedIn, Slack) see the right page without running JS. The
 * app itself is the same bundle. Only for the root host (Cloudflare Pages);
 * unknown paths fall back to index.html there, which renders the 404 page.
 */
function routeDocuments(): Plugin {
  let outDir = 'dist'
  return {
    name: 'route-documents',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir
    },
    closeBundle() {
      if (base !== '/') return
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const r of ROUTE_META) {
        const url = pageUrl(r.path)
        const t = attr(r.title)
        const d = attr(r.description)
        const html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
          .replace(/(<meta (?:name|property)="(?:title|og:title|twitter:title)" content=")[^"]*/g, `$1${t}`)
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g, `$1${d}`)
          .replace(/(<meta property="(?:og:url|twitter:url)" content=")[^"]*/g, `$1${url}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
        // resume.html is served at /resume with no trailing-slash redirect
        writeFileSync(join(outDir, r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`), html)
      }
      // Every route is a real URL here, so the sitemap lists them all
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTE_META.map(r => `  <url><loc>${pageUrl(r.path)}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`)
      writeFileSync(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
      writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), routeDocuments()],
})
