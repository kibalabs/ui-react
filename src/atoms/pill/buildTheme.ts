import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../particles';
import { IPillTheme } from './theme';

export const buildPillThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IPillTheme>>): ThemeMap<IPillTheme> => {
  const defaultPillTheme = mergeTheme<IPillTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': `${dimensions.padding} ${dimensions.paddingWide2}`,
          'background-color': '$colors.brandPrimaryClear75',
          'border-radius': `${dimensions.paddingWide2}`,
        }),
        text: mergeTheme(textThemes.default, textThemes.small, {
          'color': '$colors.brandPrimary',
          'font-weight': '600',
        }),
      },
    },
  }, base?.default);

  const primaryPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
        text: {
        },
      },
    },
  }, base?.primary);

  const secondaryPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'background-color': '$colors.brandPrimaryClear25',
        },
        text: {
          'color': '$colors.textOnBrand',
        },
      },
    },
  }, base?.primary);

  return {
    ...base,
    default: defaultPillTheme,
    primary: primaryPillTheme,
    secondary: secondaryPillTheme,
  };
}
