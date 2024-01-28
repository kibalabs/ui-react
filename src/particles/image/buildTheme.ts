import { RecursivePartial } from '@kibalabs/core';

import { IImageTheme } from './theme';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IDimensionGuide } from '../dimensions';

export const buildImageThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IImageTheme>): ThemeMap<IImageTheme> => {
  const defaultImageTheme: IImageTheme = {
    background: mergeTheme<IBoxTheme>(boxThemes.default, {
      // NOTE(krishan711): we explicitly want to not set opacity for lazy loading
        'opacity': '',
    }),
  };

  const circularImageTheme: RecursivePartial<IImageTheme> = {
    background: {
      'border-radius': '50%',
    },
  };

  const unroundedImageTheme: RecursivePartial<IImageTheme> = {
    background: {
      'border-radius': '0',
    },
  };

  const profileImageTheme: RecursivePartial<IImageTheme> = circularImageTheme;

  return mergeThemeMap<IImageTheme>({
    default: defaultImageTheme,
    profile: profileImageTheme,
    circular: circularImageTheme,
    unrounded: unroundedImageTheme,
  }, (base || {}));
};
