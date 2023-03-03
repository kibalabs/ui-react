
import { IButtonTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemePartial, PartialThemeMap, ThemeMap } from '../../util';

export const buildButtonThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IButtonTheme>): ThemeMap<IButtonTheme> => {
  const defaultButtonTheme = mergeTheme<IButtonTheme>({
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
  }, base?.default);

  const primaryButtonTheme = mergeThemePartial<IButtonTheme>({
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
  }, base?.primary);

  const secondaryButtonTheme = mergeThemePartial<IButtonTheme>({
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
      },
    },
  }, base?.secondary);

  const tertiaryButtonTheme = mergeTheme<IButtonTheme>(defaultButtonTheme, base?.tertiary);

  const largeButtonTheme = mergeThemePartial<IButtonTheme>({
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

  const smallButtonTheme = mergeThemePartial<IButtonTheme>({
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

  const cardButtonTheme = mergeThemePartial<IButtonTheme>({
    normal: {
      default: {
        background: {
          'box-shadow': boxThemes.card['box-shadow'],
          margin: boxThemes.card.margin,
        },
      },
    },
  }, base?.card);

  return {
    ...(base || {}),
    default: defaultButtonTheme,
    primary: primaryButtonTheme,
    secondary: secondaryButtonTheme,
    tertiary: tertiaryButtonTheme,
    large: largeButtonTheme,
    small: smallButtonTheme,
    card: cardButtonTheme,
  };
};
