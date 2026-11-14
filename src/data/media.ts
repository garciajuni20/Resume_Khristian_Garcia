/** Local photo assets (public/me). Paths are relative to the Vite base URL. */
export const PHOTO = {
  /** 800×1200 portrait for the site */
  portraitWebp: 'me/khristian-portrait.webp',
  /** 600×900 portrait JPEG: react-pdf cannot decode WebP */
  portraitJpg: 'me/khristian-portrait.jpg',
  /** 600×600 head-and-shoulders crop */
  squareWebp: 'me/khristian-square.webp',
  squareJpg: 'me/khristian-square.jpg',
} as const;

export const PORTFOLIO_URL = 'https://garciajuni20.github.io/Resume_Khristian_Garcia/';

/** Printed in the PDF footers; bump it when the profile data changes */
export const CV_UPDATED = { en: 'November 2026', es: 'noviembre de 2026' } as const;
