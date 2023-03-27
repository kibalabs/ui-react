
import { RecursivePartial } from '@kibalabs/core';

import { IPillTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildPillThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IPillTheme>): ThemeMap<IPillTheme> => {
  const defaultPillTheme: IPillTheme = {
    background: mergeTheme(boxThemes.default, boxThemes.focusable, {
      padding: `${dimensions.padding} ${dimensions.paddingWide2}`,
      'background-color': '$colors.brandPrimaryClear75',
      'border-radius': `${dimensions.paddingWide2}`,
    }),
    text: mergeTheme(textThemes.default, textThemes.small, {
      color: '$colors.brandPrimary',
      'font-weight': '600',
    }),
  };

  const primaryPillTheme: RecursivePartial<IPillTheme> = {
    background: {
      'border-color': '$colors.brandPrimary',
    },
    text: {
    },
  };

  const secondaryPillTheme: RecursivePartial<IPillTheme> = {
    background: {
      'background-color': '$colors.brandPrimaryClear25',
    },
    text: {
      color: '$colors.textOnBrand',
    },
  };

  const errorPillTheme: RecursivePartial<IPillTheme> = {
    background: {
      'background-color': '$colors.errorClear75',
      'border-color': '$colors.errorLight10',
    },
    text: {
      color: '$colors.errorLight10',
    },
  };

  const successPillTheme: RecursivePartial<IPillTheme> = {
    background: {
      'background-color': '$colors.successClear75',
      'border-color': '$colors.successLight10',
    },
    text: {
      color: '$colors.successLight10',
    },
  };

  return mergeThemeMap<IPillTheme>({
    default: defaultPillTheme,
    primary: primaryPillTheme,
    secondary: secondaryPillTheme,
    error: errorPillTheme,
    success: successPillTheme,
  }, (base || {}));
};
