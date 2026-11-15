import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { COPY, type Lang } from './copy';
import { Bloom, BLOOM_TAIL, C, PreloadBloom } from './kit';
import { DUR, Intro, Numbers, Outro, Showcase, Stack, Timeline } from './scenes';

export type CareerProps = { lang: Lang };

export const CAREER_DURATION = Object.values(DUR).reduce((a, b) => a + b, 0);

const SCENES = [
  { len: DUR.intro, Scene: Intro },
  { len: DUR.numbers, Scene: Numbers },
  { len: DUR.timeline, Scene: Timeline },
  { len: DUR.showcase, Scene: Showcase },
  { len: DUR.stack, Scene: Stack },
  { len: DUR.outro, Scene: Outro },
];

/**
 * Scenes start at the same cuts as before; each one stays under the next for
 * the length of the ink bloom, so the drop always spreads over a still page.
 */
export const Career: React.FC<CareerProps> = ({ lang }) => {
  const c = COPY[lang];
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <PreloadBloom />
      {SCENES.map(({ len, Scene }, i) => {
        const start = from;
        from += len;
        const last = i === SCENES.length - 1;
        return (
          <Sequence key={i} from={start} durationInFrames={len + (last ? 0 : BLOOM_TAIL)}>
            {i === 0 ? <Scene c={c} /> : <Bloom><Scene c={c} /></Bloom>}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
