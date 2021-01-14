import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { ICollapsibleBoxTheme } from './theme';

export const buildCollapsibleBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ICollapsibleBoxTheme>>): ThemeMap<ICollapsibleBoxTheme> => {
  const defaultCollapsibleBoxTheme = mergeTheme<ICollapsibleBoxTheme>({
    normal: {
      default: {
        text: mergeTheme(textThemes.default, {
        }),
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'border-color': '$colors.backgroundDark10',
          'border-style': 'solid',
        }),
        headerBackground: mergeTheme(boxThemes.default, boxThemes.transparent, {
          'background-color': '$colors.backgroundDark01',
          'border-radius': '0',
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
        }),
        contentBackground: mergeTheme(boxThemes.default, boxThemes.transparent, {
          'padding': `${dimensions.padding} ${dimensions.paddingWide}`,
        }),
        dividerColor: '$colors.backgroundDark10',
        dividerSize: dimensions.borderWidthNarrow,
      },
      hover: {
        background: {
          'background-color': colors.neutral,
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
      default: {
        background: {
          'background-color': '$colors.disabled',
        },
        text: {
          color: '$colors.disabledText',
        },
      },
    },
    collapsed: {
    },
  }, base?.default);


  return {
    ...(base || {}),
    default: defaultCollapsibleBoxTheme,
  };
};
