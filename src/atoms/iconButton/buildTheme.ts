
import { RecursivePartial } from '@kibalabs/core';

import { IIconButtonTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildIconButtonThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IIconButtonTheme>): ThemeMap<IIconButtonTheme> => {
  const defaultIconButtonTheme: IIconButtonTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.padding} ${dimensions.padding}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
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
      default: {
        background: {
          'background-color': '$colors.disabled',
        },
        text: {
          color: '$colors.disabledText',
        },
      },
    },
  };

  const primaryIconButtonTheme: RecursivePartial<IIconButtonTheme> = {
    normal: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
        },
        text: {
          color: '$colors.textOnBrand',
        },
      },
      hover: {
        background: {
          'background-color': '$colors.brandSecondary',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandSecondaryDark10',
        },
      },
    },
  };

  const secondaryIconButtonTheme: RecursivePartial<IIconButtonTheme> = {
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
        text: {
          color: '$colors.brandPrimary',
        },
      },
    },
  };

  const tertiaryIconButtonTheme: IIconButtonTheme = defaultIconButtonTheme;

  const smallIconButtonTheme: RecursivePartial<IIconButtonTheme> = {
    normal: {
      default: {
        background: {
          padding: `${dimensions.paddingNarrow} ${dimensions.paddingNarrow}`,
        },
      },
    },
  };

  const passiveIconButtonTheme: RecursivePartial<IIconButtonTheme> = {
    normal: {
      default: {
        text: {
          color: '$colors.textLight50',
        },
      },
    },
  };

  return mergeThemeMap<IIconButtonTheme>({
    default: defaultIconButtonTheme,
    primary: primaryIconButtonTheme,
    secondary: secondaryIconButtonTheme,
    tertiary: tertiaryIconButtonTheme,
    small: smallIconButtonTheme,
    passive: passiveIconButtonTheme,
  }, (base || {}));
};
