import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IPillTheme } from './theme';

export const buildPillThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, IPillTheme>>): ThemeMap<IPillTheme> => {
  const defaultPillTheme = mergeTheme<IPillTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.padding} ${dimensions.paddingWide2}`,
          'background-color': '$colors.brandPrimaryClear75',
          'border-radius': `${dimensions.paddingWide2}`,
        }),
        text: mergeTheme(textThemes.default, textThemes.small, {
          color: '$colors.brandPrimary',
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
          color: '$colors.textOnBrand',
        },
      },
    },
  }, base?.primary);

  const errorPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'background-color': '$colors.errorClear75',
          'border-color': '$colors.errorLight10',
        },
        text: {
          color: '$colors.errorLight10',
        },
      },
    },
  });

  const successPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          'background-color': '$colors.successClear75',
          'border-color': '$colors.successLight10',
        },
        text: {
          color: '$colors.successLight10',
        },
      },
    },
  });

  const squaredPillTheme = mergeThemePartial<IPillTheme>({
    normal: {
      default: {
        background: {
          padding: `${dimensions.paddingNarrow} ${dimensions.padding}`,
          'border-radius': `${dimensions.paddingWide}`,
        },
      },
    },
  }, base?.primary);

  return {
    ...(base || {}),
    default: defaultPillTheme,
    primary: primaryPillTheme,
    secondary: secondaryPillTheme,
    error: errorPillTheme,
    success: successPillTheme,
    squared: squaredPillTheme,
  };
};
