import { RecursivePartial } from '@kibalabs/core';

import { IIconTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildIconThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IIconTheme>): ThemeMap<IIconTheme> => {
  const defaultIconTheme: IIconTheme = {
    size: '1.3rem',
  };

  const smallIconTheme: RecursivePartial<IIconTheme> = {
    size: '0.75rem',
  };

  const largeIconTheme: RecursivePartial<IIconTheme> = {
    size: '2rem',
  };

  const extraLargeIconTheme: RecursivePartial<IIconTheme> = {
    size: '4rem',
  };

  const extraExtraLargeIconTheme: RecursivePartial<IIconTheme> = {
    size: '8rem',
  };

  const fillIconTheme: RecursivePartial<IIconTheme> = {
    size: '100%',
  };

  return mergeThemeMap<IIconTheme>({
    default: defaultIconTheme,
    small: smallIconTheme,
    large: largeIconTheme,
    extraLarge: extraLargeIconTheme,
    extraExtraLarge: extraExtraLargeIconTheme,
    fill: fillIconTheme,
  }, (base || {}));
};
