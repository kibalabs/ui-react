import { RecursivePartial } from '@kibalabs/core';

import { ILoadingSpinnerTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildLoadingSpinnerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: PartialThemeMap<ILoadingSpinnerTheme>): ThemeMap<ILoadingSpinnerTheme> => {
  const defaultLoadingSpinnerTheme: ILoadingSpinnerTheme = {
    color: '$colors.brandPrimary',
    size: '2rem',
    width: '0.2em',
  };

  const lightLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    color: 'white',
  };

  const darkLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    color: 'black',
  };

  const smallLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    size: '1rem',
    width: '0.15rem',
  };

  const largeLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    size: '4rem',
    width: '0.5rem',
  };

  const extraLargeLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    size: '8rem',
    width: '1rem',
  };

  const fillLoadingSpinnerTheme: RecursivePartial<ILoadingSpinnerTheme> = {
    size: '100%',
  };

  return mergeThemeMap<ILoadingSpinnerTheme>({
    default: defaultLoadingSpinnerTheme,
    light: lightLoadingSpinnerTheme,
    dark: darkLoadingSpinnerTheme,
    small: smallLoadingSpinnerTheme,
    large: largeLoadingSpinnerTheme,
    extraLarge: extraLargeLoadingSpinnerTheme,
    fill: fillLoadingSpinnerTheme,
  }, (base || {}));
};
