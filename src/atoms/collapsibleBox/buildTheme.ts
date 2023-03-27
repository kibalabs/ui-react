
import { RecursivePartial } from '@kibalabs/core';

import { ICollapsibleBoxTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildCollapsibleBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ICollapsibleBoxTheme>): ThemeMap<ICollapsibleBoxTheme> => {
  const defaultCollapsibleBoxTheme: ICollapsibleBoxTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'border-color': '$colors.backgroundDark10',
          'border-style': 'solid',
        }),
        headerBackground: mergeTheme(boxThemes.default, boxThemes.transparent, {
          'background-color': '$colors.backgroundDark01',
          'border-radius': '0',
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
        }),
        contentBackground: mergeTheme(boxThemes.default, boxThemes.transparent, {
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
        }),
      },
      hover: {
        background: {
          'background-color': '$colors.neutral',
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
  };

  const unpaddedHeaderCollapsibleBoxTheme: RecursivePartial<ICollapsibleBoxTheme> = {
    normal: {
      default: {
        headerBackground: {
          padding: '0',
        },
      },
    },
  };

  return mergeThemeMap<ICollapsibleBoxTheme>({
    default: defaultCollapsibleBoxTheme,
    unpaddedHeader: unpaddedHeaderCollapsibleBoxTheme,
  }, (base || {}));
};
