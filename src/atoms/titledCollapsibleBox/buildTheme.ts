
import { ITitledCollapsibleBoxTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildTitledCollapsibleBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ITitledCollapsibleBoxTheme>): ThemeMap<ITitledCollapsibleBoxTheme> => {
  const defaultTitledCollapsibleBoxTheme: ITitledCollapsibleBoxTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'border-color': '$colors.backgroundDark10',
          'border-style': 'solid',
        }),
        headerText: mergeTheme(textThemes.default, textThemes.bold, {
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

  return mergeThemeMap<ITitledCollapsibleBoxTheme>({
    default: defaultTitledCollapsibleBoxTheme,
  }, (base || {}));
};
