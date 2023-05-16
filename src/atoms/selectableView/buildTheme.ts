
import { ISelectableViewTheme } from './theme';
import { IBoxTheme, IDimensionGuide } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { ILinkBaseTheme } from '../linkBase';

export const buildSelectableViewThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, linkBaseThemes: ThemeMap<ILinkBaseTheme>, base?: PartialThemeMap<ISelectableViewTheme>): ThemeMap<ISelectableViewTheme> => {
  const defaultTheme: ISelectableViewTheme = {
    normal: {
      default: {
        background: mergeTheme<IBoxTheme>(boxThemes.default, boxThemes.transparent, {
          'border-width': '1em',
          'border-color': 'transparent',
        }),
        overlay: mergeTheme<IBoxTheme>(boxThemes.default, boxThemes.transparent, linkBaseThemes.default.normal.default.background, {
          padding: '0',
        }),
      },
      hover: {
        overlay: linkBaseThemes.default.normal.hover.background,
      },
      press: {
        overlay: linkBaseThemes.default.normal.press.background,
      },
      focus: {
        overlay: linkBaseThemes.default.normal.focus.background,
      },
    },
    selected: {
      default: {
        overlay: {
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border-color': '$colors.brandPrimary',
        },
      },
      hover: {
      },
      press: {
      },
      focus: {
      },
    },
    disabled: {
      default: {
        overlay: {
          'background-color': 'rgba(0, 0, 0, 0.1)',
        },
      },
      hover: {
      },
      press: {
      },
      focus: {
      },
    },
  };

  return mergeThemeMap<ISelectableViewTheme>({
    default: defaultTheme,
  }, (base || {}));
};
