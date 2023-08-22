import { RecursivePartial } from '@kibalabs/core';

import { IIconTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IDimensionGuide } from '../dimensions';

export const buildIconThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IIconTheme>): ThemeMap<IIconTheme> => {
  const defaultIconTheme: IIconTheme = {
    size: '1.3em',
  };

  const smallIconTheme: RecursivePartial<IIconTheme> = {
    size: '0.75em',
  };

  const largeIconTheme: RecursivePartial<IIconTheme> = {
    size: '2em',
  };

  const extraLargeIconTheme: RecursivePartial<IIconTheme> = {
    size: '4em',
  };

  const extraExtraLargeIconTheme: RecursivePartial<IIconTheme> = {
    size: '8em',
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
