
import { IListItemTheme } from './theme';
import { IBoxTheme, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemePartial, PartialThemeMap, ThemeMap } from '../../util';

export const buildListItemThemes = (dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IListItemTheme>): ThemeMap<IListItemTheme> => {
  const defaultListItemTheme = mergeTheme<IListItemTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.paddingWide} ${dimensions.paddingWide}`,
          'background-color': 'transparent',
          'border-radius': `${dimensions.borderRadius} ${dimensions.borderRadius}`,
          'border-width': dimensions.borderWidth,
        }),
      },
      hover: {
        background: {
          'background-color': '$colors.brandPrimaryClear90',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandPrimaryClear75',
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
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
    },
  }, base?.default);

  const slimListItemTheme = mergeThemePartial<IListItemTheme>({
    normal: {
      default: {
        background: {
          padding: `${dimensions.padding} ${dimensions.padding}`,
        },
      },
    },
  }, base?.slim);

  return {
    ...base,
    default: defaultListItemTheme,
    slim: slimListItemTheme,
  };
};
