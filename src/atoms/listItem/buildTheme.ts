import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { IListItemTheme } from './theme';

export const buildListItemThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, IListItemTheme>>): ThemeMap<IListItemTheme> => {
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

  return {
    ...base,
    default: defaultListItemTheme,
  };
};
