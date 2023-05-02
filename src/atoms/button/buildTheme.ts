
import { RecursivePartial } from '@kibalabs/core';

import { IButtonTheme } from './theme';
import { IBoxTheme, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildButtonThemes = (dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IButtonTheme>): ThemeMap<IButtonTheme> => {
  const defaultButtonTheme: IButtonTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
          'background-color': 'transparent',
        }),
        text: mergeTheme(textThemes.default, {
          color: '$colors.brandPrimary',
          'font-weight': '600',
          'text-align': 'center',
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
          'background-color': '$colors.disabledLight50',
        },
        text: {
          color: '$colors.disabledText',
        },
      },
    },
  };

  const primaryButtonTheme: RecursivePartial<IButtonTheme> = {
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

  const secondaryButtonTheme: RecursivePartial<IButtonTheme> = {
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
      },
    },
  };

  const tertiaryButtonTheme = defaultButtonTheme;

  const largeButtonTheme: RecursivePartial<IButtonTheme> = {
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
  };

  const smallButtonTheme: RecursivePartial<IButtonTheme> = {
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
  };

  const cardButtonTheme: RecursivePartial<IButtonTheme> = {
    normal: {
      default: {
        background: {
          'box-shadow': boxThemes.card['box-shadow'],
          margin: boxThemes.card.margin,
        },
      },
    },
  };

  return mergeThemeMap<IButtonTheme>({
    default: defaultButtonTheme,
    primary: primaryButtonTheme,
    secondary: secondaryButtonTheme,
    tertiary: tertiaryButtonTheme,
    large: largeButtonTheme,
    small: smallButtonTheme,
    card: cardButtonTheme,
  }, (base || {}));
};
