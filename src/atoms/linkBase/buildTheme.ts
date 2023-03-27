
import { RecursivePartial } from '@kibalabs/core';

import { ILinkBaseTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, mergeThemeMap, mergeThemePartial, PartialThemeMap, ThemeMap } from '../../util';

export const buildLinkBaseThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ILinkBaseTheme>): ThemeMap<ILinkBaseTheme> => {
  const defaultLinkBaseTheme: ILinkBaseTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
        }),
        linkBase: {
          opacity: '1',
        },
      },
      hover: {
        background: {
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandPrimaryClear50',
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '$colors.disabledText',
        },
      },
    },
  };

  const translucentLinkBaseTheme: RecursivePartial<ILinkBaseTheme> = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': 'transparent',
        }),
        linkBase: {
          opacity: '1',
        },
      },
    },
  };

  const cardLinkBaseTheme: RecursivePartial<ILinkBaseTheme> = {
    normal: {
      default: {
        background: mergeThemePartial(boxThemes.card, boxThemes.focusable, {
          margin: '0',
        }),
      },
    },
  };

  const imageLinkBaseTheme: RecursivePartial<ILinkBaseTheme> = {
    normal: {
      hover: {
        linkBase: {
          opacity: '0.8',
        },
      },
      press: {
        linkBase: {
          opacity: '0.6',
        },
      },
    },
  };

  return mergeThemeMap<ILinkBaseTheme>({
    default: defaultLinkBaseTheme,
    translucent: translucentLinkBaseTheme,
    card: cardLinkBaseTheme,
    image: imageLinkBaseTheme,
  }, (base || {}));
};
