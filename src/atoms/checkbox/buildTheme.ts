import { RecursivePartial } from '@kibalabs/core';

import { ICheckboxTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';

export const buildCheckboxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ICheckboxTheme>>): ThemeMap<ICheckboxTheme> => {
  const defaultCheckboxTheme = mergeTheme<ICheckboxTheme>({
    normal: {
      default: {
        checkBackground: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.paddingNarrow3} ${dimensions.paddingNarrow3}`,
          'border-width': dimensions.borderWidth,
          'border-color': '$colors.text',
          'border-radius': '0.2em',
        }),
        text: mergeTheme(textThemes.default, {
        }),
        checkColor: '$colors.textOnBrand',
      },
      hover: {
        checkBackground: {
          'background-color': '$colors.brandPrimaryClear80',
        },
        text: {
          color: '$colors.brandPrimary',
        },
      },
      press: {
        checkBackground: {
          'background-color': '$colors.brandPrimaryClear50',
        },
      },
      focus: {
        checkBackground: boxThemes.focussed,
      },
    },
    checked: {
      default: {
        checkBackground: {
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
        },
      },
    },
    disabled: {
      default: {
        checkBackground: {
          'background-color': '$colors.disabled',
        },
        text: {
          color: '$colors.disabledText',
        },
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultCheckboxTheme,
  };
};
