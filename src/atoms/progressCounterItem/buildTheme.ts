
import { IProgressCounterItemTheme } from './theme';
import { IBoxTheme, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildProgressCounterItemThemes = (dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IProgressCounterItemTheme>): ThemeMap<IProgressCounterItemTheme> => {
  const defaultProgressCounterItemTheme: IProgressCounterItemTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          color: '$colors.brandPrimaryClear75',
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
          color: '$colors.brandPrimary',
        },
      },
    },
  };

  return mergeThemeMap<IProgressCounterItemTheme>({
    default: defaultProgressCounterItemTheme,
  }, (base || {}));
};
