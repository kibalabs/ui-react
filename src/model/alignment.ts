
// See https://webdesign.tutsplus.com/tutorials/a-comprehensive-guide-to-flexbox-alignment--cms-30183
// to learn about alignment

import { CssConverter } from '../util';
import { Direction } from './direction';

export enum Alignment {
  Start = 'start',
  End = 'end',
  Fill = 'fill',
  Center = 'center',
  Baseline = 'baseline',
}

export const getFlexItemAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  if (childAlignment === Alignment.Baseline) {
    return 'baseline';
  }
  return 'stretch';
};

export const getFlexContentAlignment = (childAlignment: string): string => {
  if (childAlignment === Alignment.Start) {
    return 'flex-start';
  }
  if (childAlignment === Alignment.End) {
    return 'flex-end';
  }
  if (childAlignment === Alignment.Center) {
    return 'center';
  }
  if (childAlignment === Alignment.Baseline) {
    return 'baseline';
  }
  return 'space-between';
};

export const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
};

export const getChildAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `align-items: ${getFlexItemAlignment(field)};`;
};

export const getDirectionCss: CssConverter<Direction> = (field: Direction): string => {
  return `flex-direction: ${field === Direction.Vertical ? 'column' : 'row'};`;
};
