import { RecursivePartial } from '@kibalabs/core';

import { IIconTheme } from './theme';
import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildIconThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, IIconTheme>>): ThemeMap<IIconTheme> => {
  const defaultIconTheme = mergeTheme<IIconTheme>({
    size: '1.3rem',
  }, base?.default);

  const smallIconTheme = mergeThemePartial<IIconTheme>({
    size: '0.75rem',
  });

  const largeIconTheme = mergeThemePartial<IIconTheme>({
    size: '2rem',
  });

  const extraLargeIconTheme = mergeThemePartial<IIconTheme>({
    size: '4rem',
  });

  const extraExtraLargeIconTheme = mergeThemePartial<IIconTheme>({
    size: '8rem',
  });

  const fillIconTheme = mergeThemePartial<IIconTheme>({
    size: '100%',
  });

  return {
    ...(base || {}),
    default: defaultIconTheme,
    small: smallIconTheme,
    large: largeIconTheme,
    extraLarge: extraLargeIconTheme,
    extraExtraLarge: extraExtraLargeIconTheme,
    fill: fillIconTheme,
  };
};
