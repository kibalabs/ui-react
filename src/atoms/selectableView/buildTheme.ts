import { RecursivePartial } from '@kibalabs/core';

import { ISelectableViewTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { ILinkBaseTheme } from '../linkBase';

export const buildSelectableViewThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, linkBaseThemes: ThemeMap<ILinkBaseTheme>, base?: RecursivePartial<Record<string, ISelectableViewTheme>>): ThemeMap<ISelectableViewTheme> => {
  const defaultTheme = mergeTheme<ISelectableViewTheme>({
    normal: {
      default: {
        background: mergeTheme<IBoxTheme>(boxThemes.default, boxThemes.transparent, {
          'border-width': '1em',
          'border-color': 'transparent',
        }),
        overlay: linkBaseThemes.default.normal.default.background,
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
        overlay: linkBaseThemes.default.normal.hover.background,
      },
      press: {
        overlay: linkBaseThemes.default.normal.press.background,
      },
      focus: {
        overlay: linkBaseThemes.default.normal.focus.background,
      },
    },
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultTheme,
  };
};
