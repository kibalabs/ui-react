import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { IWebViewTheme } from './theme';

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
