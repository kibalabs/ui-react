import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { ICheckboxTheme } from './theme';

export const buildCheckboxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base: RecursivePartial<Record<string, ICheckboxTheme>>): ThemeMap<ICheckboxTheme> => {
  const defaultCheckboxTheme = mergeTheme<ICheckboxTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.paddingNarrow3} ${dimensions.paddingNarrow3}`,
          'border-width': '2px',
          'border-color': '$colors.brandPrimary',
          'border-radius': '0.2em',
        }),
        text: mergeTheme(textThemes.default, {
          color: '$colors.textOnBrand',
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
    checked: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
        },
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
  }, base?.default);

  const largeCheckboxTheme = mergeThemePartial<ICheckboxTheme>({
    normal: {
      default: {
        background: {
          padding: `${dimensions.paddingWide} ${dimensions.paddingWide2}`,
        },
        text: {
          'font-size': '1.2em',
        },
      },
    },
  }, base?.large);

  const smallCheckboxTheme = mergeThemePartial<ICheckboxTheme>({
    normal: {
      default: {
        background: {
          padding: `${dimensions.paddingNarrow} ${dimensions.padding}`,
        },
        text: {
          'font-size': '0.8em',
        },
      },
    },
  }, base?.small);

  return {
    ...base,
    default: defaultCheckboxTheme,
    large: largeCheckboxTheme,
    small: smallCheckboxTheme,
  };
};
