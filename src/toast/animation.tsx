import { generateUUID } from '@kibalabs/core';

type CssTheme = Record<string, string>;

const themeToCss = (theme: CssTheme): string => {
  return Object.entries(theme).map(([key, value]) => `${key}: ${value};`).join(' ');
};

// NOTE(krishan711): the css is not being exported to the dist so either need to fix that
// or figure out a nicer way to structure the animations and get that into the theme or similar
export interface IKeyFrames extends Record<string, Readonly<CssTheme>> {
  0: CssTheme;
  100: CssTheme;
}

export interface Animation {
  keyframes: IKeyFrames;
  duration: string;
  fillMode?: string;
  timingFunction?: string;
  delay?: string;
  iterationCount?: string;
}

const fadeInKeyFrames: IKeyFrames = {
  0: {
    transform: 'translate3d(0, -200%, 0) scale(0.6)',
    opacity: '0.5',
  },
  100: {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: '1',
  },
};

const fadeOutKeyFrames: IKeyFrames = {
  0: {
    transform: 'translate3d(0, 0, -1px) scale(1)',
    opacity: '1',
  },
  100: {
    transform: 'translate3d(0, -150%, -1px) scale(0.6)',
    opacity: '0',
  },
};


const animationIn: Animation = {
  keyframes: fadeInKeyFrames,
  duration: '0.35s',
  timingFunction: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
};


const animationOut: Animation = {
  keyframes: fadeOutKeyFrames,
  duration: '0.75s',
  fillMode: 'forwards',
  timingFunction: 'cubic-bezier(0.06, .71, 0.55, 1)',
};

export const keyFramesToCss = (keyFrames: IKeyFrames): string => {
  // let output = `0% {${keyFrames['0']};}; 100% {${keyFrames['100']};};`;
  const output = Object.keys(keyFrames).reduce((accumulator: string, current: string): string => {
    // if (current === '0' || current === '100') {
    //   return output;
    // }
    return `${accumulator}\n${current}% {${themeToCss(keyFrames[current])}}`;
  }, '');
  return output;
};

export const animationToCss = (animation: Animation): string => {
  const id = generateUUID();
  let output = `@keyframes ${id} {${keyFramesToCss(animation.keyframes)}}; animation-name:${id}; animation-duration: ${animation.duration};`;
  if (animation.fillMode) {
    output += `animation-fill-mode: ${animation.fillMode};`;
  }
  if (animation.timingFunction) {
    output += `animation-timing-function: ${animation.timingFunction};`;
  }
  if (animation.delay) {
    output += `animation-delay: ${animation.delay};`;
  }
  if (animation.iterationCount) {
    output += `animation-iteration-count: ${animation.iterationCount};`;
  }
  return output;
};

export const animationInCss = animationToCss(animationIn);
export const animationOutCss = animationToCss(animationOut);
