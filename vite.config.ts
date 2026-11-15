import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /Resume_Khristian_Garcia/; Cloudflare Pages
// serves it from the root and sets CF_PAGES=1 in its build. Every asset path in
// the app goes through import.meta.env.BASE_URL, so this one switch covers both.
const base = process.env.CF_PAGES ? '/' : '/Resume_Khristian_Garcia/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
