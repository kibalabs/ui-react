
import { IBulletListTheme } from './theme';
import { IColorGuide, IDimensionGuide } from '../../particles';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildBulletListThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: PartialThemeMap<IBulletListTheme>): ThemeMap<IBulletListTheme> => {
  const defaultBulletListTheme: IBulletListTheme = {
    normal: {
      default: {
        bulletList: {
          'list-style-type': 'none',
          margin: `0 0 0 ${dimensions.paddingWide}`,
        },
      },
    },
  };

  return mergeThemeMap<IBulletListTheme>({
    default: defaultBulletListTheme,
  }, (base || {}));
};
