
import { IBulletListTheme } from './theme';
import { IDimensionGuide } from '../../particles';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildBulletListThemes = (dimensions: IDimensionGuide, base?: PartialThemeMap<IBulletListTheme>): ThemeMap<IBulletListTheme> => {
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
