import { RecursivePartial } from '@kibalabs/core';

import { IWebViewTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';

export const buildWebViewThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, IWebViewTheme>>): ThemeMap<IWebViewTheme> => {
  const defaultWebViewTheme = mergeTheme<IWebViewTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, {
        }),
      },
    },
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultWebViewTheme,
  };
};
