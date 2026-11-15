/** Notion tag palette used for categorical color (industries, project categories). */
export const TONES = ['blue', 'purple', 'orange', 'green', 'pink', 'brown', 'yellow', 'gray', 'red'] as const;
export type Tone = (typeof TONES)[number];

/** Industries are colored by their order of appearance; one place decides it, so the profile card and the career map agree. */
export const INDUSTRY_TONES: readonly Tone[] = ['blue', 'purple', 'orange', 'green', 'pink'];
export const industryTone = (index: number): Tone => INDUSTRY_TONES[index % INDUSTRY_TONES.length];

export const tagClass = (tone: Tone) => `n-tag n-tag-${tone}`;
