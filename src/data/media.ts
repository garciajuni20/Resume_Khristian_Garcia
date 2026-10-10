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
