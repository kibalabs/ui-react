import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../particles';
import { IProgressCounterItemTheme } from './theme';

export const buildProgressCounterItemThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IProgressCounterItemTheme>>): ThemeMap<IProgressCounterItemTheme> => {
  const defaultProgressCounterItemTheme = mergeTheme<IProgressCounterItemTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          'color': '$colors.brandPrimaryClear75',
        }),
      },
      hover: {
        background: {
          'background-color': '$colors.brandPrimaryClear90',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    disabled: {
      hover: {
        background: {
          'background-color': 'transparent',
        },
      },
    },
    selected: {
      default: {
        text: {
          'font-weight': 'bolder',
          'color': '$colors.brandPrimary',
        },
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultProgressCounterItemTheme
  };
}
