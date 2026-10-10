/**
 * Resolves PDF assets for both runtimes. In the browser images load by URL
 * under Vite's BASE_URL. From Node (scripts/generate-pdfs.tsx) the script
 * preloads the files into globalThis.__PDF_IMAGES__, because react-pdf reads a
 * Windows path like "C:\..." as a URL with scheme "c:" and fails to fetch it.
 */
type PdfImage = string | { data: Uint8Array; format: 'jpg' | 'png' };

const g = globalThis as {
  process?: { env?: Record<string, string | undefined> };
  __PDF_IMAGES__?: Record<string, Uint8Array>;
};

/** Font/asset base: local folder when rendered from Node, BASE_URL in the browser */
export const PDF_BASE: string = g.process?.env?.PDF_ASSET_BASE ?? import.meta.env?.BASE_URL ?? '/';

export function pdfImage(path: string): PdfImage {
  const preloaded = g.__PDF_IMAGES__?.[path];
  if (preloaded) return { data: preloaded, format: path.endsWith('.png') ? 'png' : 'jpg' };
  return `${PDF_BASE}${path}`;
}
