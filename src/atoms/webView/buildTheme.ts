
import { IWebViewTheme } from './theme';
import { IBoxTheme, IDimensionGuide } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildWebViewThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IWebViewTheme>): ThemeMap<IWebViewTheme> => {
  const defaultWebViewTheme: IWebViewTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, {
        }),
      },
    },
  };

  return mergeThemeMap<IWebViewTheme>({
    default: defaultWebViewTheme,
  }, (base || {}));
};
