import { RecursivePartial } from '@kibalabs/core';

import { ITheme } from './theme';
import { buildAlternateColors, buildColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildFonts } from '../particles/fonts';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  const colors = buildColors(inputTheme?.colors);
  const alternateColors = buildAlternateColors(colors, inputTheme?.alternateColors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);
  return {
    colors,
    alternateColors,
    dimensions,
    fonts,
  };
};
