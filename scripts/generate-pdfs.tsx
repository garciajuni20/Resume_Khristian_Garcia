/**
 * Renders the 6 CV variants (EN/ES x ATS/ATS without photo/Creative) to job-search/CVs/ from Node.
 * Run: npx tsx --tsconfig tsconfig.app.json scripts/generate-pdfs.tsx
 */
import React from 'react';
import path from 'node:path';
import fs from 'node:fs/promises';
import { readFileSync } from 'node:fs';

// esbuild's classic JSX transform in this script references React at runtime
void React;

// Must be set BEFORE CVCreative is imported (it reads it at module load)
process.env.PDF_ASSET_BASE = path.resolve('public') + path.sep;

const outDir = path.resolve('job-search', 'CVs');

// react-pdf cannot load a Windows path as an image URL; hand it the bytes instead
(globalThis as { __PDF_IMAGES__?: Record<string, Uint8Array> }).__PDF_IMAGES__ = Object.fromEntries(
  ['me/khristian-portrait.jpg', 'me/khristian-square.jpg'].map(p => [p, readFileSync(path.resolve('public', p))])
);

async function main() {
  const { renderToFile } = await import('@react-pdf/renderer');
  const { CVATS } = await import('../src/pdf/CVATS');
  const { CVCreative } = await import('../src/pdf/CVCreative');
  const { profileEN } = await import('../src/data/profile-en');
  const { profileES } = await import('../src/data/profile-es');

  await fs.mkdir(outDir, { recursive: true });

  const jobs = [
    { name: 'khristian-garcia-resume-ats-en.pdf', el: <CVATS data={profileEN} lang="en" /> },
    { name: 'khristian-garcia-cv-ats-es.pdf', el: <CVATS data={profileES} lang="es" /> },
    { name: 'khristian-garcia-resume-ats-no-photo-en.pdf', el: <CVATS data={profileEN} lang="en" photo={false} /> },
    { name: 'khristian-garcia-cv-ats-no-photo-es.pdf', el: <CVATS data={profileES} lang="es" photo={false} /> },
    { name: 'khristian-garcia-resume-creative-en.pdf', el: <CVCreative data={profileEN} lang="en" /> },
    { name: 'khristian-garcia-cv-creative-es.pdf', el: <CVCreative data={profileES} lang="es" /> },
  ];

  for (const job of jobs) {
    const target = path.join(outDir, job.name);
    await renderToFile(job.el, target);
    const { size } = await fs.stat(target);
    console.log(`OK ${job.name} (${(size / 1024).toFixed(1)} KB)`);
  }
}

main().catch(err => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
