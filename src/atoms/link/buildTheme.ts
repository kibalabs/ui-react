import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { ILinkTheme } from './theme';

export const buildLinkThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ILinkTheme>>): ThemeMap<ILinkTheme> => {
  const defaultLinkTheme = mergeTheme<ILinkTheme>({
    normal: {
      default: {
        text: mergeTheme(textThemes.default, {
          color: '$colors.brandPrimary',
          'text-decoration': 'underline',
        }),
        background: mergeTheme(boxThemes.default, {
        }),
      },
      hover: {
        text: {
          color: '$colors.brandSecondary',
        },
      },
    },
    disabled: {
      default: {
        text: {
          color: '$colors.disabled',
        },
      },
    },
    visited: {
      default: {
        text: {
          color: '$colors.brandPrimary',
        },
      },
    },
  }, base?.default);

  const inheritLinkTheme = mergeThemePartial<ILinkTheme>({
    normal: {
      default: {
        text: mergeThemePartial(textThemes.inherit, {
          color: '$colors.brandPrimary',
          'text-decoration': 'underline',
        }),
      },
    },
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultLinkTheme,
    inherit: inheritLinkTheme,
  };
};
