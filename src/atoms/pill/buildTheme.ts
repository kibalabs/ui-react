import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../particles';
import { IPillTheme } from './theme';

export const buildPillThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IPillTheme>>): ThemeMap<IPillTheme> => {
  const defaultPillTheme = mergeTheme<IPillTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          'color': '$colors.brandPrimary',
          'font-weight': '600',
        }),
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '$colors.disabled',
        },
        text: {
          'color': '$colors.disabledText',
        },
      },
    },
  }, base?.default);

  const primaryPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
        },
        text: {
          'color': '$colors.textOnBrand',
        },
      },
    },
  }, base?.primary);

  const secondaryPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
      },
    },
  }, base?.secondary);

  return {
    ...base,
    default: defaultPillTheme,
    primary: primaryPillTheme,
    secondary: secondaryPillTheme,
  };
}
