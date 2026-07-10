/**
 * Renders the 4 CV variants (EN/ES x ATS/Creative) to job-search/CVs/ from Node.
 * Run: npx tsx scripts/generate-pdfs.tsx
 */
import React from 'react';
import path from 'node:path';
import fs from 'node:fs/promises';

// esbuild's classic JSX transform in this script references React at runtime
void React;

// Must be set BEFORE CVCreative is imported (it reads it at module load)
process.env.PDF_ASSET_BASE = path.resolve('public') + path.sep;

const outDir = path.resolve('job-search', 'CVs');

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
