import { RecursivePartial } from '@kibalabs/core';
import { darken, transparentize } from 'polished';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide, IDimensionGuide, IBoxTheme, ITextTheme } from '../../subatoms';
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
          'color': transparentize(0.7, colors.brandPrimary),
        }),
      },
      hover: {
        background: {
          'background-color': transparentize(0.9, colors.brandPrimary),
        },
      },
      press: {
        background: {
          'background-color': transparentize(0.8, colors.brandPrimary),
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
