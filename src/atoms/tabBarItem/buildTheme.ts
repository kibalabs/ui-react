
import { ITabBarItemTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildTabBarItemThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ITabBarItemTheme>): ThemeMap<ITabBarItemTheme> => {
  const defaultTabBarItemTheme: ITabBarItemTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
          'border-radius': `${dimensions.borderRadius} ${dimensions.borderRadius} 0 0`,
          'border-width': '0 0 2px 0',
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          color: '$colors.brandPrimaryClear25',
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
        background: {
          'border-color': '$colors.brandPrimary',
        },
        text: {
          // 'font-weight': 'bolder',
          color: '$colors.brandPrimary',
        },
      },
    },
  };

  return mergeThemeMap<ITabBarItemTheme>({
    default: defaultTabBarItemTheme,
  }, (base || {}));
};
