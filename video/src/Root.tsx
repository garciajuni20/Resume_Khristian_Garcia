import React from 'react';
import { Composition } from 'remotion';
import { Career, CAREER_DURATION, type CareerProps } from './Career';

export const Root: React.FC = () => (
  <Composition
    id="career"
    component={Career}
    durationInFrames={CAREER_DURATION}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ lang: 'es' } as CareerProps}
  />
);
