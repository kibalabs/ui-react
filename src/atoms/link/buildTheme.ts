
import { ILinkTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildLinkThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ILinkTheme>): ThemeMap<ILinkTheme> => {
  const defaultLinkTheme: ILinkTheme = {
    normal: {
      default: {
        text: mergeTheme(textThemes.inherit as ITextTheme, {
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
  };

  // const inheritLinkTheme = mergeThemePartial<ILinkTheme>({
  //   normal: {
  //     default: {
  //       text: mergeThemePartial(textThemes.inherit, {
  //         color: '$colors.brandPrimary',
  //         'text-decoration': 'underline',
  //       }),
  //     },
  //   },
  // }, base?.default);

  return mergeThemeMap<ILinkTheme>({
    default: defaultLinkTheme,
    inherit: defaultLinkTheme,
  }, (base || {}));
};
