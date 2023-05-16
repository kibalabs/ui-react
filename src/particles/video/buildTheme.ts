import { IVideoTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IDimensionGuide } from '../dimensions';

export const buildVideoThemes = (dimensions: IDimensionGuide, base?: PartialThemeMap<IVideoTheme>): ThemeMap<IVideoTheme> => {
  const defaultVideoTheme: IVideoTheme = {
  };

  return mergeThemeMap<IVideoTheme>({
    default: defaultVideoTheme,
  }, (base || {}));
};
