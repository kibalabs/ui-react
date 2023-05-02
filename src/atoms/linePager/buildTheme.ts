
import { RecursivePartial } from '@kibalabs/core';

import { ILinePagerTheme } from './theme';
import { IBoxTheme, IDimensionGuide } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildLinePagerThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ILinePagerTheme>): ThemeMap<ILinePagerTheme> => {
  const defaultLinePagerTheme: ILinePagerTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          padding: dimensions.paddingNarrow3,
          'background-color': '$colors.backgroundDark05',
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
    active: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
        },
      },
    },
  };

  const primaryLinePagerTheme: RecursivePartial<ILinePagerTheme> = {
    normal: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
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

  const secondaryLinePagerTheme: RecursivePartial<ILinePagerTheme> = {
    normal: {
      default: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
      },
    },
  };

  const tertiaryLinePagerTheme: RecursivePartial<ILinePagerTheme> = defaultLinePagerTheme;

  const largeLinePagerTheme: RecursivePartial<ILinePagerTheme> = {
    normal: {
      default: {
        background: {
          padding: dimensions.padding,
        },
      },
    },
  };

  const smallLinePagerTheme: RecursivePartial<ILinePagerTheme> = {
    normal: {
      default: {
        background: {
          padding: dimensions.paddingNarrow4,
        },
      },
    },
  };

  const cardLinePagerTheme: RecursivePartial<ILinePagerTheme> = {
    normal: {
      default: {
        background: {
          'box-shadow': boxThemes.card['box-shadow'],
          margin: boxThemes.card.margin,
        },
      },
    },
  };

  return mergeThemeMap<ILinePagerTheme>({
    default: defaultLinePagerTheme,
    primary: primaryLinePagerTheme,
    secondary: secondaryLinePagerTheme,
    tertiary: tertiaryLinePagerTheme,
    large: largeLinePagerTheme,
    small: smallLinePagerTheme,
    card: cardLinePagerTheme,
  }, (base || {}));
};
