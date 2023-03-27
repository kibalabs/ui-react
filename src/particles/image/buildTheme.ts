import { RecursivePartial } from '@kibalabs/core';

import { IImageTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildImageThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IImageTheme>): ThemeMap<IImageTheme> => {
  const defaultImageTheme: IImageTheme = {
    background: boxThemes.default,
  };

  const circularImageTheme: RecursivePartial<IImageTheme> = {
    background: {
      'border-radius': '50%',
    },
  };

  const profileImageTheme: RecursivePartial<IImageTheme> = circularImageTheme;

  return mergeThemeMap<IImageTheme>({
    default: defaultImageTheme,
    profile: profileImageTheme,
    circular: circularImageTheme,
  }, (base || {}));
};
