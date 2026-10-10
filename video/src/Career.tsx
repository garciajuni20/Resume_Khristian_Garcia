import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { COPY, type Lang } from './copy';
import { DUR, Intro, Numbers, Outro, Showcase, Stack, Timeline } from './scenes';

export type CareerProps = { lang: Lang };

export const CAREER_DURATION = Object.values(DUR).reduce((a, b) => a + b, 0);

export const Career: React.FC<CareerProps> = ({ lang }) => {
  const c = COPY[lang];
  return (
    <AbsoluteFill style={{ backgroundColor: '#111111' }}>
      <Series>
        <Series.Sequence durationInFrames={DUR.intro}><Intro c={c} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR.numbers}><Numbers c={c} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR.timeline}><Timeline c={c} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR.showcase}><Showcase c={c} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR.stack}><Stack c={c} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR.outro}><Outro c={c} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
